import { EfficiencyForm } from './components/efficiency-form'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-3xl">
        {/* Cabeçalho Discreto */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Levantamento de Rotinas
          </h1>
          <p className="text-slate-500 mt-2">
            Ajude-nos a entender seu dia a dia para melhorarmos nossos processos internos.
          </p>
        </div>

        {/* Card Principal - Branco e Sombreado Suave */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <EfficiencyForm />
        </div>
        
        <p className="mt-6 text-center text-slate-400 text-xs">
          Uso interno • Confidencial
        </p>
      </div>
    </main>
  )
}