/**
 * WhatsApp message builder - cria mensagens personalizadas para cada contexto
 */

const WHATSAPP_NUMBER = "5511921773843"

interface PropertyInfo {
  name: string
  location: string
  price: string
  bedrooms: string
  bathrooms: string
  area: string
}

interface ContactFormData {
  name: string
  phone: string
  email: string
}

interface ReferralFormData {
  name: string
  email: string
  phone: string
}

export const whatsappMessages = {
  // Hero Section - Interesse nas ofertas do feirão
  heroOffers: () => {
    const message = `Olá! 👋
Vi o MEGA FEIRÃO de Apartamentos no site e quero APROVEITAR AS OFERTAS!

Tenho interesse em conhecer os imóveis com desconto de até R$ 71 mil. 

Pode me passar mais informações? 🏢✨`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  },

  // Header - Fazer simulação
  simulation: () => {
    const message = `Olá! 👋
Gostaria de fazer uma SIMULAÇÃO de financiamento.

Pode me ajudar com as melhores condições disponíveis? 💰🏠`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  },

  // Property Modal - Agendar visita para imóvel específico
  scheduleVisit: (property: PropertyInfo) => {
    const message = `Olá! 👋
Gostaria de AGENDAR UMA VISITA para o imóvel:

🏢 *${property.name}*
📍 ${property.location}
💰 ${property.price}
🛏️ ${property.bedrooms} quartos | 🚿 ${property.bathrooms} banheiros
📐 ${property.area}

Quais horários estão disponíveis? 📅`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  },

  // Property Modal - Interesse em imóvel específico
  propertyInterest: (property: PropertyInfo) => {
    const message = `Olá! 👋
Tenho INTERESSE no imóvel:

🏢 *${property.name}*
📍 ${property.location}
💰 ${property.price}

Gostaria de mais informações sobre:
• Condições de pagamento
• Documentação necessária
• Disponibilidade

Pode me ajudar? ✨`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  },

  // Contact Form - Formulário de contato preenchido
  contactForm: (data: ContactFormData) => {
    const message = `Olá! 👋
Preenchi o formulário de contato no site:

📋 *MEUS DADOS:*
👤 Nome: ${data.name}
📱 Telefone: ${data.phone}
📧 Email: ${data.email}

Gostaria de receber mais informações sobre os imóveis disponíveis no feirão! 🏢✨`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  },

  // Referral Section - Programa de indicação
  referralProgram: (data: ReferralFormData) => {
    const message = `Olá! 👋
Quero me CADASTRAR no Programa INDIQUE E GANHE! 🎁

📋 *MEUS DADOS:*
👤 Nome: ${data.name}
📱 Telefone: ${data.phone}
📧 Email: ${data.email}

Como funciona o programa de indicação?
Quais são as bonificações? 💰`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  },

  // WhatsApp Button flutuante - Mensagem genérica qualificada
  general: () => {
    const message = `Olá! 👋
Estou visitando o site da kakodacury e gostaria de MAIS INFORMAÇÕES sobre:

📋 Escolha uma opção:
1️⃣ Imóveis disponíveis no feirão
2️⃣ Condições de financiamento
3️⃣ Agendar visita
4️⃣ Programa de indicação
5️⃣ Outro assunto

Aguardo retorno! 🏢✨`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  },

  // Página de imóveis - interesse geral
  propertiesPage: () => {
    const message = `Olá! 👋
Estou na página de IMÓVEIS e gostaria de:

✨ Ver todas as opções disponíveis
💰 Saber sobre condições de pagamento
📅 Agendar visitas
🏢 Receber mais informações

Pode me ajudar? 🏠`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  },

  // Página sobre nós
  aboutPage: () => {
    const message = `Olá! 👋
Vi a página SOBRE NÓS e me interessei pela kakodacury!

Gostaria de saber mais sobre:
🏢 Empreendimentos disponíveis
💼 Formas de atendimento
📋 Como iniciar meu processo

Aguardo retorno! ✨`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  },

  // Página de contato
  contactPage: () => {
    const message = `Olá! 👋
Estou na página de CONTATO e preciso de atendimento!

Gostaria de falar sobre:
🏢 Imóveis disponíveis
💰 Simulação de financiamento
📅 Agendamento de visita

Pode me ajudar? ✨`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  },

  // Página área do cliente
  clientArea: () => {
    const message = `Olá! 👋
Estou na ÁREA DO CLIENTE e preciso de ajuda com:

📋 Escolha uma opção:
1️⃣ Acessar minha área
2️⃣ Acompanhar meu processo
3️⃣ Dúvidas sobre documentação
4️⃣ Outro assunto

Aguardo retorno! ✨`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  },

  // Página de indicação
  referralPage: () => {
    const message = `Olá! 👋
Vi a página do PROGRAMA INDIQUE E GANHE! 🎁

Quero saber mais sobre:
💰 Como funciona o programa
🎯 Valores das bonificações
📋 Como fazer o cadastro

Pode me explicar? ✨`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  },
}

