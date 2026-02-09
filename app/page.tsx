import { EfficiencyForm } from './components/efficiency-form'
import { ParticlesBackground } from './components/particles-background'
import { Star } from 'lucide-react'

export default function Home() {
  return (
    // Removemos a cor de fundo escura e a imagem
    <main className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">

      {/* 1. O Novo Fundo com as Cores da Empresa */}
      <ParticlesBackground />

       {/* 2. Conteúdo Principal */}
      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center gap-6">

        {/* Cabeçalho - Ajustado para cores escuras (já que o fundo agora é claro) */}
        <div className="text-center space-y-4 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-main/20 text-brand-dark rounded-full text-xs font-bold border border-brand-main/30 backdrop-blur-md">
            <Star className="w-3 h-3 text-brand-main animate-pulse" fill="currentColor" />
            Diagnóstico Interno
          </div>

          {/* Título usando a cor escura da marca */}
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-brand-dark">
            Sua visão <span className="text-brand-main">molda</span><br/> o nosso futuro.
          </h1>

          {/* Texto secundário usando o cinza médio da marca */}
          <p className="text-brand-neutral text-sm font-medium max-w-md mx-auto">
             Responda em menos de 3 minutos e ajude a eliminar a burocracia do dia a dia.
          </p>
        </div>

        {/* Formulário de Vidro - Borda mais visível para destacar no fundo claro */}
        <div className="w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-brand-light/50 overflow-hidden relative">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-main to-brand-dark" />
           <EfficiencyForm />
        </div>

      </div>
    </main>
  )
}