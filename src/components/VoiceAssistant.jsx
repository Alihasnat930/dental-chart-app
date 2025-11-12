import React, { useEffect, useRef, useState } from 'react'

// Simple parser for voice commands that updates chart fields
const canonicalize = (s='') => s.toLowerCase().replace(/[^0-9a-z ]+/g,' ')

function extractToothIds(text){
  // Universal Numbering System: 1-32
  const ids = new Set()
  
  // Match tooth numbers 1-32
  const matches = text.match(/\b([1-9]|[12][0-9]|3[0-2])\b/g)
  if (matches) {
    matches.forEach(t => {
      const n = parseInt(t, 10)
      if (n >= 1 && n <= 32) ids.add(String(n))
    })
  }
  
  return Array.from(ids)
}

function extractPocket(text){
  const m = text.match(/(?:pocket|pd|depth)\s*(?:is\s*)?(\d{1,2})/i)
  if (m) return m[1]
  const m2 = text.match(/\b(\d)\b/) // single digit might be PD
  if (m2) return m2[1]
  return null
}

function extractBleeding(text){
  if (/no\s+bleeding|not\s+bleeding|no\s+bleed|negative/.test(text)) return false
  if (/bleeding|bleed|bleeds|bleeding\s*true|positive/.test(text)) return true
  return null
}

export default function VoiceAssistant({ onUpdate, chart, onSelect }){
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [status, setStatus] = useState('idle')
  const recognitionRef = useRef(null)

  useEffect(()=>{
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setStatus('unsupported')
      return
    }
    const rec = new SpeechRecognition()
    rec.lang = 'en-US'
    rec.interimResults = false
    rec.maxAlternatives = 1
    rec.onresult = (e)=>{
      const t = e.results[0][0].transcript
      setTranscript(t)
      handleCommand(t)
    }
    rec.onend = ()=>{
      setListening(false)
      setStatus('idle')
    }
    rec.onerror = (e)=>{ setStatus('error:'+e.error); setListening(false) }
    recognitionRef.current = rec
  },[])

  const start = ()=>{
    if (!recognitionRef.current) return alert('SpeechRecognition not supported in this browser')
    try{ recognitionRef.current.start(); setListening(true); setStatus('listening') }catch(e){ console.warn(e) }
  }

  const stop = ()=>{ recognitionRef.current?.stop(); setListening(false); setStatus('idle') }

  const handleCommand = (raw) =>{
    const text = canonicalize(raw)
    const ids = extractToothIds(text)
    const pocket = extractPocket(text)
    const bleeding = extractBleeding(text)

    if (ids.length===0){
      // if no explicit tooth mentioned but a single selected in UI, apply to that
      setTranscript(raw + ' (no tooth detected)')
      return
    }

    setTranscript(raw)

    const patch = {}
    if (pocket !== null) patch.pocket = pocket
    if (bleeding !== null) patch.bleeding = bleeding

    // dispatch updates
    if (Object.keys(patch).length>0){
      onUpdate(ids, patch)
    } else {
      // no fields detected: toggle bleeding true as default
      onUpdate(ids, { bleeding: true })
    }

    // if single, select it in UI
    if (ids.length===1) onSelect(ids[0])
  }

  const canned = [
    'Tooth 12, 3, 3, 4, 3, 4, 5, bleeding',
    'Tooth 8 pocket 4 bleeding',
    'Tooth 19 pocket 3',
    'Tooth 24, 2, 2, 3, 2, 3, 3, no bleeding'
  ]

  return (
    <div className="p-4 border rounded bg-white">
      <h3 className="font-semibold">Voice Assistant</h3>
      <div className="mt-2">
        <div className="flex gap-2">
          <button onClick={()=>listening? stop(): start()} className={`px-3 py-1 rounded ${listening? 'bg-red-500 text-white':'bg-green-600 text-white'}`}>
            {listening? 'Stop Listening':'Start Listening'}
          </button>
          <button onClick={()=>{ setTranscript(''); setStatus('idle') }} className="px-2 py-1 border rounded">Clear</button>
        </div>
        <div className="mt-3 text-sm text-gray-600">Status: {status}</div>
        <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">Transcript: {transcript}</div>
      </div>

      <div className="mt-3 text-sm">
        <div className="font-medium">Example commands</div>
        <ul className="list-disc ml-5 mt-1">
          {canned.map((c,i)=>(<li key={i} className="text-sm">{c}</li>))}
        </ul>
      </div>
    </div>
  )
}
