"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, ClipboardList, Clock, HelpCircle, FileText, Download, Building2 } from 'lucide-react'

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

    // Funções de atualização
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

    // Função para Gerar o CSV (Excel)
    const downloadCSV = () => {
        const headers = ["Tarefa Principal", "Essencial 1", "Essencial 2", "Essencial 3", "Gargalo 1", "Solucao 1", "Gargalo 2", "Solucao 2", "Feedback"];
        const row = [
            `"${formData.mainTask}"`,
            `"${formData.essentialTasks[0]}"`,
            `"${formData.essentialTasks[1]}"`,
            `"${formData.essentialTasks[2]}"`,
            `"${formData.wasteTasks[0].name}"`,
            `"${formData.wasteTasks[0].type}"`,
            `"${formData.wasteTasks[1].name}"`,
            `"${formData.wasteTasks[1].type}"`,
            `"${formData.feedback}"`
        ];

        const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + row.join(",");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "respostas_diagnostico.csv");
        document.body.appendChild(link);
        link.click();
    }

    const steps = [
        {
            id: "intro",
            title: "Diagnóstico de Processos",
            icon: <Building2 className="w-8 h-8 text-brand-dark" />,
            content: (
                <div className="text-center space-y-6 py-6">
                    {/* LOGO DA EMPRESA AQUI */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="flex justify-center mb-6"
                    >
                        {/* AQUI ESTÁ A MUDANÇA: Usando o Image do Next.js */}
                        <div className="relative w-48 h-20"> {/* Ajuste w-48 e h-20 conforme o tamanho da sua logo */}
                            <Image
                                src="/logo.png"  // Certifique-se que o nome do arquivo na pasta public é exatamente este
                                alt="Logo da Empresa"
                                fill
                                className="object-contain" // Isso faz a logo caber sem distorcer
                                priority
                            />
                        </div>
                    </motion.div>
                    <p className="text-lg text-brand-dark font-semibold">Olá, colaborador(a).</p>
                    <p className="text-brand-neutral leading-relaxed text-sm max-w-md mx-auto">
                        Estamos mapeando oportunidades de melhoria. Sua participação é essencial para tornarmos nosso dia a dia mais eficiente.
                    </p>
                </div>
            )
        },
        {
            id: "key-task",
            title: "1. Foco Principal",
            icon: <CheckCircle2 className="w-6 h-6 text-brand-main" />,
            content: (
                <div className="space-y-4">
                    <p className="text-sm text-brand-neutral">
                        Qual é a entrega mais valiosa do seu trabalho atualmente?
                    </p>
                    <textarea
                        value={formData.mainTask}
                        onChange={(e) => updateField('mainTask', e.target.value)}
                        className="w-full bg-white border border-brand-light rounded-lg p-4 text-brand-dark focus:ring-2 focus:ring-brand-main outline-none resize-none h-32 shadow-sm transition-all"
                        placeholder="Ex: Gerenciar carteira de clientes..."
                    />
                </div>
            )
        },
        {
            id: "essential",
            title: "2. Atividades Chave",
            icon: <FileText className="w-6 h-6 text-brand-dark" />,
            content: (
                <div className="space-y-4">
                    <p className="text-sm text-brand-neutral">
                        Liste até 3 outras atividades essenciais da sua rotina.
                    </p>
                    {formData.essentialTasks.map((task, i) => (
                        <input
                            key={i}
                            type="text"
                            value={task}
                            onChange={(e) => updateEssential(i, e.target.value)}
                            placeholder={`Atividade ${i + 1}`}
                            className="w-full bg-white border border-brand-light rounded-lg p-3 text-brand-dark focus:border-brand-main outline-none transition-colors shadow-sm"
                        />
                    ))}
                </div>
            )
        },
        {
            id: "waste",
            title: "3. Oportunidades",
            icon: <Clock className="w-6 h-6 text-red-400" />,
            content: (
                <div className="space-y-6">
                    <p className="text-sm text-brand-neutral">
                        Liste tarefas repetitivas ou burocráticas que poderiam ser melhoradas.
                    </p>

                    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                        {formData.wasteTasks.map((task, i) => (
                            <div key={i} className="p-4 bg-white rounded-lg border border-brand-light space-y-3 shadow-sm">
                                <input
                                    type="text"
                                    value={task.name}
                                    onChange={(e) => updateWaste(i, 'name', e.target.value)}
                                    placeholder={`Tarefa ${i + 1} (ex: Copiar dados manuais)`}
                                    className="w-full bg-brand-gray/30 border-b border-brand-light p-2 text-brand-dark outline-none focus:border-brand-main text-sm"
                                />
                                <select
                                    value={task.type}
                                    onChange={(e) => updateWaste(i, 'type', e.target.value)}
                                    className="w-full bg-transparent text-xs text-brand-dark/70 outline-none cursor-pointer"
                                >
                                    <option value="">Selecione a sugestão...</option>
                                    <option value="A">Gostaria de uma ferramenta (Automatizar)</option>
                                    <option value="B">Simplificar o processo</option>
                                    <option value="C">Delegar para outra área</option>
                                    <option value="D">Eliminar (Não é necessário)</option>
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            id: "feedback",
            title: "Comentários",
            icon: <HelpCircle className="w-6 h-6 text-brand-main" />,
            content: (
                <div className="space-y-4">
                    <p className="text-sm text-brand-neutral">
                        Algo mais a acrescentar?
                    </p>
                    <textarea
                        value={formData.feedback}
                        onChange={(e) => updateField('feedback', e.target.value)}
                        className="w-full bg-white border border-brand-light rounded-lg p-4 text-brand-dark focus:ring-2 focus:ring-brand-main outline-none resize-none h-32 shadow-sm"
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
            downloadCSV() // <--- BAIXA O ARQUIVO AUTOMATICAMENTE
        }
    }

    const prevStep = () => setStep(step - 1)

    if (isCompleted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 px-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl"
            >
                <div className="w-20 h-20 bg-brand-light/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Download className="w-10 h-10 text-brand-main" />
                </div>
                <h2 className="text-2xl font-bold text-brand-dark mb-4">Obrigado!</h2>
                <p className="text-brand-neutral mb-8 max-w-md mx-auto">
                    Suas respostas foram salvas no seu computador (arquivo .csv).
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-sm text-brand-main hover:text-brand-dark underline font-medium"
                >
                    Nova resposta
                </button>
            </motion.div>
        )
    }

    return (
        <div className="w-full bg-white/90 backdrop-blur-xl p-6 md:p-10 rounded-3xl shadow-2xl border border-white">
            {/* Barra de Progresso */}
            <div className="mb-8">
                <div className="h-2 bg-brand-gray rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-brand-main"
                        initial={{ width: 0 }}
                        animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
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
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-light/30">
                            <div className="p-2 bg-brand-light/20 rounded-lg">
                                {steps[step].icon}
                            </div>
                            <h2 className="text-xl font-bold text-brand-dark">{steps[step].title}</h2>
                        </div>
                        {steps[step].content}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Rodapé */}
            <div className="flex justify-between mt-8 pt-6 border-t border-brand-light/30">
                <button
                    onClick={prevStep}
                    disabled={step === 0}
                    className={`px-4 py-2 text-brand-neutral hover:text-brand-dark text-sm font-medium transition-colors ${step === 0 ? 'invisible' : 'visible'}`}
                >
                    Voltar
                </button>

                <button
                    onClick={nextStep}
                    className="bg-brand-main hover:bg-brand-dark text-white px-8 py-3 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg hover:shadow-brand-main/40 hover:-translate-y-1"
                >
                    {step === steps.length - 1 ? 'Concluir' : 'Continuar'}
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}