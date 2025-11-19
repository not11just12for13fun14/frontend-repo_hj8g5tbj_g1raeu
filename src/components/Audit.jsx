import { useEffect, useState } from 'react'
import { t } from '../lib/i18n'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Audit(){
  const [logs, setLogs] = useState([])
  useEffect(()=>{ fetch(`${BACKEND}/audit`).then(r=>r.json()).then(setLogs) },[])
  return (
    <section className="py-12 bg-slate-50" id="audit">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">{t('audit')}</h2>
        <div className="bg-white rounded-xl shadow border overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="p-3">Timestamp</th>
                <th className="p-3">Action</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(a => (
                <tr key={a.id} className="border-t">
                  <td className="p-3 text-sm">{a.timestamp || ''}</td>
                  <td className="p-3">{a.action}</td>
                  <td className="p-3">{a.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
