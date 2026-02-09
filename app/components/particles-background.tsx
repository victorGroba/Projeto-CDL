"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Particle = {
  id: number
  size: number
  initialX: number
  initialY: number
  duration: number
}

export const ParticlesBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      // Aumentei o tamanho para ficarem mais visíveis
      size: Math.random() * 6 + 4, // Entre 4px e 10px
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      duration: Math.random() * 25 + 15,
    }))
    setParticles(newParticles)
  }, [])

  return (
    // Mudamos o fundo base para a cor cinza da sua paleta (#d3dcdd)
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-brand-gray">
      
      {/* Luzes de Fundo (Orbs) - Usando SUAS CORES */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-50">
          {/* Luz superior esquerda: Seu Azul Petróleo (#65848a) */}
          <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-brand-dark rounded-full blur-[150px] animate-pulse" />
          
          {/* Luz inferior direita: Seu Turquesa Vibrante (#7cbcc4) */}
          <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-brand-main rounded-full blur-[150px]" />
      </div>

      {/* Partículas - Usando o Turquesa (#7cbcc4) com mais opacidade */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-brand-main blur-[1px]"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
            // Aumentei a opacidade base para 0.4
            opacity: 0.4,
          }}
          animate={{
            y: [0, -120, 0],
            // Aumentei a opacidade máxima na animação para 0.8
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}