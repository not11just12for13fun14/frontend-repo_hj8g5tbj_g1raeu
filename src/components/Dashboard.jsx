import { useEffect, useState } from 'react'
import { t } from '../lib/i18n'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Dashboard(){
  const [data, setData] = useState(null)

  useEffect(()=>{
    fetch(`${BACKEND}/dashboard/overview`).then(r=>r.json()).then(setData)
  },[])

  return (
    <section className="py-12 bg-slate-50" id="dashboard">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">{t('dashboard')}</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <Stat title={t('totalBalance')} value={data?.total_balance ?? 0} />
          <Stat title={t('totalSavings')} value={data?.total_savings ?? 0} />
          <Stat title={t('activeLoans')} value={data?.active_loans ?? 0} />
          <Stat title={t('annualCashOut')} value={data?.annual_cash_out ?? 0} />
        </div>
      </div>
    </section>
  )
}

function Stat({title, value}){
  return (
    <div className="bg-white rounded-xl p-5 shadow border border-slate-100">
      <div className="text-slate-500 text-sm">{title}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  )
}
