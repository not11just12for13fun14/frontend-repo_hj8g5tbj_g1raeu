import { useState } from 'react'
import { t, languages, setLang, getLang } from '../lib/i18n'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Auth() {
  const [mode, setMode] = useState('login') // login | signup
  const [role, setRole] = useState('member')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [resp, setResp] = useState(null)

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setResp(null)
    try {
      if (mode === 'login') {
        const r = await fetch(`${BACKEND}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })
        const d = await r.json()
        if (!r.ok) throw new Error(d.detail || 'Login failed')
        localStorage.setItem('user', JSON.stringify(d))
        setResp({ ok: true, msg: `${t('welcome')} ${d.full_name}` })
      } else {
        const r = await fetch(`${BACKEND}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ full_name: fullName, email, password, role, language: getLang() }),
        })
        const d = await r.json()
        if (!r.ok) throw new Error(d.detail || 'Signup failed')
        setResp({ ok: true, msg: 'Account created' })
      }
    } catch (e) {
      setResp({ ok: false, msg: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="auth" className="py-12 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">{t('getStarted')}</h2>
          <p className="text-white/70">{t('tagline')}</p>

          <div className="mt-6 inline-flex gap-2 p-1 bg-white/10 rounded-lg">
            {Object.entries(languages).map(([k, v]) => (
              <button key={k} onClick={() => setLang(k)} className={`px-3 py-1 rounded-md ${getLang()===k? 'bg-white text-slate-900':'text-white/80 hover:bg-white/20'}`}>{v}</button>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex gap-2 mb-4">
            <button type="button" onClick={() => setMode('login')} className={`px-3 py-2 rounded ${mode==='login'?'bg-white text-slate-900':'bg-white/10 text-white'}`}>{t('login')}</button>
            <button type="button" onClick={() => setMode('signup')} className={`px-3 py-2 rounded ${mode==='signup'?'bg-white text-slate-900':'bg-white/10 text-white'}`}>{t('signup')}</button>
          </div>

          {mode==='signup' && (
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button type="button" onClick={() => setRole('member')} className={`px-3 py-2 rounded ${role==='member'?'bg-emerald-400 text-emerald-950':'bg-white/10 text-white'}`}>{t('asMember')}</button>
              <button type="button" onClick={() => setRole('admin')} className={`px-3 py-2 rounded ${role==='admin'?'bg-rose-400 text-rose-950':'bg-white/10 text-white'}`}>{t('asAdmin')}</button>
            </div>
          )}

          {mode==='signup' && (
            <div className="mb-3">
              <label className="block text-sm mb-1">{t('fullName')}</label>
              <input value={fullName} onChange={e=>setFullName(e.target.value)} className="w-full px-3 py-2 rounded bg-white/10 border border-white/10" required />
            </div>
          )}

          <div className="mb-3">
            <label className="block text-sm mb-1">{t('email')}</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-3 py-2 rounded bg-white/10 border border-white/10" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">{t('password')}</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full px-3 py-2 rounded bg-white/10 border border-white/10" required />
          </div>

          <button disabled={loading} className="w-full py-2 rounded bg-blue-500 hover:bg-blue-600 disabled:opacity-60">{t('submit')}</button>

          {resp && (
            <p className={`mt-3 text-sm ${resp.ok? 'text-emerald-300':'text-rose-300'}`}>{resp.msg}</p>
          )}
        </form>
      </div>
    </section>
  )
}
