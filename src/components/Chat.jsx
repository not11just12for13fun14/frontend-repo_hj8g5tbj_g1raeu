import { useEffect, useRef, useState } from 'react'
import { t } from '../lib/i18n'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Chat(){
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const user = JSON.parse(localStorage.getItem('user')||'null')
  const bottomRef = useRef(null)

  async function load(){
    const r = await fetch(`${BACKEND}/chat/messages?limit=200`)
    setMessages(await r.json())
  }

  useEffect(()=>{
    load()
    const id = setInterval(load, 2000) // simple polling to simulate real-time
    return ()=> clearInterval(id)
  }, [])

  async function send(e){
    e.preventDefault()
    if(!text.trim()) return
    await fetch(`${BACKEND}/chat/messages`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ sender_id: user?.id || 'guest', sender_name: user?.full_name || 'Guest', text }) })
    setText('')
    load()
    bottomRef.current?.scrollIntoView({ behavior:'smooth' })
  }

  return (
    <section className="py-12" id="chat">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">{t('chat')}</h2>
        <div className="bg-white rounded-xl border shadow h-[420px] flex flex-col">
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {messages.map(m => (
              <div key={m.id} className={`max-w-[70%] ${m.sender_id===user?.id? 'ml-auto text-right':''}`}>
                <div className="text-xs text-slate-500">{m.sender_name}</div>
                <div className={`inline-block px-3 py-2 rounded-lg ${m.sender_id===user?.id? 'bg-blue-600 text-white':'bg-slate-100'}`}>{m.text}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <form onSubmit={send} className="border-t p-3 flex gap-2">
            <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 border rounded px-3" placeholder={t('message')} />
            <button className="bg-blue-600 text-white px-4 rounded">{t('send')}</button>
          </form>
        </div>
      </div>
    </section>
  )
}
