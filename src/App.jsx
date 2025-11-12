import React, { useEffect, useState } from 'react'
import ToothGrid from './components/ToothGrid'
import ToothDetail from './components/ToothDetail'
import ThreeView from './components/ThreeView'
import VoiceAssistant from './components/VoiceAssistant'
import { loadChart, saveChart } from './utils/storage'

const ALL_TOOTH_IDS = (() => {
  // Universal Numbering System (1-32 for adults)
  // Upper: 1-16 (right to left from patient's perspective)
  // Lower: 17-32 (left to right from patient's perspective)
  const teeth = []
  for (let i = 1; i <= 32; i++) {
    teeth.push(String(i))
  }
  return teeth
})()

const makeEmptyChart = () => {
  const map = {}
  for (let i = 1; i <= 32; i++) {
    map[String(i)] = { 
      pockets: ['', '', '', '', '', ''], // 6 sites per tooth
      bleeding: false, 
      comment: '' 
    }
  }
  return map
}

export default function App(){
  const [chart, setChart] = useState(() => loadChart() || makeEmptyChart())
  const [view, setView] = useState('grid') // grid | detail | three
  const [selected, setSelected] = useState(null)
  const [highlighted, setHighlighted] = useState([])
  const [commandInput, setCommandInput] = useState('')

  useEffect(()=>{
    saveChart(chart)
  },[chart])

  const updateTooth = (id, patch) => {
    setChart(prev => ({ ...prev, [id]: { ...prev[id], ...patch } }))
  }

  const handleCommandSubmit = () => {
    if (!commandInput.trim()) return
    
    // Parse command like: "Tooth 12, 3, 3, 4, 3, 4, 5, bleeding"
    const text = commandInput.toLowerCase().trim()
    
    // Extract tooth number
    const toothMatch = text.match(/tooth\s*(\d+)/)
    if (!toothMatch) {
      alert('Please start with "Tooth [number]"')
      return
    }
    
    const toothId = toothMatch[1]
    if (parseInt(toothId) < 1 || parseInt(toothId) > 32) {
      alert('Tooth number must be between 1 and 32')
      return
    }
    
    // Extract numbers (pocket depths)
    const afterTooth = text.substring(toothMatch.index + toothMatch[0].length)
    const numbers = afterTooth.match(/\d+/g) || []
    
    // Check for bleeding
    const hasBleeding = /bleeding/.test(text)
    
    // Update tooth
    const pockets = [...(chart[toothId]?.pockets || ['', '', '', '', '', ''])]
    numbers.forEach((num, idx) => {
      if (idx < 6) pockets[idx] = num
    })
    
    updateTooth(toothId, { 
      pockets, 
      bleeding: hasBleeding 
    })
    
    setSelected(toothId)
    setHighlighted([toothId])
    setTimeout(() => setHighlighted([]), 3000)
    setCommandInput('')
  }

  const handleVoiceUpdate = (ids, patch) => {
    // ids: array of tooth ids to update
    setHighlighted(ids)
    ids.forEach(id => updateTooth(id, patch))
    if (ids.length===1) setSelected(ids[0])
    // clear highlight after 3s
    setTimeout(()=>setHighlighted([]), 3000)
  }

  const handleImport = (json) => {
    setChart(json)
  }

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(chart))
    const a = document.createElement('a')
    a.href = dataStr
    a.download = 'periodontal-chart.json'
    a.click()
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Periodontal Chart System</h1>
          <div className="flex gap-2 items-center">
            <select value={view} onChange={e=>setView(e.target.value)} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500">
              <option value="grid">Table view</option>
              <option value="detail">Tooth detail</option>
              <option value="three">3-view (Frontal/Buccal/Lingual)</option>
            </select>
            <button onClick={handleExport} className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700">Export JSON</button>
            <label className="px-4 py-2 bg-white border rounded-lg cursor-pointer hover:bg-gray-50">
              Import
              <input type="file" accept="application/json" className="hidden" onChange={e=>{
                const f = e.target.files?.[0]
                if (!f) return
                const reader = new FileReader()
                reader.onload = ()=>{
                  try{
                    const json = JSON.parse(reader.result)
                    handleImport(json)
                  }catch(err){
                    alert('Invalid JSON')
                  }
                }
                reader.readAsText(f)
              }} />
            </label>
          </div>
        </header>

        {/* Central Command Input */}
        <div className="mb-6 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border-2 border-teal-200">
          <label className="block mb-2">
            <span className="text-sm font-semibold text-gray-700">Quick Data Entry Command</span>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={commandInput}
                onChange={e => setCommandInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleCommandSubmit()}
                placeholder='Example: "Tooth 12, 3, 3, 4, 3, 4, 5, bleeding"'
                className="flex-1 border-2 border-teal-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <button
                onClick={handleCommandSubmit}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold"
              >
                Submit
              </button>
            </div>
          </label>
          <p className="text-xs text-gray-600 mt-2">
            Format: "Tooth [number], [6 pocket depths separated by comma], bleeding (optional)"
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-3">
            {view === 'grid' && (
              <ToothGrid teethOrder={ALL_TOOTH_IDS} chart={chart} onSelect={setSelected} highlighted={highlighted} onChange={(id, patch) => updateTooth(id, patch)} />
            )}
            {view === 'detail' && (
              <ToothDetail id={selected} data={selected ? chart[selected] : null} onChange={(patch)=>selected && updateTooth(selected, patch)} />
            )}
            {view === 'three' && (
              <ThreeView id={selected} data={selected ? chart[selected] : null} />
            )}
          </div>

          <aside className="col-span-1">
            <VoiceAssistant onUpdate={handleVoiceUpdate} chart={chart} onSelect={setSelected} />
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold mb-2">Quick Actions</h3>
              <p className="text-sm mb-3">Selected: <strong className="text-teal-600">{selected||'—'}</strong></p>
              <div className="flex flex-col gap-2">
                <button onClick={()=>{ if (selected) updateTooth(selected, { pockets: ['','','','','',''], bleeding: false, comment: '' }) }} className="px-3 py-2 border rounded-lg hover:bg-white">Clear Tooth</button>
                <button onClick={()=>{ if (selected) updateTooth(selected, { bleeding: !chart[selected]?.bleeding }) }} className="px-3 py-2 border rounded-lg hover:bg-white">Toggle Bleeding</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
