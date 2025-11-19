import { useEffect, useState } from 'react'
import { t } from '../lib/i18n'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Loans(){
  const [items, setItems] = useState([])
  const [amount, setAmount] = useState('')
  const user = JSON.parse(localStorage.getItem('user')||'null')

  async function load(){
    const r = await fetch(`${BACKEND}/loans/user/${user?.id||''}`)
    setItems(await r.json())
  }
  useEffect(()=>{ if(user) load() }, [])

  async function apply(e){
    e.preventDefault()
    const r = await fetch(`${BACKEND}/loans/apply`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ user_id: user?.id, amount: parseFloat(amount) }) })
    await r.json()
    setAmount('')
    load()
  }

  async function act(id, action){
    await fetch(`${BACKEND}/loans/${id}/${action}`, { method:'POST'})
    load()
  }

  return (
    <section className="py-12 bg-slate-50" id="loans">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">{t('loans')}</h2>

        <form onSubmit={apply} className="bg-white rounded-xl p-4 shadow border mb-6 grid md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm text-slate-600 mb-1">{t('amount')}</label>
            <input value={amount} onChange={e=>setAmount(e.target.value)} className="w-full px-3 py-2 rounded border" required type="number" min="1" />
          </div>
          <div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded mt-6 md:mt-0">{t('applyLoan')}</button>
          </div>
        </form>

        <div className="bg-white rounded-xl shadow border overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="p-3">Status</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Interest</th>
                <th className="p-3">Total</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(l => (
                <tr key={l.id} className="border-t">
                  <td className="p-3">{l.status}</td>
                  <td className="p-3">{l.amount}</td>
                  <td className="p-3">{l.interest}</td>
                  <td className="p-3">{l.total_payable}</td>
                  <td className="p-3 space-x-2">
                    <button onClick={()=>act(l.id,'accept')} className="px-3 py-1 bg-emerald-600 text-white rounded text-sm">{t('accept')}</button>
                    <button onClick={()=>act(l.id,'reject')} className="px-3 py-1 bg-rose-600 text-white rounded text-sm">{t('reject')}</button>
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
