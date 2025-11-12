import React from 'react'

// Detailed tooth SVG icons with realistic shapes
export default function ToothIcon({ id, bleeding }){
  const num = parseInt(id, 10)
  
  // Universal Numbering System (1-32)
  // Upper: 1-16 (right to left from patient's right)
  // Lower: 17-32 (left to right from patient's left)
  
  // Determine position within quadrant
  let position
  if (num >= 1 && num <= 8) position = num // Upper right: 1-8
  else if (num >= 9 && num <= 16) position = 17 - num // Upper left: 9-16 (mirror)
  else if (num >= 17 && num <= 24) position = num - 16 // Lower left: 17-24
  else position = 33 - num // Lower right: 25-32 (mirror)
  
  // Determine tooth type based on position
  // 1,2 = molars, 3 = premolar, 4,5 = premolars/canine, 6,7 = incisors/canine, 8 = incisor
  let shape = 'incisor'
  if (position === 1 || position === 2 || position === 3) shape = 'molar'
  else if (position === 4 || position === 5) shape = 'premolar'
  else if (position === 6) shape = 'canine'
  else if (position === 7 || position === 8) shape = 'incisor'
  
  const crownColor = bleeding ? '#fecaca' : '#f8fafc'
  const crownStroke = bleeding ? '#dc2626' : '#475569'
  const rootColor = '#e2e8f0'
  const highlightColor = '#ffffff'
  
  if (shape === 'incisor') {
    return (
      <svg width="35" height="60" viewBox="0 0 35 60" xmlns="http://www.w3.org/2000/svg">
        {/* Root */}
        <path 
          d="M12 28 L10 55 Q10 58, 12.5 58 L22.5 58 Q25 58, 25 55 L23 28 Z" 
          fill={rootColor} 
          stroke="#94a3b8" 
          strokeWidth="1"
        />
        {/* Crown */}
        <rect 
          x="10" 
          y="5" 
          width="15" 
          height="25" 
          rx="2" 
          fill={crownColor} 
          stroke={crownStroke} 
          strokeWidth="1.5"
        />
        {/* Highlight */}
        <ellipse cx="14" cy="12" rx="3" ry="5" fill={highlightColor} opacity="0.4" />
        {/* Center line */}
        <line x1="17.5" y1="5" x2="17.5" y2="28" stroke="#cbd5e1" strokeWidth="0.5" />
      </svg>
    )
  }
  
  if (shape === 'canine') {
    return (
      <svg width="35" height="60" viewBox="0 0 35 60" xmlns="http://www.w3.org/2000/svg">
        {/* Root - longer and more pointed */}
        <path 
          d="M12 25 L10 56 Q10 58, 12.5 58 L22.5 58 Q25 58, 25 56 L23 25 Z" 
          fill={rootColor} 
          stroke="#94a3b8" 
          strokeWidth="1"
        />
        {/* Crown - pointed top */}
        <path 
          d="M8 20 L17.5 3 L27 20 L25 27 L10 27 Z" 
          fill={crownColor} 
          stroke={crownStroke} 
          strokeWidth="1.5"
        />
        {/* Highlight */}
        <ellipse cx="14" cy="15" rx="3" ry="4" fill={highlightColor} opacity="0.4" />
        {/* Cusp ridge */}
        <line x1="17.5" y1="3" x2="17.5" y2="27" stroke="#cbd5e1" strokeWidth="0.5" />
      </svg>
    )
  }
  
  if (shape === 'premolar') {
    return (
      <svg width="40" height="60" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
        {/* Roots - bifurcated */}
        <path 
          d="M10 28 L8 56 Q8 58, 10.5 58 L14.5 58 Q16 58, 16 56 L14 28 Z" 
          fill={rootColor} 
          stroke="#94a3b8" 
          strokeWidth="1"
        />
        <path 
          d="M24 28 L26 56 Q26 58, 23.5 58 L19.5 58 Q18 58, 18 56 L20 28 Z" 
          fill={rootColor} 
          stroke="#94a3b8" 
          strokeWidth="1"
        />
        {/* Crown - two cusps */}
        <ellipse cx="17" cy="12" rx="11" ry="9" fill={crownColor} stroke={crownStroke} strokeWidth="1.5" />
        <path d="M6 12 L11 28 L23 28 L28 12" fill={crownColor} stroke={crownStroke} strokeWidth="1.5" />
        {/* Highlight */}
        <ellipse cx="13" cy="10" rx="4" ry="3" fill={highlightColor} opacity="0.4" />
        {/* Occlusal groove */}
        <path d="M17 8 L17 28" stroke="#cbd5e1" strokeWidth="0.5" />
      </svg>
    )
  }
  
  // Molar (default) - most detailed
  return (
    <svg width="45" height="60" viewBox="0 0 45 60" xmlns="http://www.w3.org/2000/svg">
      {/* Roots - multiple */}
      <path 
        d="M10 30 L7 55 Q7 57, 9.5 57 L13.5 57 Q15 57, 15 55 L13 30 Z" 
        fill={rootColor} 
        stroke="#94a3b8" 
        strokeWidth="1"
      />
      <path 
        d="M19 30 L18 56 Q18 57, 20 57 L24 57 Q26 57, 26 56 L25 30 Z" 
        fill={rootColor} 
        stroke="#94a3b8" 
        strokeWidth="1"
      />
      <path 
        d="M30 30 L33 55 Q33 57, 30.5 57 L26.5 57 Q25 57, 25 55 L27 30 Z" 
        fill={rootColor} 
        stroke="#94a3b8" 
        strokeWidth="1"
      />
      {/* Crown - rectangular with cusps */}
      <rect x="6" y="8" width="28" height="15" rx="3" fill={crownColor} stroke={crownStroke} strokeWidth="1.5" />
      <path d="M6 23 L9 32 L31 32 L34 23" fill={crownColor} stroke={crownStroke} strokeWidth="1.5" />
      {/* Cusps indication */}
      <circle cx="12" cy="12" r="3" fill={crownColor} stroke={crownStroke} strokeWidth="0.8" />
      <circle cx="28" cy="12" r="3" fill={crownColor} stroke={crownStroke} strokeWidth="0.8" />
      {/* Highlights */}
      <ellipse cx="14" cy="10" rx="3" ry="2" fill={highlightColor} opacity="0.4" />
      <ellipse cx="26" cy="10" rx="3" ry="2" fill={highlightColor} opacity="0.4" />
      {/* Occlusal grooves */}
      <path d="M20 8 L20 32" stroke="#cbd5e1" strokeWidth="0.5" />
      <path d="M6 15 L34 15" stroke="#cbd5e1" strokeWidth="0.5" />
    </svg>
  )
}
