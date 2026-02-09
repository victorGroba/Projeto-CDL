"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { saveResponse } from '../actions' // <--- Importamos a ação do servidor
import { ArrowRight, CheckCircle2,  Clock, HelpCircle, FileText, Send, Sparkles, Building2 } from 'lucide-react'

export function EfficiencyForm() {
    const [step, setStep] = useState(0)
    const [isCompleted, setIsCompleted] = useState(false)
    const [isSaving, setIsSaving] = useState(false) // Estado de carregamento

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

    // Função que salva no servidor
    const handleFinish = async () => {
        setIsSaving(true)
        // Chama a Server Action
        await saveResponse(formData)
        
        // Simula um delayzinho para parecer chique
        setTimeout(() => {
            setIsSaving(false)
            setIsCompleted(true)
        }, 800)
    }

    const steps = [
        {
            id: "intro",
            title: "Diagnóstico de Processos",
            icon: <Building2 className="w-6 h-6 text-brand-dark" />,
            content: (
                <div className="text-center space-y-6 py-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="relative w-48 h-24">
                            <Image
                                src="/logo.png"
                                alt="Logo da Empresa"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </motion.div>
                    <div className="bg-brand-gray/20 p-4 rounded-xl text-left border-l-4 border-brand-main">
                        <p className="text-brand-dark font-medium text-sm">👋 Olá, colaborador(a).</p>
                        <p className="text-brand-neutral text-xs mt-1">
                            Este questionário leva menos de 3 minutos. Suas respostas são anônimas e focadas 100% na melhoria dos processos.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: "key-task",
            title: "O Que Gera Valor?",
            icon: <CheckCircle2 className="w-6 h-6 text-brand-main" />,
            content: (
                <div className="space-y-4">
                    <p className="text-sm text-brand-neutral">
                        Se você pudesse fazer apenas <strong>uma coisa</strong> o dia todo que trouxesse mais resultado para a empresa, o que seria?
                    </p>
                    <textarea
                        value={formData.mainTask}
                        onChange={(e) => updateField('mainTask', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-brand-dark focus:ring-2 focus:ring-brand-main outline-none resize-none h-32 text-sm shadow-inner"
                        placeholder="Ex: Criar campanhas de marketing criativas..."
                    />
                </div>
            )
        },
        {
            id: "essential",
            title: "Pilares da Rotina",
            icon: <FileText className="w-6 h-6 text-brand-dark" />,
            content: (
                <div className="space-y-4">
                    <p className="text-sm text-brand-neutral">
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
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-brand-dark focus:border-brand-main outline-none transition-all focus:pl-4 text-sm"
                        />
                    ))}
                </div>
            )
        },
        {
            id: "waste",
            title: "Caçadores de Gargalos",
            icon: <Clock className="w-6 h-6 text-red-500" />,
            content: (
                <div className="space-y-5">
                    <p className="text-sm text-brand-neutral">
                        Onde a burocracia te vence? Liste tarefas manuais/repetitivas e o que deveríamos fazer com elas.
                    </p>
                    
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {formData.wasteTasks.map((task, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }} 
                                className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 group hover:border-brand-main/50 transition-colors"
                            >
                                <input
                                    type="text"
                                    value={task.name}
                                    onChange={(e) => updateWaste(i, 'name', e.target.value)}
                                    placeholder={`Tarefa Chata ${i + 1} (ex: Digitar notas fiscais)`}
                                    className="w-full bg-transparent border-b border-slate-200 pb-1 text-brand-dark outline-none focus:border-brand-main text-sm font-medium"
                                />
                                <select
                                    value={task.type}
                                    onChange={(e) => updateWaste(i, 'type', e.target.value)}
                                    className="w-full bg-transparent text-xs text-brand-neutral outline-none cursor-pointer mt-1"
                                >
                                    <option value="">Qual a solução ideal?</option>
                                    <option value="A">🤖 Automatizar com IA/Sistema</option>
                                    <option value="B">⚡ Simplificar etapas</option>
                                    <option value="C">👥 Delegar para outra área</option>
                                    <option value="D">🗑️ Eliminar (Inútil)</option>
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
            icon: <HelpCircle className="w-6 h-6 text-brand-main" />,
            content: (
                <div className="space-y-4">
                    <p className="text-sm text-brand-neutral">
                        Tem alguma ideia genial ou uma crítica construtiva que não coube antes?
                    </p>
                    <textarea
                        value={formData.feedback}
                        onChange={(e) => updateField('feedback', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-brand-dark focus:ring-2 focus:ring-brand-main outline-none resize-none h-32 shadow-inner text-sm"
                        placeholder="Sou todo ouvidos..."
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

    if (isCompleted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 px-6"
            >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                    <Sparkles className="w-12 h-12 text-green-600 animate-bounce" />
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-green-400 rounded-full"
                    />
                </div>
                <h2 className="text-3xl font-bold text-brand-dark mb-2">Sucesso!</h2>
                <p className="text-brand-neutral mb-8">
                    Suas respostas foram salvas com segurança no nosso servidor.
                    <br/>Obrigado por ajudar a construir uma empresa mais eficiente.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-sm text-brand-main hover:text-brand-dark underline font-medium transition-colors"
                >
                    Enviar outra resposta
                </button>
            </motion.div>
        )
    }

    return (
        <div className="w-full h-full p-8 flex flex-col justify-between min-h-[500px]">
            {/* Header */}
            <div>
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2">
                        {steps[step].icon}
                        <span className="text-xs font-bold text-brand-neutral uppercase tracking-wider">
                            Passo {step + 1}/{steps.length}
                        </span>
                    </div>
                    <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-brand-main"
                            initial={{ width: 0 }}
                            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                {/* Conteúdo Animado */}
                <div className="min-h-[320px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <h2 className="text-2xl font-bold text-brand-dark mb-6">{steps[step].title}</h2>
                            {steps[step].content}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer / Botões */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-auto">
                <button
                    onClick={prevStep}
                    disabled={step === 0}
                    className={`text-slate-400 hover:text-brand-dark text-sm font-medium transition-colors ${step === 0 ? 'invisible' : 'visible'}`}
                >
                    Voltar
                </button>

                <button
                    onClick={nextStep}
                    disabled={isSaving}
                    className="bg-brand-dark hover:bg-brand-main text-white px-8 py-3 rounded-xl flex items-center gap-2 font-bold transition-all hover:shadow-lg hover:shadow-brand-main/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                    {isSaving ? 'Salvando...' : (step === steps.length - 1 ? 'Enviar Resposta' : 'Continuar')}
                    {!isSaving && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
            </div>
        </div>
    )
}