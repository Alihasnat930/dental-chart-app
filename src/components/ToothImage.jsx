import React from 'react'

// Realistic tooth images based on actual dental X-ray/photograph style
export default function ToothImage({ id, bleeding, size = 'normal' }){
  const num = parseInt(id, 10)
  
  // Universal Numbering System (1-32)
  let position
  if (num >= 1 && num <= 8) position = num
  else if (num >= 9 && num <= 16) position = 17 - num
  else if (num >= 17 && num <= 24) position = num - 16
  else position = 33 - num
  
  // Determine tooth type
  let shape = 'incisor'
  if (position === 1 || position === 2 || position === 3) shape = 'molar'
  else if (position === 4 || position === 5) shape = 'premolar'
  else if (position === 6) shape = 'canine'
  else if (position === 7 || position === 8) shape = 'incisor'
  
  const scale = size === 'large' ? 1.2 : 1
  
  // Realistic tooth colors - ivory/white with shadows
  const toothWhite = bleeding ? '#fca5a5' : '#f5f5f0'
  const toothIvory = bleeding ? '#f87171' : '#e8e6dd'
  const toothShadow = bleeding ? '#dc2626' : '#b8b5a8'
  const rootBeige = '#d4cfbb'
  const rootShadow = '#a19b85'
  const enamelShine = '#ffffff'
  
  if (shape === 'incisor') {
    return (
      <svg width={35 * scale} height={65 * scale} viewBox="0 0 35 65" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`tooth-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: toothShadow, stopOpacity: 0.3 }} />
            <stop offset="50%" style={{ stopColor: toothWhite, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: toothShadow, stopOpacity: 0.3 }} />
          </linearGradient>
        </defs>
        <path d="M14 28 L11 58 Q11 62, 17.5 62 Q24 62, 24 58 L21 28" fill={rootBeige} stroke={rootShadow} strokeWidth="1" />
        <path d="M11 5 Q11 3, 13 3 L22 3 Q24 3, 24 5 L24 28 L11 28 Z" fill={`url(#tooth-grad-${id})`} stroke={toothShadow} strokeWidth="1.5" />
        <rect x="11" y="3" width="13" height="3" fill={toothWhite} stroke={toothShadow} strokeWidth="1" />
        <ellipse cx="15" cy="12" rx="3" ry="8" fill={enamelShine} opacity="0.6" />
        <line x1="17.5" y1="3" x2="17.5" y2="28" stroke={toothShadow} strokeWidth="0.5" opacity="0.2" />
      </svg>
    )
  }
  
  if (shape === 'canine') {
    return (
      <svg width={38 * scale} height={70 * scale} viewBox="0 0 38 70" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={`canine-grad-${id}`}>
            <stop offset="40%" style={{ stopColor: toothWhite, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: toothIvory, stopOpacity: 1 }} />
          </radialGradient>
        </defs>
        <path d="M14 26 L10 64 Q10 67, 19 67 Q28 67, 28 64 L24 26" fill={rootBeige} stroke={rootShadow} strokeWidth="1" />
        <path d="M9 22 L19 2 L29 22 L27 28 L11 28 Z" fill={`url(#canine-grad-${id})`} stroke={toothShadow} strokeWidth="1.5" />
        <ellipse cx="19" cy="2" rx="2" ry="2" fill={toothWhite} stroke={toothShadow} strokeWidth="1" />
        <ellipse cx="15" cy="15" rx="4" ry="6" fill={enamelShine} opacity="0.6" />
        <line x1="19" y1="2" x2="19" y2="28" stroke={toothShadow} strokeWidth="0.6" opacity="0.3" />
      </svg>
    )
  }
  
  if (shape === 'premolar') {
    return (
      <svg width={42 * scale} height={65 * scale} viewBox="0 0 42 65" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={`premolar-grad-${id}`}>
            <stop offset="30%" style={{ stopColor: toothWhite, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: toothIvory, stopOpacity: 1 }} />
          </radialGradient>
        </defs>
        <path d="M11 30 L7 60 Q7 63, 12 63 Q16 63, 16 60 L14 30" fill={rootBeige} stroke={rootShadow} strokeWidth="1" />
        <path d="M28 30 L32 60 Q32 63, 27 63 Q23 63, 23 60 L25 30" fill={rootBeige} stroke={rootShadow} strokeWidth="1" />
        <ellipse cx="19.5" cy="14" rx="12" ry="10" fill={`url(#premolar-grad-${id})`} stroke={toothShadow} strokeWidth="1.5" />
        <path d="M7.5 14 L11 32 L28 32 L30.5 14" fill={`url(#premolar-grad-${id})`} stroke={toothShadow} strokeWidth="1.5" />
        <circle cx="13" cy="12" r="3.5" fill={toothWhite} stroke={toothShadow} strokeWidth="1" />
        <circle cx="26" cy="12" r="3.5" fill={toothWhite} stroke={toothShadow} strokeWidth="1" />
        <ellipse cx="14" cy="10" rx="3" ry="2.5" fill={enamelShine} opacity="0.6" />
        <ellipse cx="25" cy="10" rx="3" ry="2.5" fill={enamelShine} opacity="0.6" />
        <line x1="19.5" y1="8" x2="19.5" y2="32" stroke={toothShadow} strokeWidth="0.6" opacity="0.3" />
      </svg>
    )
  }
  
  // Molar
  return (
    <svg width={48 * scale} height={65 * scale} viewBox="0 0 48 65" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`molar-grad-${id}`}>
          <stop offset="20%" style={{ stopColor: toothWhite, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: toothIvory, stopOpacity: 1 }} />
        </radialGradient>
      </defs>
      <path d="M11 32 L6 60 Q6 63, 10.5 63 Q14 63, 14 60 L13 32" fill={rootBeige} stroke={rootShadow} strokeWidth="1" />
      <path d="M22 32 L21 62 Q21 63, 24 63 Q27 63, 27 62 L26 32" fill={rootBeige} stroke={rootShadow} strokeWidth="1" />
      <path d="M35 32 L40 60 Q40 63, 35.5 63 Q32 63, 32 60 L33 32" fill={rootBeige} stroke={rootShadow} strokeWidth="1" />
      <rect x="8" y="10" width="30" height="16" rx="4" fill={`url(#molar-grad-${id})`} stroke={toothShadow} strokeWidth="1.5" />
      <path d="M8 26 L10 34 L36 34 L38 26" fill={`url(#molar-grad-${id})`} stroke={toothShadow} strokeWidth="1.5" />
      <circle cx="13" cy="14" r="3.5" fill={toothWhite} stroke={toothShadow} strokeWidth="1" />
      <circle cx="31" cy="14" r="3.5" fill={toothWhite} stroke={toothShadow} strokeWidth="1" />
      <circle cx="13" cy="22" r="3" fill={toothWhite} stroke={toothShadow} strokeWidth="0.8" />
      <circle cx="31" cy="22" r="3" fill={toothWhite} stroke={toothShadow} strokeWidth="0.8" />
      <ellipse cx="15" cy="12" rx="2.5" ry="2" fill={enamelShine} opacity="0.6" />
      <ellipse cx="29" cy="12" rx="2.5" ry="2" fill={enamelShine} opacity="0.6" />
      <line x1="23" y1="10" x2="23" y2="34" stroke={toothShadow} strokeWidth="0.8" opacity="0.3" />
      <line x1="8" y1="18" x2="38" y2="18" stroke={toothShadow} strokeWidth="0.8" opacity="0.3" />
    </svg>
  )
}
