import Hero from './components/Hero'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import Deposits from './components/Deposits'
import Loans from './components/Loans'
import Chat from './components/Chat'
import Audit from './components/Audit'
import Reports from './components/Reports'
import AdminPanel from './components/AdminPanel'
import { languages, getLang, setLang, t } from './lib/i18n'

function Navbar(){
  const lang = getLang()
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-950/60 text-white border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#" className="font-semibold">{t('appName')}</a>
        <nav className="hidden md:flex gap-5 text-sm text-white/80">
          <a href="#dashboard">{t('dashboard')}</a>
          <a href="#deposits">{t('deposits')}</a>
          <a href="#loans">{t('loans')}</a>
          <a href="#chat">{t('chat')}</a>
          <a href="#audit">{t('audit')}</a>
          <a href="#reports">{t('reports')}</a>
          <a href="#admin">{t('admin')}</a>
        </nav>
        <div className="flex items-center gap-2">
          <select value={lang} onChange={e=>setLang(e.target.value)} className="bg-white/10 border border-white/10 rounded px-2 py-1">
            {Object.entries(languages).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <a href="#auth" className="px-3 py-1 rounded bg-blue-600">{t('login')}</a>
        </div>
      </div>
    </header>
  )
}

function Footer(){
  return (
    <footer className="py-6 text-center text-sm text-white/60 bg-slate-950">© {new Date().getFullYear()} {t('appName')}</footer>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero />
      <Auth />
      <Dashboard />
      <Deposits />
      <Loans />
      <Chat />
      <Audit />
      <Reports />
      <AdminPanel />
      <Footer />
    </div>
  )
}

export default App
