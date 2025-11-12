import React from 'react'
import ToothImage from './ToothImage'

// 3D-like tooth visualization showing all 6 measurement sites
function Tooth3DView({ id, data }) {
  const pockets = data?.pockets || ['', '', '', '', '', '']
  
  // Color code pocket depths: green (healthy), yellow (mild), orange (moderate), red (severe)
  const getColorForDepth = (depth) => {
    const d = parseInt(depth, 10)
    if (!depth || isNaN(d)) return '#e5e7eb' // gray for empty
    if (d <= 3) return '#86efac' // green - healthy
    if (d <= 5) return '#fde047' // yellow - mild
    if (d <= 7) return '#fb923c' // orange - moderate
    return '#f87171' // red - severe
  }
  
  return (
    <div className="border rounded-lg p-6 bg-gradient-to-b from-gray-50 to-white">
      <h3 className="text-lg font-semibold mb-4 text-center">3D Periodontal View - Tooth #{id}</h3>
      
      {/* Buccal (Outer/Front) View */}
      <div className="mb-6">
        <div className="text-sm font-medium text-gray-700 mb-2 text-center">
          Buccal (Outer) View
        </div>
        <div className="relative bg-white rounded-lg p-6 shadow-inner" style={{ perspective: '800px' }}>
          <div className="relative mx-auto" style={{ width: '200px', height: '150px', transformStyle: 'preserve-3d', transform: 'rotateX(10deg)' }}>
            
            {/* Tooth Crown - 3D effect */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ToothImage id={id} bleeding={data?.bleeding} size="large" />
            </div>
            
            {/* Three buccal measurement sites overlaid */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-around px-8">
              {/* Mesio-Buccal */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-12 h-12 rounded-full border-4 border-gray-800 flex items-center justify-center font-bold text-white shadow-lg"
                  style={{ backgroundColor: getColorForDepth(pockets[0]) }}
                >
                  {pockets[0] || '—'}
                </div>
                <div className="text-xs mt-1 font-semibold">MB</div>
                <div className="w-0.5 h-12 bg-gray-400" style={{ marginTop: '4px' }}></div>
              </div>
              
              {/* Buccal */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-12 h-12 rounded-full border-4 border-gray-800 flex items-center justify-center font-bold text-white shadow-lg"
                  style={{ backgroundColor: getColorForDepth(pockets[1]) }}
                >
                  {pockets[1] || '—'}
                </div>
                <div className="text-xs mt-1 font-semibold">B</div>
                <div className="w-0.5 h-12 bg-gray-400" style={{ marginTop: '4px' }}></div>
              </div>
              
              {/* Disto-Buccal */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-12 h-12 rounded-full border-4 border-gray-800 flex items-center justify-center font-bold text-white shadow-lg"
                  style={{ backgroundColor: getColorForDepth(pockets[2]) }}
                >
                  {pockets[2] || '—'}
                </div>
                <div className="text-xs mt-1 font-semibold">DB</div>
                <div className="w-0.5 h-12 bg-gray-400" style={{ marginTop: '4px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lingual (Inner/Back) View */}
      <div>
        <div className="text-sm font-medium text-gray-700 mb-2 text-center">
          Lingual (Inner) View
        </div>
        <div className="relative bg-white rounded-lg p-6 shadow-inner" style={{ perspective: '800px' }}>
          <div className="relative mx-auto" style={{ width: '200px', height: '150px', transformStyle: 'preserve-3d', transform: 'rotateX(-10deg) rotateY(180deg)' }}>
            
            {/* Tooth Crown - flipped for lingual view */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ transform: 'scaleX(-1)' }}>
              <ToothImage id={id} bleeding={data?.bleeding} size="large" />
            </div>
            
            {/* Three lingual measurement sites overlaid */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-around px-8" style={{ transform: 'scaleX(-1)' }}>
              {/* Mesio-Lingual */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-12 h-12 rounded-full border-4 border-gray-800 flex items-center justify-center font-bold text-white shadow-lg"
                  style={{ backgroundColor: getColorForDepth(pockets[3]) }}
                >
                  {pockets[3] || '—'}
                </div>
                <div className="text-xs mt-1 font-semibold">ML</div>
                <div className="w-0.5 h-12 bg-gray-400" style={{ marginTop: '4px' }}></div>
              </div>
              
              {/* Lingual */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-12 h-12 rounded-full border-4 border-gray-800 flex items-center justify-center font-bold text-white shadow-lg"
                  style={{ backgroundColor: getColorForDepth(pockets[4]) }}
                >
                  {pockets[4] || '—'}
                </div>
                <div className="text-xs mt-1 font-semibold">L</div>
                <div className="w-0.5 h-12 bg-gray-400" style={{ marginTop: '4px' }}></div>
              </div>
              
              {/* Disto-Lingual */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-12 h-12 rounded-full border-4 border-gray-800 flex items-center justify-center font-bold text-white shadow-lg"
                  style={{ backgroundColor: getColorForDepth(pockets[5]) }}
                >
                  {pockets[5] || '—'}
                </div>
                <div className="text-xs mt-1 font-semibold">DL</div>
                <div className="w-0.5 h-12 bg-gray-400" style={{ marginTop: '4px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Color Legend */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-xs font-semibold text-gray-700 mb-2">Pocket Depth Color Guide:</div>
        <div className="flex items-center gap-4 flex-wrap text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#86efac] border-2 border-gray-600"></div>
            <span>1-3mm (Healthy)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#fde047] border-2 border-gray-600"></div>
            <span>4-5mm (Mild)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#fb923c] border-2 border-gray-600"></div>
            <span>6-7mm (Moderate)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#f87171] border-2 border-gray-600"></div>
            <span>8+mm (Severe)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ThreeView({ id, data }){
  if (!id) {
    return (
      <div className="p-8 border rounded-lg text-center text-gray-500">
        <p>No tooth selected</p>
        <p className="text-sm mt-2">Click on a tooth to see 3D periodontal view</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Tooth3DView id={id} data={data} />
      
      {/* Summary Panel */}
      <div className="p-4 border rounded-lg bg-white">
        <h3 className="font-semibold mb-3">Tooth #{id} Summary</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span className="text-gray-600">Average PD:</span>
            <strong>
              {(() => {
                const validPockets = (data?.pockets || []).filter(p => p && !isNaN(parseInt(p, 10)))
                if (validPockets.length === 0) return '—'
                const avg = validPockets.reduce((sum, p) => sum + parseInt(p, 10), 0) / validPockets.length
                return avg.toFixed(1) + ' mm'
              })()}
            </strong>
          </div>
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span className="text-gray-600">Max PD:</span>
            <strong className="text-red-600">
              {(() => {
                const validPockets = (data?.pockets || []).filter(p => p && !isNaN(parseInt(p, 10)))
                if (validPockets.length === 0) return '—'
                return Math.max(...validPockets.map(p => parseInt(p, 10))) + ' mm'
              })()}
            </strong>
          </div>
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span className="text-gray-600">Bleeding:</span>
            <strong className={data?.bleeding ? 'text-red-600' : 'text-green-600'}>
              {data?.bleeding ? 'YES' : 'NO'}
            </strong>
          </div>
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span className="text-gray-600">Sites ≥6mm:</span>
            <strong className="text-orange-600">
              {(data?.pockets || []).filter(p => p && parseInt(p, 10) >= 6).length}
            </strong>
          </div>
        </div>
        {data?.comment && (
          <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
            <div className="text-xs font-semibold text-gray-700 mb-1">Clinical Note:</div>
            <div className="text-sm text-gray-800">{data.comment}</div>
          </div>
        )}
      </div>
    </div>
  )
}
