import React from 'react'
import ToothImage from './ToothImage'

function ToothColumn({ id, data, onClick, highlighted, onChange }){
  const siteLabels = ['MB', 'B', 'DB', 'ML', 'L', 'DL']
  
  // Color code pocket depths
  const getColorForDepth = (depth) => {
    const d = parseInt(depth, 10)
    if (!depth || isNaN(d)) return '#f3f4f6' // gray for empty
    if (d <= 3) return '#86efac' // green - healthy
    if (d <= 5) return '#fde047' // yellow - mild
    if (d <= 7) return '#fb923c' // orange - moderate
    return '#f87171' // red - severe
  }
  
  // Get border color based on worst pocket depth
  const getToothBorderColor = () => {
    const maxDepth = Math.max(...(data?.pockets || []).map(p => parseInt(p, 10) || 0))
    if (maxDepth === 0) return 'border-gray-200'
    if (maxDepth <= 3) return 'border-green-400'
    if (maxDepth <= 5) return 'border-yellow-400'
    if (maxDepth <= 7) return 'border-orange-400'
    return 'border-red-500'
  }
  
  return (
    <div 
      className={`flex flex-col items-center border-r-2 px-2 py-3 min-w-[110px] ${getToothBorderColor()} ${
        highlighted ? 'bg-teal-50 tooth-card-selected' : 'bg-white hover:bg-gray-50'
      } transition-colors cursor-pointer`}
      onClick={() => onClick(id)}
    >
      {/* Tooth Number */}
      <div className="font-bold text-sm text-gray-800 mb-2 bg-gray-100 px-3 py-1 rounded-full">
        {id}
      </div>
      
      {/* Tooth Image with site indicators overlay */}
      <div className="relative mb-2">
        <ToothImage id={id} bleeding={data?.bleeding} />
        
        {/* Visual pocket depth indicators on tooth */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex gap-1">
          {/* Buccal sites (MB, B, DB) - top */}
          {[0, 1, 2].map(idx => {
            const depth = data?.pockets?.[idx]
            if (!depth) return <div key={idx} className="w-3 h-3"></div>
            return (
              <div 
                key={idx}
                className="w-5 h-5 rounded-full border-2 border-gray-700 flex items-center justify-center text-[8px] font-bold shadow-md"
                style={{ backgroundColor: getColorForDepth(depth) }}
                title={`${siteLabels[idx]}: ${depth}mm`}
              >
                {depth}
              </div>
            )
          })}
        </div>
        
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
          {/* Lingual sites (ML, L, DL) - bottom */}
          {[3, 4, 5].map(idx => {
            const depth = data?.pockets?.[idx]
            if (!depth) return <div key={idx} className="w-3 h-3"></div>
            return (
              <div 
                key={idx}
                className="w-5 h-5 rounded-full border-2 border-gray-700 flex items-center justify-center text-[8px] font-bold shadow-md"
                style={{ backgroundColor: getColorForDepth(depth) }}
                title={`${siteLabels[idx]}: ${depth}mm`}
              >
                {depth}
              </div>
            )
          })}
        </div>
      </div>
      
      {/* 6 Pocket Depth Sites - compact inputs */}
      <div className="w-full space-y-0.5 mb-2">
        {[0, 1, 2, 3, 4, 5].map(siteIdx => (
          <div key={siteIdx} className="flex items-center gap-1">
            <span className="text-[10px] text-gray-500 w-5 font-medium">{siteLabels[siteIdx]}</span>
            <input 
              type="number" 
              min="0" 
              max="15"
              value={data?.pockets?.[siteIdx] || ''} 
              onChange={e => {
                const newPockets = [...(data?.pockets || ['','','','','',''])]
                newPockets[siteIdx] = e.target.value
                onChange(id, { pockets: newPockets })
              }}
              onClick={e => e.stopPropagation()}
              className="w-12 border rounded px-1 py-0.5 text-center text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
              style={{ backgroundColor: getColorForDepth(data?.pockets?.[siteIdx]) }}
              placeholder="—"
            />
          </div>
        ))}
      </div>
      
      {/* Bleeding Button */}
      <button
        onClick={e => {
          e.stopPropagation()
          onChange(id, { bleeding: !data?.bleeding })
        }}
        className={`w-full px-2 py-1 rounded text-xs font-semibold mb-1 ${
          data?.bleeding 
            ? 'bg-red-100 text-red-700 border border-red-400' 
            : 'bg-gray-100 text-gray-600 border border-gray-300'
        }`}
      >
        {data?.bleeding ? 'BOP+' : 'BOP-'}
      </button>
      
      {/* Comments - abbreviated */}
      <input 
        type="text"
        value={data?.comment || ''} 
        onChange={e => onChange(id, { comment: e.target.value })}
        onClick={e => e.stopPropagation()}
        className="w-full border rounded px-1 py-1 text-[10px] focus:ring-2 focus:ring-teal-500 focus:outline-none"
        placeholder="Note"
      />
    </div>
  )
}

export default function ToothGrid({ teethOrder, chart, onSelect, highlighted, onChange }){
  const upperTeeth = teethOrder.slice(0, 16)
  const lowerTeeth = teethOrder.slice(16, 32)
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Periodontal Chart (Universal Numbering 1-32)</h2>
        
        {/* Color Legend - Always visible */}
        <div className="flex items-center gap-3 text-xs bg-white border rounded-lg px-3 py-2">
          <span className="font-semibold">Depth:</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-[#86efac] border border-gray-600"></div>
            <span>1-3</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-[#fde047] border border-gray-600"></div>
            <span>4-5</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-[#fb923c] border border-gray-600"></div>
            <span>6-7</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-[#f87171] border border-gray-600"></div>
            <span>8+</span>
          </div>
        </div>
      </div>
      
      {/* Upper arch - horizontal layout */}
      <div className="border-2 rounded-lg overflow-hidden shadow-lg">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Upper Arch (Maxillary)</h3>
          <span className="text-xs text-blue-100">Teeth 1-16 (Patient's Right → Left)</span>
        </div>
        
        <div className="overflow-x-auto bg-gray-50">
          <div className="flex border-b-2 border-gray-300">
            {upperTeeth.map(id => (
              <ToothColumn 
                key={id} 
                id={id} 
                data={chart[id]} 
                onClick={onSelect} 
                highlighted={highlighted.includes(id)} 
                onChange={onChange} 
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Lower arch - horizontal layout */}
      <div className="border-2 rounded-lg overflow-hidden shadow-lg">
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Lower Arch (Mandibular)</h3>
          <span className="text-xs text-green-100">Teeth 17-32 (Patient's Left → Right)</span>
        </div>
        
        <div className="overflow-x-auto bg-gray-50">
          <div className="flex border-b-2 border-gray-300">
            {lowerTeeth.map(id => (
              <ToothColumn 
                key={id} 
                id={id} 
                data={chart[id]} 
                onClick={onSelect} 
                highlighted={highlighted.includes(id)} 
                onChange={onChange} 
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Info Panel */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
        <div className="flex items-center gap-6 text-xs text-gray-700">
          <div><strong>BOP+</strong> = Bleeding on Probing</div>
          <div><strong>Sites:</strong> MB (Mesio-Buccal), B (Buccal), DB (Disto-Buccal), ML (Mesio-Lingual), L (Lingual), DL (Disto-Lingual)</div>
          <div className="text-gray-600">💡 Colored dots on teeth show pocket depth severity</div>
        </div>
      </div>
    </div>
  )
}
