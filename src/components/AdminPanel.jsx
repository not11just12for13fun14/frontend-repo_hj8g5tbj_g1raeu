import { useEffect, useState } from 'react'
import { t } from '../lib/i18n'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function AdminPanel(){
  const [stats, setStats] = useState(null)
  const [interest, setInterest] = useState({ interest_base_rate: 0.1, interest_above_100_multiplier: 2 })
  const [users, setUsers] = useState([])

  async function load(){
    const s = await fetch(`${BACKEND}/admin/stats`).then(r=>r.json())
    const u = await fetch(`${BACKEND}/admin/users`).then(r=>r.json())
    setStats(s); setUsers(u)
  }
  useEffect(()=>{ load() },[])

  async function updateInterest(){
    await fetch(`${BACKEND}/admin/config/interest`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(interest) })
    load()
  }

  async function removeUser(id){
    await fetch(`${BACKEND}/admin/users/${id}`, { method:'DELETE' })
    load()
  }

  return (
    <section className="py-12 bg-slate-50" id="admin">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">{t('admin')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow border p-6">
            <h3 className="font-semibold mb-4">{t('systemStats')}</h3>
            <pre className="text-sm">{JSON.stringify(stats, null, 2)}</pre>
          </div>
          <div className="bg-white rounded-xl shadow border p-6">
            <h3 className="font-semibold mb-4">{t('interestConfig')}</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-600 mb-1">Base</label>
                <input type="number" step="0.01" value={interest.interest_base_rate} onChange={e=>setInterest({...interest, interest_base_rate: parseFloat(e.target.value)})} className="w-full border rounded px-2 py-1" />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">>100x</label>
                <input type="number" step="0.1" value={interest.interest_above_100_multiplier} onChange={e=>setInterest({...interest, interest_above_100_multiplier: parseFloat(e.target.value)})} className="w-full border rounded px-2 py-1" />
              </div>
            </div>
            <button onClick={updateInterest} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow border p-6 mt-6">
          <h3 className="font-semibold mb-4">{t('users')}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-slate-600">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-t">
                    <td className="p-3">{u.full_name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.role}</td>
                    <td className="p-3">
                      <button onClick={()=>removeUser(u.id)} className="px-3 py-1 bg-rose-600 text-white rounded text-sm">{t('remove')}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
