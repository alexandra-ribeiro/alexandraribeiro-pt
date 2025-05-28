"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface PrivacyPolicyPopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

export default function PrivacyPolicyPopup({ isOpen, onClose, title }: PrivacyPolicyPopupProps) {
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
          <p>
            O site www.alexandraribeiro.pt é propriedade de Alexandra Ribeiro e caracteriza-se como sendo uma plataforma
            de serviços de Consultoria Digital e Assistência Virtual técnica realizados pela fundadora.
          </p>
          <p>
            Esta Política de Privacidade, em conformidade com o Regulamento Geral sobre a Proteceção de Dados (UE)
            2016/679 do Parlamento Europeu, de 27 de abril de 2016, relativo à proteção das pessoas singulares no que
            diz respeito ao tratamento de dados pessoais e à livre circulação desses dados e que revoga a Diretiva
            95/46/CE – e restante legislação nacional aplicável no âmbito da privacidade e proteção de dados, determina
            como processamos as informações recolhidas por www.alexandraribeiro.pt , informa sobre a finalidade,
            períodos de conservação , com quem partilhamos e fornece os motivos pelos quais devemos recolher certos
            dados pessoais sobre si.
          </p>
          <p>
            A sua privacidade é de extrema importância para nós e comprometemo-nos a garantir a sua confidencialidade e
            segurança. Solicitamos que leia esta Política de Privacidade antes de usar o site www.alexandraribeiro.pt.
          </p>

          <h3 className="font-semibold text-lg mt-6">Informações pessoais que recolhemos</h3>
          <p>
            Informações gerais sobre o seu dispositivo: incluindo browser, endereço IP, fuso horário, e alguns dos
            cookies instalados no seu dispositivo O site usa cookies para ajudar a personalizar a sua experiência
            online. Ao aceder a Alexandra Ribeiro – Consultora Digital, concordou em usar os cookies necessários. Um
            cookie é um arquivo de texto colocado no seu disco rígido por um servidor de páginas web. Os cookies não
            podem ser usados para executar programas ou enviar vírus para o seu computador. Os cookies são atribuídos
            exclusivamente a si e só podem ser lidos por um servidor web no domínio que emitiu o cookie. Podemos usar
            cookies para recolher, armazenar e rastrear informações para fins estatísticos ou de marketing para operar o
            nosso site. Tem a opção de aceitar ou recusar Cookies opcionais. Existem alguns Cookies necessários para o
            funcionamento do nosso site. Esses cookies não exigem o seu consentimento. Lembre-se de que, ao aceitar os
            cookies necessários, também aceita cookies de terceiros, que podem ser usados por meio de serviços
            fornecidos por terceiros se usar esses serviços no nosso site, por exemplo, uma janela de exibição de vídeo
            fornecida por terceiros e integrada no nosso site.
          </p>
          <p>
            Conforme navega no Site, recolhemos informações sobre as páginas ou produtos individuais que visualiza,
            quais os sites ou termos de pesquisa que o direcionaram ao site e como interage com o mesmo. Referimo-nos a
            essas informações recolhidas automaticamente como "Informações do dispositivo". Além disso, podemos recolher
            os dados pessoais que nos fornece (incluindo, mas não se limitando a Nome, Apelido, Morada, Informações de
            pagamento, etc.) durante o registo e/ou preenchimento de formulários, para poder cumprir o acordo.
          </p>
          <p>
            Google Analytics: no nosso site utilizamos a plataforma Google Analytics. O Google Analytics recolhe cookies
            originais, dados anonimizados, relacionados com o dispositivo/navegador, o endereço IP e as atividades no
            site/de apps para medir e comunicar estatísticas sobre interações dos utilizadores nos Websites e/ou apps
            que utilizam o Google Analytics.
          </p>

          <h3 className="font-semibold text-lg mt-6">Porque processamos os seus dados?</h3>
          <p>
            A nossa principal prioridade é a segurança dos dados do cliente e, como tal, podemos processar apenas dados
            mínimos do utilizador, apenas o que for absolutamente necessário para manter o site. As informações
            recolhidas automaticamente são usadas apenas para identificar casos potenciais de abuso e estabelecer
            informações estatísticas sobre o uso do site. Essas informações estatísticas não são agregadas de outra
            forma que identifiquem qualquer utilizador específico do sistema.
          </p>
          <p>
            Relativamente aos dados recolhidos nos nossos formulários, processamos as suas informações por forma a
            garantir o cumprimento de contratos que possamos ter consigo (por exemplo, se fizer um pedido através do
            Site ou para envio de newsletter ou e-book gratuito). Quando preenche um dos formulários de contacto, os
            dados fornecidos relativos a nome e email podem ser usados para comunicação da marca, via email.
          </p>

          <h3 className="font-semibold text-lg mt-6">Por quanto tempo conservamos os seus dados?</h3>
          <p>
            A conservação dos dados pode ser efetuada pelo período em que subsistirem obrigações legais ou decorrentes
            da relação comercial com os clientes. No caso de dados recolhidos nos nossos formulários de contacto, os
            dados são mantidos indefinidamente, excepto se nos for solicitado pelo cliente o contrário.
          </p>
          <p>
            Pode visitar o site sem nos dizer quem é ou revelar qualquer informação, pela qual alguém possa
            identificá-lo como um indivíduo específico e identificável. Pode optar por não nos fornecer os seus dados
            pessoais, mas talvez não consiga tirar proveito de alguns dos recursos do site. Por exemplo, não poderá
            receber e-books gratuitos e/ou entrar em contato connosco diretamente do site. Os utilizadores que não têm
            certeza sobre quais as informações que são obrigatórias podem entrar em contato através de
            geral@alexandraribeiro.pt.
          </p>

          <h3 className="font-semibold text-lg mt-6">Os seus direitos</h3>
          <p>
            Estamos empenhados em garantir o respeito pelos direitos dos titulares de dados pessoais: o direito de
            acesso e de informação, o direito de retificação, o direito de limitação do tratamento, o direito à
            portabilidade, o direito a ser esquecido, o direito de retirar o consentimento, o direito de oposição, o
            direito a não ficar sujeito a decisões individuais tomadas de forma totalmente automatizada, incluindo a
            definição de perfis e o direito de apresentar reclamação, no âmbito e nos termos do RGPD e da demais
            legislação aplicável.
          </p>

          <h3 className="font-semibold text-lg mt-6">Links para outros sites</h3>
          <p>
            O nosso site pode conter links para outros sites que não são de nossa propriedade ou controlados por nós. A
            nossa política não se aplica a sites de terceiros, pelo que não nos responsabilizamos pelas políticas e
            conteúdos dos mesmos e incentivamos a estar atento ao sair do nosso site e ler as declarações de privacidade
            de cada website externo.
          </p>

          <h3 className="font-semibold text-lg mt-6">Segurança da informação</h3>
          <p>
            Protegemos as informações que nos fornece num ambiente controlado e seguro, protegido contra acesso, uso ou
            divulgação não autorizados. Mantemos salvaguardas administrativas, técnicas e físicas razoáveis para
            proteger contra acesso não autorizado, uso, modificação e divulgação de dados pessoais no seu controlo e
            custódia. No entanto, nenhuma transmissão de dados pela Internet ou rede sem fio pode ser garantida.
          </p>

          <h3 className="font-semibold text-lg mt-6">Divulgação legal</h3>
          <p>
            Apenas divulgaremos as informações que recolhermos se exigido ou permitido por lei, tal como para cumprir
            uma intimação ou processo legal, e quando acreditar de boa-fé que a divulgação é necessária para proteger os
            nossos direitos, proteger a sua segurança ou a segurança de outras pessoas, investigar fraudes ou responder
            a uma solicitação governamental.
          </p>

          <h3 className="font-semibold text-lg mt-6">
            Informações de contacto e formas de exercer direitos sobre a informação
          </h3>
          <p>
            Os clientes são livre de exercer os seus direitos de acesso, portabilidade, retificação, oposição,
            apagamento e à limitação do tratamento. Os clientes podem exercer os seus direitos ou solicitar qualquer
            esclarecimento sobre esta Política enviando um email para geral@alexandraribeiro.pt.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
