import Link from "next/link"
import { whatsappMessages } from "@/lib/whatsapp"

type WhatsAppContext = 
  | "general" 
  | "properties" 
  | "about" 
  | "contact" 
  | "referral" 
  | "clientArea"

interface WhatsAppButtonProps {
  context?: WhatsAppContext
}

export function WhatsAppButton({ context = "general" }: WhatsAppButtonProps) {
  const getMessageUrl = () => {
    switch (context) {
      case "properties":
        return whatsappMessages.propertiesPage()
      case "about":
        return whatsappMessages.aboutPage()
      case "contact":
        return whatsappMessages.contactPage()
      case "referral":
        return whatsappMessages.referralPage()
      case "clientArea":
        return whatsappMessages.clientArea()
      default:
        return whatsappMessages.general()
    }
  }

  return (
    <Link
      href={getMessageUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-colors duration-200 will-change-transform"
      aria-label="Contato via WhatsApp"
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 0C7.164 0 0 7.164 0 16c0 2.825.738 5.48 2.028 7.784L.142 31.276l7.778-2.04A15.93 15.93 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm8.28 22.504c-.348.98-1.728 1.796-2.828 2.032-.756.156-1.744.28-5.068-1.088-4.26-1.752-7.004-6.076-7.216-6.356-.208-.28-1.696-2.256-1.696-4.304s1.072-3.052 1.452-3.468c.38-.416.828-.52 1.104-.52.276 0 .552.004.792.012.256.012.6-.096.936.716.348.836 1.188 2.9 1.292 3.112.104.212.176.46.036.74-.14.28-.208.456-.416.704-.208.248-.436.552-.624.74-.208.212-.424.44-.184.864.24.416.1.068 2.22 3.664.344.464.688.616 1.176.484.488-.132 2.084-.972 2.368-1.304.284-.332.284-.776.2-.864-.084-.088-.308-.14-.644-.308-.336-.168-1.988-.98-2.296-1.092-.308-.112-.532-.168-.756.168-.224.336-.868 1.092-1.064 1.316-.196.224-.392.252-.728.084-.336-.168-1.42-.524-2.704-1.668-1-1.004-1.676-2.244-1.872-2.58-.196-.336-.02-.516.148-.684.152-.152.336-.396.504-.596.168-.2.224-.336.336-.56.112-.224.056-.42-.028-.588-.084-.168-.756-1.824-1.036-2.496-.272-.656-.548-.568-.756-.576-.196-.008-.42-.012-.644-.012-.224 0-.588.084-.896.42-.308.336-1.176 1.148-1.176 2.8s1.204 3.248 1.372 3.472c.168.224 2.372 3.62 5.748 5.076.804.348 1.432.556 1.92.712.808.256 1.544.22 2.124.132.648-.096 1.988-.812 2.268-1.596.28-.784.28-1.456.196-1.596-.084-.14-.308-.224-.644-.392z" />
      </svg>
    </Link>
  )
}
