import Spline from '@splinetool/react-spline'
import { t } from '../lib/i18n'

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-sm">{t('appName')}</h1>
        <p className="text-white/90 max-w-2xl mt-4 text-lg md:text-xl">{t('tagline')}</p>
        <div className="mt-8 flex gap-3">
          <a href="#auth" className="bg-white/90 hover:bg-white text-slate-900 font-semibold px-5 py-3 rounded-lg transition">{t('getStarted')}</a>
          <a href="/test" className="bg-slate-900/70 hover:bg-slate-900 text-white font-semibold px-5 py-3 rounded-lg transition border border-white/20">Health Check</a>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
    </section>
  )
}
