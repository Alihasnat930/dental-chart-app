import React from 'react'
import ToothImage from './ToothImage'

export default function ToothDetail({ id, data, onChange }){
  if (!id) return (
    <div className="p-8 border rounded-lg text-center text-gray-500">
      <p>No tooth selected</p>
      <p className="text-sm mt-2">Click on a tooth in the table view to see details</p>
    </div>
  )

  const set = (patch) => onChange(patch)
  const siteLabels = ['Mesio-Buccal', 'Buccal', 'Disto-Buccal', 'Mesio-Lingual', 'Lingual', 'Disto-Lingual']

  return (
    <div className="p-6 border rounded-lg bg-white">
      <div className="flex items-center gap-4 mb-6">
        <div>
          <ToothImage id={id} bleeding={data?.bleeding} size="large" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Tooth #{id}</h2>
          <p className="text-sm text-gray-600">Universal Numbering System</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* 6 Pocket Depth Sites */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Pocket Depths (mm)</h3>
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2, 3, 4, 5].map((siteIdx) => (
              <label key={siteIdx} className="flex flex-col">
                <span className="text-xs text-gray-600 mb-1">{siteLabels[siteIdx]}</span>
                <input 
                  type="number" 
                  min="0"
                  max="15"
                  value={data?.pockets?.[siteIdx] || ''} 
                  onChange={e => {
                    const newPockets = [...(data?.pockets || ['','','','','',''])]
                    newPockets[siteIdx] = e.target.value
                    set({ pockets: newPockets })
                  }} 
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none text-center" 
                  placeholder="mm"
                />
              </label>
            ))}
          </div>
        </div>
        
        {/* Bleeding */}
        <label className="flex flex-col">
          <span className="text-sm font-medium text-gray-700 mb-1">Bleeding on probing</span>
          <button
            onClick={() => set({ bleeding: !data?.bleeding })}
            className={`border rounded-lg px-4 py-3 font-semibold ${
              data?.bleeding 
                ? 'bg-red-100 text-red-700 border-red-300' 
                : 'bg-green-100 text-green-700 border-green-300'
            }`}
          >
            {data?.bleeding ? 'YES - Bleeding Present' : 'NO - No Bleeding'}
          </button>
        </label>
        
        {/* Comments */}
        <label className="flex flex-col">
          <span className="text-sm font-medium text-gray-700 mb-1">Clinical notes / comments</span>
          <textarea 
            value={data?.comment||''} 
            onChange={e=>set({ comment: e.target.value })} 
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none" 
            rows="4"
            placeholder="Enter clinical observations, treatment notes, etc."
          />
        </label>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Quick reference</h3>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Healthy: PD 1-3mm, no bleeding</li>
          <li>• Gingivitis: PD 1-3mm, bleeding present</li>
          <li>• Mild periodontitis: PD 4-5mm</li>
          <li>• Moderate/severe: PD ≥6mm</li>
        </ul>
      </div>
    </div>
  )
}
