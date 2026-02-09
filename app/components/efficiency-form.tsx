"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image' // <--- Importante para o Logo
import { saveResponse } from '../actions'
import { ArrowRight, CheckCircle2,  Clock, HelpCircle, FileText, Sparkles, Heart } from 'lucide-react'

export function EfficiencyForm() {
    const [step, setStep] = useState(0)
    const [isCompleted, setIsCompleted] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

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

    const handleFinish = async () => {
        setIsSaving(true)
        await saveResponse(formData)
        setTimeout(() => {
            setIsSaving(false)
            setIsCompleted(true)
        }, 800)
    }

    // Configuração dos Passos
    const steps = [
        {
            id: "intro",
            title: "", 
            icon: null,
            content: (
                <div className="text-center flex flex-col items-center justify-center h-full py-4 space-y-8">
                    
                    {/* --- ÁREA DO LOGO --- */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-64 h-24 md:w-72 md:h-28" // Ajuste o tamanho aqui se precisar
                    >
                        <Image
                            src="/logo.png" // Certifique-se que o arquivo existe em public/logo.png
                            alt="Logo da Empresa"
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>

                    {/* Texto de Boas Vindas */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-center gap-2 text-brand-main">
                             <Heart className="w-5 h-5 fill-current animate-pulse" />
                             <span className="text-sm font-bold uppercase tracking-widest">Diagnóstico Interno</span>
                        </div>
                        
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
                            Sua voz importa.
                        </h2>
                        <p className="text-slate-500 text-lg max-w-md mx-auto leading-relaxed">
                            Ajude-nos a construir um ambiente de trabalho mais leve e eficiente em apenas 3 minutos.
                        </p>
                    </div>

                    {/* Badge de Privacidade */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/60 text-slate-500 rounded-full text-xs font-medium border border-slate-200">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Respostas 100% Anônimas
                    </div>
                </div>
            )
        },
        {
            id: "key-task",
            title: "O Que Gera Valor?",
            icon: <CheckCircle2 className="w-5 h-5 text-brand-main" />,
            content: (
                <div className="space-y-4">
                    <p className="text-sm text-slate-500">
                        Se você pudesse fazer apenas <strong>uma coisa</strong> o dia todo que trouxesse mais resultado, o que seria?
                    </p>
                    <textarea
                        value={formData.mainTask}
                        onChange={(e) => updateField('mainTask', e.target.value)}
                        className="w-full bg-white/50 border border-slate-200 rounded-xl p-4 text-brand-dark focus:ring-2 focus:ring-brand-main/50 outline-none resize-none h-32 text-sm shadow-sm transition-all focus:bg-white"
                        placeholder="Ex: Criar campanhas, atender clientes..."
                        autoFocus
                    />
                </div>
            )
        },
        {
            id: "essential",
            title: "Pilares da Rotina",
            icon: <FileText className="w-5 h-5 text-brand-dark" />,
            content: (
                <div className="space-y-3">
                    <p className="text-sm text-slate-500">
                        Cite até 3 outras atividades indispensáveis para sua função.
                    </p>
                    {formData.essentialTasks.map((task, i) => (
                        <motion.input
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            type="text"
                            value={task}
                            onChange={(e) => updateEssential(i, e.target.value)}
                            placeholder={`Atividade Essencial ${i + 1}`}
                            className="w-full bg-white/50 border border-slate-200 rounded-xl p-3 text-brand-dark focus:border-brand-main outline-none transition-all focus:pl-4 text-sm focus:bg-white focus:shadow-sm"
                        />
                    ))}
                </div>
            )
        },
        {
            id: "waste",
            title: "Caçadores de Gargalos",
            icon: <Clock className="w-5 h-5 text-red-500" />,
            content: (
                <div className="space-y-4">
                    <p className="text-sm text-slate-500">
                        Liste tarefas repetitivas/manuais e o que deveríamos fazer com elas.
                    </p>
                    
                    <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                        {formData.wasteTasks.map((task, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }} 
                                className="p-3 bg-white/60 rounded-xl border border-slate-200 hover:border-brand-main/40 transition-all shadow-sm"
                            >
                                <input
                                    type="text"
                                    value={task.name}
                                    onChange={(e) => updateWaste(i, 'name', e.target.value)}
                                    placeholder={`Tarefa Chata ${i + 1} (ex: Digitar notas)`}
                                    className="w-full bg-transparent border-b border-slate-200/60 pb-1 text-brand-dark outline-none focus:border-brand-main text-sm font-medium placeholder:text-slate-400"
                                />
                                <select
                                    value={task.type}
                                    onChange={(e) => updateWaste(i, 'type', e.target.value)}
                                    className="w-full bg-transparent text-xs text-slate-500 outline-none cursor-pointer mt-2 py-1"
                                >
                                    <option value="">Qual a solução ideal?</option>
                                    <option value="A">🤖 Automatizar</option>
                                    <option value="B">⚡ Simplificar</option>
                                    <option value="C">👥 Delegar</option>
                                    <option value="D">🗑️ Eliminar</option>
                                </select>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            id: "feedback",
            title: "Espaço Livre",
            icon: <HelpCircle className="w-5 h-5 text-brand-main" />,
            content: (
                <div className="space-y-4">
                    <p className="text-sm text-slate-500">
                        Ideias geniais ou críticas construtivas? O espaço é seu.
                    </p>
                    <textarea
                        value={formData.feedback}
                        onChange={(e) => updateField('feedback', e.target.value)}
                        className="w-full bg-white/50 border border-slate-200 rounded-xl p-4 text-brand-dark focus:ring-2 focus:ring-brand-main/50 outline-none resize-none h-32 shadow-sm text-sm focus:bg-white transition-all"
                        placeholder="Escreva aqui..."
                    />
                </div>
            )
        }
    ]

    const nextStep = () => {
        if (step < steps.length - 1) {
            setStep(step + 1)
        } else {
            handleFinish()
        }
    }

    const prevStep = () => setStep(step - 1)

    // TELA DE SUCESSO
    if (isCompleted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 px-6 flex flex-col items-center justify-center h-full"
            >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 relative">
                    <Sparkles className="w-10 h-10 text-green-600 animate-bounce" />
                </div>
                <h2 className="text-2xl font-bold text-brand-dark mb-2">Resposta Enviada!</h2>
                <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8">
                    Obrigado por contribuir. Juntos vamos longe.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-sm text-brand-main hover:text-brand-dark font-semibold transition-colors"
                >
                    Enviar outra resposta
                </button>
            </motion.div>
        )
    }

    return (
        <div className="w-full h-full p-6 md:p-8 flex flex-col justify-between min-h-[450px]">
            
            {/* CABEÇALHO (Só aparece DEPOIS do passo 0) */}
            {step > 0 && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            {steps[step].icon}
                            <span className="text-xs font-bold text-brand-neutral uppercase tracking-wider">
                                Passo {step}/{steps.length - 1}
                            </span>
                        </div>
                        {/* Barra de Progresso Fina */}
                        <div className="h-1 w-24 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-brand-main to-brand-dark"
                                initial={{ width: 0 }}
                                animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-brand-dark mb-1">{steps[step].title}</h2>
                </div>
            )}

            {/* CONTEÚDO (Com Animação) */}
            <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20, filter: "blur(5px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                    >
                        {steps[step].content}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* RODAPÉ / BOTÕES */}
            <div className="flex justify-between items-center pt-6 mt-4">
                {/* Botão Voltar (Invisível no passo 0) */}
                <button
                    onClick={prevStep}
                    disabled={step === 0}
                    className={`text-slate-400 hover:text-brand-dark text-sm font-medium transition-colors px-4 py-2 ${step === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                    Voltar
                </button>

                <button
                    onClick={nextStep}
                    disabled={isSaving}
                    className={`
                        px-8 py-3 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg hover:shadow-xl active:scale-95
                        ${step === 0 
                            ? 'bg-gradient-to-r from-brand-main to-brand-dark text-white w-full justify-center hover:opacity-90' // Botão Grande no Passo 0
                            : 'bg-brand-dark text-white hover:bg-brand-main' // Botão Normal nos outros
                        }
                    `}
                >
                    {isSaving ? 'Salvando...' : (step === 0 ? 'Começar Agora' : (step === steps.length - 1 ? 'Enviar' : 'Continuar'))}
                    {!isSaving && step !== 0 && <ArrowRight className="w-4 h-4" />}
                </button>
            </div>
        </div>
    )
}