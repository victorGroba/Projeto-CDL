import { EfficiencyForm } from './components/efficiency-form'
import { Heart } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-slate-50">
      
      {/* --- AQUI ESTÁ O SEGREDO DO FUNDO VIVO --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
          {/* 1. Chamamos a classe .aurora-gradient que definimos no CSS */}
          <div className="aurora-gradient" />
          
          {/* 2. Camada de Vidro (Para o texto ficar legível e elegante) */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[3px]" />
      </div>

      {/* --- CONTEÚDO PRINCIPAL (Fica na frente com z-10) --- */}
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center gap-8 py-8">

        {/* Cabeçalho Emocional */}
        <div className="text-center space-y-6 px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          
          {/* Badge de Propósito */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/60 text-brand-dark rounded-full text-sm font-semibold border border-white/50 backdrop-blur-md shadow-sm transition-transform hover:scale-105 cursor-default">
            <Heart className="w-4 h-4 text-[#ec4899] fill-[#ec4899] animate-pulse" />
            <span>Dedicação que inspira</span>
          </div>

          {/* Título e Subtítulo */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[#2f3e46] tracking-tight drop-shadow-sm">
            Cuidando de quem <br/>
            <span className="text-brand-main bg-clip-text text-transparent bg-gradient-to-r from-brand-main to-brand-dark">
              constrói
            </span> o nosso futuro.
          </h1>

          <p className="text-slate-600 font-medium text-lg md:text-xl leading-relaxed max-w-xl mx-auto drop-shadow-sm">
            Obrigado pelo seu empenho diário. Queremos ouvir você para tornar a rotina mais leve, simples e humana.
          </p>
        </div>

        {/* Formulário com Efeito de Vidro */}
        <div className="w-full bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-white/40 p-1 transform transition-all hover:shadow-[0_25px_50px_rgb(0,0,0,0.1)]">
           <EfficiencyForm />
        </div>

      </div>
    </main>
  )
}