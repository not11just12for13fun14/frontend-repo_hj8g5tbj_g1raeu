import { useEffect, useState } from 'react'
import { t } from '../lib/i18n'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Deposits(){
  const [items, setItems] = useState([])
  const [amount, setAmount] = useState('')
  const [file, setFile] = useState(null)
  const user = JSON.parse(localStorage.getItem('user')||'null')

  async function load(){
    const r = await fetch(`${BACKEND}/deposits`)
    setItems(await r.json())
  }
  useEffect(()=>{ load() }, [])

  async function submit(e){
    e.preventDefault()
    const fd = new FormData()
    fd.append('user_id', user?.id || '')
    fd.append('amount', amount)
    if (file) fd.append('proof', file)
    const r = await fetch(`${BACKEND}/deposits`, { method:'POST', body: fd })
    await r.json()
    setAmount('')
    setFile(null)
    load()
  }

  async function act(id, action){
    await fetch(`${BACKEND}/deposits/${id}/${action}`, { method:'POST'})
    load()
  }

  return (
    <section className="py-12" id="deposits">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">{t('deposits')}</h2>

        <form onSubmit={submit} className="bg-white rounded-xl p-4 shadow border mb-6">
          <div className="grid md:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-sm text-slate-600 mb-1">{t('amount')}</label>
              <input value={amount} onChange={e=>setAmount(e.target.value)} className="w-full px-3 py-2 rounded border" required type="number" min="0" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">{t('uploadProof')}</label>
              <input type="file" onChange={e=>setFile(e.target.files?.[0])} className="w-full" />
            </div>
            <div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded">{t('submit')}</button>
            </div>
          </div>
        </form>

        <div className="bg-white rounded-xl shadow border overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="p-3">User</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Proof</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map(d=> (
                <tr key={d.id} className="border-t">
                  <td className="p-3 text-sm">{d.user_id}</td>
                  <td className="p-3">{d.amount}</td>
                  <td className="p-3">{d.status}</td>
                  <td className="p-3">{d.proof_path? <a className="text-blue-600" target="_blank" href={`${BACKEND}/${d.proof_path}`}>View</a> : '-'}</td>
                  <td className="p-3 space-x-2">
                    <button onClick={()=>act(d.id,'accept')} className="px-3 py-1 bg-emerald-600 text-white rounded text-sm">{t('accept')}</button>
                    <button onClick={()=>act(d.id,'reject')} className="px-3 py-1 bg-rose-600 text-white rounded text-sm">{t('reject')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
