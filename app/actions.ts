'use server'

import fs from 'fs/promises'
import path from 'path'

export async function saveResponse(data: any) {
  // Caminho do arquivo na raiz do projeto
  const filePath = path.join(process.cwd(), 'respostas.json')
  
  let fileData = []

  try {
    // Tenta ler o arquivo se ele já existir
    const content = await fs.readFile(filePath, 'utf8')
    fileData = JSON.parse(content)
  } catch (error) {
    // Se não existir, começamos uma lista nova
  }

  // Adiciona a nova resposta com a data de hoje
  fileData.push({ 
    ...data, 
    submittedAt: new Date().toLocaleString('pt-BR') 
  })

  // Salva no disco
  await fs.writeFile(filePath, JSON.stringify(fileData, null, 2))
  
  return { success: true }
}