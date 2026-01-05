"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface TermsConditionsPopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

export default function TermsConditionsPopup({ isOpen, onClose, title }: TermsConditionsPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <div className="text-sm space-y-4 mt-2">
          <p>Bem-vindo a Alexandra Ribeiro – Consultora Digital e Assistente Virtual!</p>
          <p>
            Estes termos e condições descrevem as regras e regulamentos para o uso do site de Alexandra Ribeiro,
            localizado em www.alexandraribeiro.pt.
          </p>
          <p>
            Ao aceder a este site, presumimos que aceita estes termos e condições. Não continue a usar Alexandra Ribeiro
            – Consultora Digital e Assistente Virtual se não concordar com todos os termos e condições declarados nesta
            página.
          </p>
          <p>
            Não deve reproduzir, duplicar ou copiar o material de Alexandra Ribeiro – Consultora Digital e Assistente
            Virtual, sendo que este acordo deve iniciar-se na data deste documento.
          </p>
          <p>
            Reservamo-nos ao direito de realizar alterações aos Termos e Condições aqui apresentados, periodicamente,
            sem emitir qualquer notificação. As alterações têm efeito a partir da data em que são publicadas neste
            website.
          </p>
          <p>
            Os dados pessoais que introduziu neste website poderão ser utilizados como forma de contacto e envio de
            comunicação pertinente no âmbito dos serviços prestados por Alexandra Ribeiro – Consultora Digital e
            Assistente Virtual, em conformidade com a nossa Política de Privacidade, que também pode consultar neste
            site.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
