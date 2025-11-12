const KEY = 'periodontal-chart-v1'

export function saveChart(obj){
  try{ localStorage.setItem(KEY, JSON.stringify(obj)) }catch(e){}
}

export function loadChart(){
  try{ const s = localStorage.getItem(KEY); return s? JSON.parse(s): null }catch(e){ return null }
}
