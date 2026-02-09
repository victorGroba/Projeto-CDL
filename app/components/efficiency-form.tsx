"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, ClipboardList, Clock, HelpCircle, FileText, Send } from 'lucide-react'

export function EfficiencyForm() {
  const [step, setStep] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  
  const [formData, setFormData] = useState({
    mainTask: '',
    essentialTasks: ['', '', ''],
    wasteTasks: [
      { name: '', type: '' },
      { name: '', type: '' },
      { name: '', type: '' }
    ],
    feedback: ''
  })

  // Funções de atualização (iguais à lógica anterior)
  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  const updateEssential = (index: number, value: string) => {
    const newTasks = [...formData.essentialTasks]
    newTasks[index] = value
    setFormData(prev => ({ ...prev, essentialTasks: newTasks }))
  }
  const updateWaste = (index: number, field: 'name' | 'type', value: string) => {
    const newTasks = [...formData.wasteTasks]
    newTasks[index] = { ...newTasks[index], [field]: value }
    setFormData(prev => ({ ...prev, wasteTasks: newTasks }))
  }

  const steps = [
    {
      id: "intro",
      title: "Boas-vindas",
      icon: <ClipboardList className="w-6 h-6 text-slate-600" />,
      content: (
        <div className="text-center space-y-6 py-6">
          <p className="text-lg text-slate-700 font-medium">Olá, colaborador(a).</p>
          <p className="text-slate-500 leading-relaxed text-sm">
            Estamos revisando fluxos de trabalho para <strong>reduzir a burocracia</strong> e tornar sua rotina mais leve. 
            <br/><br/>
            Precisamos que você liste suas atividades principais e, principalmente, aquelas tarefas repetitivas que consomem seu tempo sem necessidade.
          </p>
        </div>
      )
    },
    {
      id: "key-task",
      title: "1. Seu Objetivo Principal",
      icon: <CheckCircle2 className="w-6 h-6 text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            Em uma frase, qual é a entrega mais importante do seu trabalho hoje?
          </p>
          <textarea 
            value={formData.mainTask}
            onChange={(e) => updateField('mainTask', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none h-32 text-sm shadow-sm"
            placeholder="Ex: Garantir o atendimento aos clientes da carteira X..."
          />
        </div>
      )
    },
    {
      id: "essential",
      title: "2. Outras Atividades Chave",
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            Liste até 3 outras atividades que são essenciais para sua função.
          </p>
          {formData.essentialTasks.map((task, i) => (
            <input 
              key={i}
              type="text"
              value={task}
              onChange={(e) => updateEssential(i, e.target.value)}
              placeholder={`Atividade Importante ${i + 1}`}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:border-blue-500 outline-none transition-colors text-sm shadow-sm"
            />
          ))}
        </div>
      )
    },
    {
      id: "waste",
      title: "3. Onde podemos ajudar?",
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-slate-500">
            Liste tarefas manuais, repetitivas ou burocráticas que cansam você.
            <br/>
            <span className="text-xs text-slate-400">Classifique como podemos resolver.</span>
          </p>
          
          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
            {formData.wasteTasks.map((task, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3 shadow-sm">
                <input 
                  type="text"
                  value={task.name}
                  onChange={(e) => updateWaste(i, 'name', e.target.value)}
                  placeholder={`Tarefa Trabalhosa ${i + 1} (ex: Copiar dados de planilhas)`}
                  className="w-full bg-white border border-slate-300 rounded p-2 text-slate-800 outline-none focus:border-blue-500 text-sm"
                />
                <select
                  value={task.type}
                  onChange={(e) => updateWaste(i, 'type', e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded p-2 text-xs text-slate-600 outline-none"
                >
                  <option value="">Qual seria a solução ideal?</option>
                  <option value="A">Gostaria de uma ferramenta/sistema para isso</option> {/* Código para IA */}
                  <option value="B">O processo precisa ser mais simples</option>
                  <option value="C">Não deveria ser minha função</option>
                  <option value="D">Não vejo utilidade nisso</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "feedback",
      title: "Comentários Finais",
      icon: <HelpCircle className="w-6 h-6 text-teal-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            Existe algo mais atrapalhando sua produtividade ou o ambiente da equipe?
          </p>
          <textarea 
            value={formData.feedback}
            onChange={(e) => updateField('feedback', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-800 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none h-32 text-sm shadow-sm"
            placeholder="Espaço livre..."
          />
        </div>
      )
    }
  ]

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      setIsCompleted(true)
      console.log("Respostas (Interno):", formData)
    }
  }

  const prevStep = () => setStep(step - 1)

  if (isCompleted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-6 bg-white"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Obrigado pela colaboração!</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Suas respostas foram registradas e ajudarão a melhorar nossos processos.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="text-sm text-blue-600 hover:text-blue-800 underline font-medium"
        >
          Enviar nova resposta
        </button>
      </motion.div>
    )
  }

  return (
    <div className="w-full bg-white p-6 md:p-8">
      {/* Barra de Progresso Sutil */}
      <div className="mb-8">
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
                className="h-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
            />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
           <span>Etapa {step + 1} de {steps.length}</span>
           <span>{Math.round(((step + 1) / steps.length) * 100)}%</span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    {steps[step].icon}
                </div>
                <h2 className="text-xl font-bold text-slate-800">{steps[step].title}</h2>
            </div>
            {steps[step].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Rodapé de Navegação */}
      <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
        <button 
          onClick={prevStep}
          disabled={step === 0}
          className={`px-4 py-2 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors ${step === 0 ? 'invisible' : 'visible'}`}
        >
          Voltar
        </button>
        
        <button 
          onClick={nextStep}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all shadow-sm hover:shadow-md text-sm"
        >
          {step === steps.length - 1 ? 'Concluir' : 'Continuar'}
          {step === steps.length - 1 ? <Send className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}