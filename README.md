# Periodontal Chart (React + Vite + Tailwind)

This is a React app for periodontal charting using the Universal Numbering System (1-32 for adult teeth), with voice assistant support, central text command input, and JSON import/export.

Features:
- **Universal Numbering System (1-32)** for adult teeth
- **6 pocket depth sites per tooth** (MB, B, DB, ML, L, DL)
- **Table-based form layout** with upper and lower arch separation
- **Central command input** for quick data entry
  - Example: "Tooth 12, 3, 3, 4, 3, 4, 5, bleeding"
  - Enters 6 pocket depths and sets bleeding flag
- **Voice assistant** (Web Speech API) that interprets commands
- **Realistic tooth images** (SVG) showing different tooth types
- **Export/import** chart data in JSON format
- **No dropdowns** - streamlined input workflow

Quick start (Vite + Tailwind must be installed locally):

1. Install dependencies

```powershell
npm install
```

2. Run dev server

```powershell
npm run dev
```

## Central Command Input Usage

The command input accepts the following format:

```
Tooth [number], [value1], [value2], [value3], [value4], [value5], [value6], bleeding
```

- **Tooth number**: 1-32 (Universal Numbering System)
- **6 values**: Pocket depths for MB, B, DB, ML, L, DL sites
- **bleeding** (optional): Marks tooth as bleeding

Examples:
- `Tooth 12, 3, 3, 4, 3, 4, 5, bleeding` - Enters 6 pocket depths and marks bleeding
- `Tooth 8, 2, 2, 3, 2, 2, 3` - Enters 6 pocket depths without bleeding
- Press Enter or click Submit to apply

Notes:
- Tailwind is configured via `tailwind.config.cjs` and `postcss.config.cjs`
- Voice assistant uses Web Speech API (Chrome/Edge recommended)
- All data is auto-saved to localStorage

This project demonstrates a streamlined periodontal charting workflow for dental clinics.
