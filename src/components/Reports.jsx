import { useEffect, useRef, useState } from 'react'
import { t } from '../lib/i18n'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Reports(){
  const [year, setYear] = useState(new Date().getFullYear())
  const [data, setData] = useState(null)
  const ref = useRef(null)

  useEffect(()=>{ fetch(`${BACKEND}/reports/annual/${year}`).then(r=>r.json()).then(setData) }, [year])

  function onPrint(){
    window.print()
  }

  function onDownload(){
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `community-report-${year}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="py-12" id="reports">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold">{t('reports')}</h2>
          <input type="number" value={year} onChange={e=>setYear(e.target.value)} className="border rounded px-2 py-1 w-28" />
          <button onClick={onDownload} className="px-3 py-1 bg-slate-900 text-white rounded">{t('downloadPdf')}</button>
          <button onClick={onPrint} className="px-3 py-1 bg-blue-600 text-white rounded">{t('print')}</button>
        </div>
        <div ref={ref} className="bg-white rounded-xl shadow border p-6">
          <pre className="text-sm overflow-auto">{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </section>
  )
}
