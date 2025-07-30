"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useLanguage } from "./language-provider"

interface PrivacyPolicyPopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

export default function PrivacyPolicyPopup({ isOpen, onClose, title }: PrivacyPolicyPopupProps) {
  const { language } = useLanguage()

  const getPrivacyPolicyContent = () => {
    if (language === 'en') {
      return (
        <div className="text-sm space-y-4 mt-2">
          <p>
            <strong>Last updated:</strong> [Date]
          </p>
          
          <h3 className="font-semibold text-lg mt-6">Introduction</h3>
          <p>
            Alexandra Ribeiro Digital Store - Consultancy operates this store and website, including all information, 
            content, functionalities, tools, digital products and digital consultancy and virtual assistance services 
            related thereto, in order to provide you, the customer, with a personalized shopping experience (the 
            "Services"). This Privacy Policy describes how we collect, use and disclose your personal information when 
            you visit us, use or make a purchase or other transaction using the Services or when you otherwise 
            communicate with us. In case of conflict between our Terms of Service and this Privacy Policy, this Privacy 
            Policy shall prevail with regard to the collection, processing and disclosure of your personal information.
          </p>
          <p>
            Please read this Privacy Policy carefully. When you use and access any of the Services, you confirm that 
            you have read this Privacy Policy and understand the collection, use and disclosure of your information as 
            described in this Privacy Policy.
          </p>

          <h3 className="font-semibold text-lg mt-6">Personal Information We Collect or Process</h3>
          <p>
            By the term "personal information", we refer to information that identifies or can be reasonably 
            associated with you or another person. Personal information does not include information collected 
            anonymously or that has been anonymized so that it cannot be identified or reasonably associated with 
            you. We may collect or process the following categories of personal information, including inferences 
            drawn from such personal information, depending on how you interact with the Services, where you live 
            and to the extent permitted or required by applicable law:
          </p>
          <p>
            <strong>Contact details</strong> including your name, address, billing address, phone number and email address.
          </p>
          <p>
            <strong>Financial information</strong> including credit card, debit card and financial account numbers, payment card 
            information, financial account information, transaction details, payment method, payment 
            confirmation and other payment details.
          </p>
          <p>
            <strong>Account information</strong> including your username, password, security questions, preferences and 
            settings.
          </p>
          <p>
            <strong>Transaction information</strong> including the digital products and services you view, add to cart, wishlist or 
            purchase, and your previous transactions.
          </p>
          <p>
            <strong>Communications with us</strong> including information you include in communications with us, for 
            example, when you request customer assistance or consultancy services.
          </p>
          <p>
            <strong>Device information</strong> including information about your device, browser or network connection, IP 
            address and other unique identifiers.
          </p>
          <p>
            <strong>Usage information</strong> including information about your interaction with the Services, including how 
            and when you interact or navigate the Services.
          </p>

          <h3 className="font-semibold text-lg mt-6">Sources of Personal Information</h3>
          <p>We may collect personal information from the following sources:</p>
          <p>
            <strong>Directly from you</strong> including when you create an account, visit or use the Services, communicate with 
            us or otherwise provide us with personal information;
          </p>
          <p>
            <strong>Automatically through the Services</strong> including from your device when you use our products or 
            services or visit our website, as well as through the use of cookies and similar technologies;
          </p>
          <p>
            <strong>Through our service providers</strong> including when we engage them to enable certain technology and 
            when they collect or process your personal information on our behalf;
          </p>
          <p>
            <strong>Through our partners or third parties.</strong>
          </p>

          <h3 className="font-semibold text-lg mt-6">How We Use Your Personal Information</h3>
          <p>
            Depending on how you interact with us or the Services you use, we may use personal information for the 
            following purposes:
          </p>
          
          <h4 className="font-medium text-base mt-4">Provide, Personalize and Improve the Services</h4>
          <p>
            We use your personal information to provide you with the Services, including to perform our contract 
            with you, process payments, process orders for digital products, remember preferences and items of 
            interest, send notifications related to your account, process purchases or other transactions, create, 
            maintain and manage your account, facilitate access to purchased digital products, enable the posting of 
            reviews and create a personalized experience such as by recommending consultancy services related to 
            your needs. This may include using your personal information to better tailor and improve the Services.
          </p>

          <h4 className="font-medium text-base mt-4">Marketing and Advertising</h4>
          <p>
            We use your personal information for marketing and promotional purposes, such as to send marketing 
            communications, advertising and promotions by email, text message or mail and to present you with 
            online advertisements for products or services on the Services or other websites, including based on 
            services you have previously purchased or added to cart and other activities on the Services.
          </p>

          <h4 className="font-medium text-base mt-4">Security and Fraud Prevention</h4>
          <p>
            We use your personal information to authenticate your account, provide a secure payment and shopping 
            experience, detect, investigate or take action regarding possible fraudulent, illegal, unsafe or malicious 
            activities, protect public safety and protect our services. If you choose to use the Services and create an 
            account, you are responsible for keeping your account credentials secure. We highly recommend not 
            sharing your username, password or other access details with others.
          </p>

          <h4 className="font-medium text-base mt-4">Communications with You</h4>
          <p>
            We use your personal information to provide you with customer assistance, respond to your 
            communications, provide effective consultancy and virtual assistance services and maintain a business 
            relationship with you.
          </p>

          <h4 className="font-medium text-base mt-4">Legal Reasons</h4>
          <p>
            We use your personal information to comply with applicable law or respond to valid legal processes, 
            including requests from law enforcement services or government agencies, investigate or participate in 
            civil citations, potential or actual litigation or other contentious legal processes and enforce or investigate 
            possible violations of our terms or policies.
          </p>

          <h3 className="font-semibold text-lg mt-6">How We Disclose Personal Information</h3>
          <p>
            Under certain circumstances, we may disclose your personal information to third parties for legitimate 
            purposes, subject to this Privacy Policy. These circumstances may include:
          </p>
          <p>
            With suppliers and other third parties who provide services on our behalf (for example, IT 
            management, payment processing, data analytics, customer support, cloud storage, web hosting).
          </p>
          <p>
            With business and marketing partners to provide you with marketing and advertising services. 
            Depending on your place of residence, you may have the right to instruct us not to share your 
            information for the purpose of presenting targeted advertising and marketing.
          </p>
          <p>
            When you instruct, request or otherwise consent to our disclosure of certain information to third 
            parties, such as when you use social media widgets or login integrations.
          </p>
          <p>
            With our affiliates or otherwise within our group of companies.
          </p>
          <p>
            In connection with a business transaction, such as a merger or insolvency, to comply with any 
            applicable legal obligations (including responding to subpoenas, search warrants and similar 
            requests), to enforce any applicable terms of service or policies and to protect or defend the Services, 
            our rights and the rights of our users or third parties.
          </p>

          <h3 className="font-semibold text-lg mt-6">Third-Party Websites and Links</h3>
          <p>
            The Services may feature links to websites or other online platforms operated by third parties. If you 
            follow links to websites that do not belong to affiliates or are not controlled by us, you should review 
            their respective privacy and security policies, as well as other terms and conditions. We do not guarantee 
            and are not responsible for the privacy or security of such websites, including the accuracy, completeness 
            or reliability of information found on such websites. Information you provide in public or semi-public 
            places, including information you share on third-party social media platforms, may also be viewed by 
            other users of the Services and/or users of such third-party platforms, without limitation as to their use by 
            us or third parties. Our inclusion of such links does not, by itself, imply any endorsement of the content of 
            such platforms or their respective owners or operators, except to the extent disclosed in the Services.
          </p>

          <h3 className="font-semibold text-lg mt-6">Children's Data</h3>
          <p>
            The Services are not intended for use by children, so we do not intentionally collect any personal 
            information from children who are minors in your jurisdiction. If you are a parent or guardian of a child 
            who has provided us with their personal information, you may contact us using the contact details 
            provided below to request that it be deleted. As of the Effective Date of this Privacy Policy, we have no 
            actual knowledge that we "share" or "sell" (as these terms are defined in applicable law) personal 
            information of individuals under the age of 16.
          </p>

          <h3 className="font-semibold text-lg mt-6">Security and Retention of Your Information</h3>
          <p>
            Be aware that no security measure is perfect or impenetrable, so we cannot guarantee "perfect security". 
            Additionally, any information you send us may not be secure during transit. We recommend that you do 
            not use insecure channels to communicate confidential or sensitive information to us.
          </p>
          <p>
            The period during which we retain your personal information depends on different factors, such as 
            whether we need the information to maintain your account, to provide you with Services, comply with 
            legal obligations, resolve disputes or enforce other applicable contracts and policies.
          </p>

          <h3 className="font-semibold text-lg mt-6">Your Rights and Choices</h3>
          <p>
            Depending on your place of residence, you may have some or all of the rights listed below in relation to 
            your personal information. However, these rights are not absolute, may only apply in certain 
            circumstances and, in some cases, we may refuse your request to the extent permitted by law.
          </p>

          <h4 className="font-medium text-base mt-4">General Rights</h4>
          <p>
            <strong>Right of Access/Knowledge:</strong> You may have the right to request access to your personal information 
            that we have in our possession.
          </p>
          <p>
            <strong>Right of Deletion:</strong> You may have the right to request deletion of your personal information that we 
            have in our possession.
          </p>
          <p>
            <strong>Right of Rectification:</strong> You may have the right to request rectification of your personal information 
            that we have in our possession.
          </p>
          <p>
            <strong>Right of Portability:</strong> You may have the right to receive a copy of your personal information that we 
            have in our possession and to request the transfer of such information to third parties, under certain 
            circumstances and with certain exceptions.
          </p>

          <h4 className="font-medium text-base mt-4">Managing Communication Preferences</h4>
          <p>
            We may send you promotional emails, and you may actively opt out of receiving them at any time 
            through the unsubscribe option provided in the emails we send you. If you actively opt out, we may still 
            send you non-promotional emails, such as emails about your account or orders placed by you.
          </p>

          <h4 className="font-medium text-base mt-4">Additional Rights for UK and European Economic Area Residents</h4>
          <p>
            If you reside in the United Kingdom or the European Economic Area, and exceptions and limitations 
            provided by local legislation apply to you, you may exercise the following rights, in addition to the rights 
            listed above:
          </p>
          <p>
            <strong>Objection to Processing and Restriction of Processing:</strong> You may have the right to ask us to stop or 
            restrict our processing of personal information for certain purposes.
          </p>
          <p>
            <strong>Withdrawal of Consent:</strong> When we rely on consent to process your personal information, you have 
            the right to withdraw that consent. Withdrawal of your consent will not affect the lawfulness of any 
            processing based on consent given before withdrawal.
          </p>
          <p>
            You may exercise any of these rights by contacting us using the contact details provided below.
          </p>
          <p>
            We do not discriminate based on your exercise of any of these rights. We may need to verify your identity 
            before processing your requests, to the extent permitted or required by applicable law. In accordance 
            with applicable laws, you may designate an authorized agent to make requests on your behalf for the 
            purpose of exercising your rights. Before accepting such a request from an agent, we will require the 
            agent to provide proof that they are authorized by you to act on your behalf, so we may need you to 
            verify your identity directly with us. We will respond to your request in a timely manner as required under 
            applicable law.
          </p>

          <h3 className="font-semibold text-lg mt-6">Complaints</h3>
          <p>
            If you wish to complain about how we process your personal information, you may contact us using the 
            contact details provided below. Depending on your place of residence, you may have the right to 
            challenge the decision by contacting us using the contact details provided below or by submitting your 
            complaint to the local data protection authority. For the EEA, you can find a list of data protection 
            supervisory authorities here.
          </p>

          <h3 className="font-semibold text-lg mt-6">International Transfers</h3>
          <p>
            Please note that we may transfer, store and process your personal information outside your country of 
            residence.
          </p>
          <p>
            If we transfer your personal information outside the European Economic Area or the United Kingdom, we 
            will use recognized transfer mechanisms, such as the European Commission's Standard Contractual 
            Clauses or any equivalent contracts issued by the relevant competent authority of the United Kingdom, as 
            relevant, unless the data transfer occurs to a country that has been determined to provide an adequate 
            level of protection.
          </p>

          <h3 className="font-semibold text-lg mt-6">Changes to This Privacy Policy</h3>
          <p>
            We may update this Privacy Policy periodically, including to reflect changes to our practices or for other 
            operational, legal or regulatory reasons. We will post the revised Privacy Policy on this website, update the 
            "Last updated" date and provide notice as required by applicable law.
          </p>

          <h3 className="font-semibold text-lg mt-6">Contact</h3>
          <p>
            If you have any questions about our privacy practices or this Privacy Policy, or if you wish to exercise any 
            of the rights available to you, you may email us at geral@alexandraribeiro.pt.
          </p>
          <p>
            For purposes of applicable data protection laws, Alexandra Ribeiro is the data controller of your personal 
            information.
          </p>
          <p>
            This Privacy Policy has been adapted for Alexandra Ribeiro Digital Store - Consultancy, specialized in digital 
            products and digital consultancy and virtual assistance services.
          </p>
        </div>
      )
    } else {
      return (
        <div className="text-sm space-y-4 mt-2">
          <p>
            <strong>Última atualização:</strong> [Data]
          </p>
          
          <h3 className="font-semibold text-lg mt-6">Introdução</h3>
          <p>
            A Loja Digital - Alexandra Ribeiro, consultoria opera esta loja e website, incluindo todas as informações, 
            conteúdo, funcionalidades, ferramentas, produtos digitais e serviços de consultoria digital e assistência 
            virtual relacionados, a fim de lhe proporcionar, a si, o cliente, uma experiência de compra personalizada 
            (os "Serviços"). A presente Política de Privacidade descreve como recolhemos, utilizamos e divulgamos as 
            suas informações pessoais quando nos visita, utiliza ou efetua uma compra ou outra transação utilizando 
            os Serviços ou quando comunica connosco de outra forma. Em caso de conflito entre os nossos Termos 
            de Serviço e a presente Política de Privacidade, a presente Política de Privacidade prevalecerá no que se 
            refere à recolha, ao tratamento e à divulgação das suas informações pessoais.
          </p>
          <p>
            Leia atentamente a presente Política de Privacidade. Quando utiliza e acede a qualquer um dos Serviços, 
            confirma que leu a presente Política de Privacidade e compreende a recolha, utilização e divulgação das 
            suas informações, conforme descrito na presente Política de Privacidade.
          </p>

          <h3 className="font-semibold text-lg mt-6">Informações Pessoais que Recolhemos ou Tratamos</h3>
          <p>
            Com o termo "informações pessoais", referimo-nos a informações que identificam ou podem ser 
            razoavelmente associadas a si ou a outra pessoa. As informações pessoais não incluem informações 
            recolhidas de forma anónima ou que tenham sido anonimizadas, para que não sejam passíveis de 
            identificar ou estar razoavelmente associadas a si. Podemos recolher ou tratar as seguintes categorias de 
            informações pessoais, incluindo inferências extraídas dessas informações pessoais, dependendo da forma 
            como interage com os Serviços, o local onde vive e na medida permitida ou exigida pela lei aplicável:
          </p>
          <p>
            <strong>Detalhes de contacto</strong> incluindo o seu nome, morada, endereço de faturação, número de telefone e 
            endereço de e-mail.
          </p>
          <p>
            <strong>Informações financeiras</strong> incluindo números de cartão de crédito, cartão de débito e conta 
            financeira, informações do cartão de pagamento, informações da conta financeira, detalhes da 
            transação, método de pagamento, confirmação de pagamento e outros detalhes do pagamento.
          </p>
          <p>
            <strong>Informações da conta</strong> incluindo o seu nome de utilizador, palavra-passe, perguntas de segurança, 
            preferências e definições.
          </p>
          <p>
            <strong>Informações da transação</strong> incluindo os produtos digitais e serviços que visualiza, adiciona ao 
            carrinho, à lista de desejos ou compra, e as suas transações anteriores.
          </p>
          <p>
            <strong>Comunicações connosco</strong> incluindo as informações que inclui nas comunicações connosco, por 
            exemplo, quando solicita assistência ao cliente ou serviços de consultoria.
          </p>
          <p>
            <strong>Informações do dispositivo</strong> incluindo informações sobre o seu dispositivo, navegador ou ligação de 
            rede, endereço IP e outros identificadores únicos.
          </p>
          <p>
            <strong>Informações sobre a utilização</strong> incluindo informações sobre a sua interação com os Serviços, 
            incluindo como e quando interage ou navega nos Serviços.
          </p>

          <h3 className="font-semibold text-lg mt-6">Fontes de Informações Pessoais</h3>
          <p>Podemos recolher informações pessoais a partir das seguintes fontes:</p>
          <p>
            <strong>Diretamente de si</strong> incluindo quando cria uma conta, visita ou utiliza os Serviços, comunica connosco 
            ou, de outra forma, nos fornece informações pessoais;
          </p>
          <p>
            <strong>Automaticamente através dos Serviços</strong> incluindo a partir do seu dispositivo quando utiliza os 
            nossos produtos ou serviços ou visita o nosso website, assim como através da utilização de cookies e 
            tecnologias semelhantes;
          </p>
          <p>
            <strong>Através dos nossos prestadores de serviços</strong> incluindo quando os contratamos para ativar 
            determinada tecnologia e quando recolhem ou tratam as suas informações pessoais em nosso nome;
          </p>
          <p>
            <strong>Através dos nossos parceiros ou de terceiros.</strong>
          </p>

          <h3 className="font-semibold text-lg mt-6">Como Utilizamos as suas Informações Pessoais</h3>
          <p>
            Dependendo da forma como interage connosco ou dos Serviços que utiliza, poderemos utilizar 
            informações pessoais para as seguintes finalidades:
          </p>
          
          <h4 className="font-medium text-base mt-4">Prestar, Personalizar e Melhorar os Serviços</h4>
          <p>
            Utilizamos as suas informações pessoais para lhe prestar os Serviços, incluindo para executar o nosso 
            contrato consigo, processar pagamentos, processar encomendas de produtos digitais, recordar 
            preferências e itens de interesse, enviar notificações relacionadas com a sua conta, processar compras ou 
            outras transações, criar, manter e gerir a sua conta, facilitar o acesso a produtos digitais adquiridos, 
            permitir a publicação de avaliações e criar uma experiência personalizada como, por exemplo, ao 
            recomendar serviços de consultoria relacionados com as suas necessidades. Isto pode incluir a utilização 
            das suas informações pessoais no sentido de melhor adaptar e aperfeiçoar os Serviços.
          </p>

          <h4 className="font-medium text-base mt-4">Marketing e Publicidade</h4>
          <p>
            Utilizamos as suas informações pessoais para efeitos de marketing e promoções, tais como para enviar 
            comunicações de marketing, publicidade e promoções por e-mail, mensagem de texto ou correio e para 
            lhe apresentar anúncios online de produtos ou serviços nos Serviços ou noutros websites, incluindo com 
            base nos serviços que comprou anteriormente ou adicionou ao carrinho e noutras atividades nos 
            Serviços.
          </p>

          <h4 className="font-medium text-base mt-4">Segurança e Prevenção de Fraude</h4>
          <p>
            Utilizamos as suas informações pessoais para autenticar a sua conta, proporcionar uma experiência de 
            pagamento e compra segura, detetar, investigar ou tomar medidas relativamente a possíveis atividades 
            fraudulentas, ilegais, inseguras ou maliciosas, proteger a segurança pública e proteger os nossos serviços. 
            Se optar por utilizar os Serviços e criar uma conta, é responsável por manter as credenciais da sua conta 
            em segurança. É altamente recomendável não partilhar o nome de utilizador, a palavra-passe ou outros 
            detalhes de acesso com outras pessoas.
          </p>

          <h4 className="font-medium text-base mt-4">Comunicações Consigo</h4>
          <p>
            Utilizamos as suas informações pessoais para lhe prestar assistência ao cliente, respondermos às suas 
            comunicações, prestar serviços eficazes de consultoria e assistência virtual e manter uma relação 
            comercial consigo.
          </p>

          <h4 className="font-medium text-base mt-4">Motivos Legais</h4>
          <p>
            Utilizamos as suas informações pessoais para cumprir a lei aplicável ou dar resposta a processos legais 
            válidos, incluindo pedidos provenientes de serviços de aplicação da lei ou de agências governamentais, 
            investigar ou participar em citações civis, litígios potenciais ou reais ou outros processos legais 
            contenciosos e aplicar ou investigar possíveis violações dos nossos termos ou políticas.
          </p>

          <h3 className="font-semibold text-lg mt-6">Como Divulgamos as Informações Pessoais</h3>
          <p>
            Em determinadas circunstâncias, podemos divulgar as suas informações pessoais a terceiros para 
            finalidades legítimas, sujeitas à presente Política de Privacidade. Estas circunstâncias podem incluir:
          </p>
          <p>
            Com fornecedores e outros terceiros que prestam serviços em nosso nome (por exemplo, gestão 
            de TI, processamento de pagamentos, análise de dados, assistência ao cliente, armazenamento na 
            nuvem, hospedagem web).
          </p>
          <p>
            Com parceiros comerciais e de marketing para lhe prestar serviços de marketing e publicidade. 
            Dependendo do seu local de residência, pode ter o direito de nos instruir para não partilhar as suas 
            informações com a finalidade de apresentar anúncios e marketing direcionados.
          </p>
          <p>
            Quando nos instrui, solicita ou, de outra forma, consente com a nossa divulgação de 
            determinadas informações a terceiros, tais como quando utiliza widgets de redes sociais ou 
            integrações de início de sessão.
          </p>
          <p>
            Com os nossos afiliados ou, de outro modo, no nosso grupo de empresas.
          </p>
          <p>
            Em relação a uma transação comercial, como uma fusão ou insolvência, para cumprir quaisquer 
            obrigações legais aplicáveis (incluindo responder a intimações, mandados de busca e pedidos 
            semelhantes), para fazer cumprir quaisquer termos de serviço ou políticas aplicáveis e para proteger 
            ou defender os Serviços, os nossos direitos e os direitos dos nossos utilizadores ou de terceiros.
          </p>

          <h3 className="font-semibold text-lg mt-6">Websites e Ligações de Terceiros</h3>
          <p>
            Os Serviços podem apresentar ligações para websites ou outras plataformas online operadas por 
            terceiros. Se seguir as ligações para websites que não pertençam a afiliados ou não sejam controlados 
            por nós, deve rever as respetivas políticas de privacidade e segurança, assim como outros termos e 
            condições. Não garantimos e não somos responsáveis pela privacidade ou segurança desses websites, 
            incluindo pela precisão, a integridade ou a fiabilidade das informações encontradas nesses websites. As 
            informações fornecidas por si em locais públicos ou semipúblicos, incluindo informações que partilha em 
            plataformas de redes sociais de terceiros, também podem ser visualizadas por outros utilizadores dos 
            Serviços e/ou utilizadores dessas plataformas de terceiros, sem limitação quanto à respetiva utilização 
            por nós ou por terceiros. A nossa inclusão de tais ligações não implica, por si só, qualquer validação do 
            conteúdo dessas plataformas ou dos respetivos proprietários ou operadores, exceto na medida em que 
            sejam divulgadas nos Serviços.
          </p>

          <h3 className="font-semibold text-lg mt-6">Dados de Crianças</h3>
          <p>
            Os Serviços não se destinam a ser utilizados por crianças, pelo que não recolhemos intencionalmente 
            quaisquer informações pessoais de crianças menores de idade na sua jurisdição. Se for pai, mãe ou 
            responsável por uma criança que nos forneceu as respetivas informações pessoais, pode contactar-nos 
            através dos detalhes de contacto indicados abaixo para pedir que sejam eliminadas. À Data Efetiva da 
            presente Política de Privacidade, não temos conhecimento efetivo de que "partilhamos" ou "vendemos" 
            (tal como estes termos são definidos na lei aplicável) informações pessoais de indivíduos com idade 
            inferior a 16 anos.
          </p>

          <h3 className="font-semibold text-lg mt-6">Segurança e Retenção das suas Informações</h3>
          <p>
            Esteja ciente de que nenhuma medida de segurança é perfeita ou impenetrável, pelo que não podemos 
            garantir uma "segurança perfeita". Além disso, quaisquer informações que nos envie podem não estar 
            seguras durante o tráfego. Recomendamos que não recorra a canais inseguros para nos comunicar 
            informações confidenciais ou sensíveis.
          </p>
          <p>
            O período durante o qual retemos as suas informações pessoais depende de diferentes fatores, tais como 
            se necessitamos das informações para manter a sua conta, para lhe prestar Serviços, cumprir obrigações 
            legais, resolver litígios ou fazer cumprir outros contratos e políticas aplicáveis.
          </p>

          <h3 className="font-semibold text-lg mt-6">Os seus Direitos e Escolhas</h3>
          <p>
            Dependendo do seu local de residência, pode ter parte ou a totalidade dos direitos indicados abaixo em 
            relação às suas informações pessoais. No entanto, estes direitos não são absolutos, podem ser aplicáveis 
            apenas em determinadas circunstâncias e, em alguns casos, podemos recusar o seu pedido, na medida 
            permitida por lei.
          </p>

          <h4 className="font-medium text-base mt-4">Direitos Gerais</h4>
          <p>
            <strong>Direito de Acesso/Conhecimento:</strong> Pode ter o direito de solicitar o acesso às suas informações 
            pessoais que tivermos em nossa posse.
          </p>
          <p>
            <strong>Direito de Eliminação:</strong> Pode ter o direito de solicitar a eliminação das suas informações pessoais que 
            tivermos em nossa posse.
          </p>
          <p>
            <strong>Direito de Retificação:</strong> Pode ter o direito de solicitar a retificação das suas informações pessoais que 
            tivermos em nossa posse.
          </p>
          <p>
            <strong>Direito de Portabilidade:</strong> Pode ter o direito de receber uma cópia das suas informações pessoais 
            que tivermos em nossa posse e de solicitar a transferência dessas informações para terceiros, em 
            determinadas circunstâncias e com determinadas exceções.
          </p>

          <h4 className="font-medium text-base mt-4">Gerir as Preferências de Comunicação</h4>
          <p>
            Podemos enviar-lhe e-mails promocionais, e pode optar ativamente por não participar na receção dos 
            mesmos a qualquer momento, através da opção de anular subscrição apresentada nos e-mails que lhe 
            enviamos. Se optar ativamente por não participar, podemos ainda enviar-lhe e-mails não promocionais, 
            tais como e-mails sobre a sua conta ou encomendas efetuadas por si.
          </p>

          <h4 className="font-medium text-base mt-4">Direitos Adicionais para Residentes do Reino Unido e Espaço Económico Europeu</h4>
          <p>
            Se residir no Reino Unido ou no Espaço Económico Europeu, e lhe forem aplicáveis exceções e limitações 
            previstas pela legislação local, pode exercer os seguintes direitos, além dos direitos indicados acima:
          </p>
          <p>
            <strong>Oposição ao Tratamento e Restrição do Tratamento:</strong> Pode ter o direito de nos pedir para 
            interromper ou restringir o nosso tratamento de informações pessoais para determinadas finalidades.
          </p>
          <p>
            <strong>Revogação do Consentimento:</strong> Quando dependemos do consentimento para tratar as suas 
            informações pessoais, tem o direito de revogar esse consentimento. A revogação do seu 
            consentimento não afetará a legalidade de qualquer tratamento baseado no consentimento dado 
            antes da revogação.
          </p>
          <p>
            Pode exercer qualquer um destes direitos contactando-nos através dos detalhes de contacto fornecidos 
            abaixo.
          </p>
          <p>
            Não fazemos discriminação com base no seu exercício de um destes direitos. Podemos ter de verificar a 
            sua identidade antes de processar os seus pedidos, na medida permitida ou exigida pela lei aplicável. De 
            acordo com as leis aplicáveis, pode designar um agente autorizado para efetuar os pedidos em seu nome 
            com a finalidade de exercer os seus direitos. Antes de aceitar esse pedido de um agente, exigiremos que 
            o agente forneça provas de que está autorizado por si a agir em seu nome, pelo que podemos necessitar 
            que verifique a sua identidade diretamente connosco. Responderemos ao seu pedido em tempo útil, 
            conforme exigido nos termos da lei aplicável.
          </p>

          <h3 className="font-semibold text-lg mt-6">Reclamações</h3>
          <p>
            Se pretender reclamar sobre a forma como tratamos as suas informações pessoais, pode contactar-nos 
            através dos detalhes de contacto fornecidos abaixo. Dependendo do seu local de residência, pode ter o 
            direito de contestar a decisão contactando-nos através dos detalhes de contacto indicados abaixo ou 
            apresentar a sua reclamação junto da autoridade de proteção de dados local. Para o EEE, pode encontrar 
            uma lista das autoridades de controlo da proteção de dados aqui.
          </p>

          <h3 className="font-semibold text-lg mt-6">Transferências Internacionais</h3>
          <p>
            Tenha em atenção que podemos transferir, armazenar e tratar as suas informações pessoais fora do seu 
            país de residência.
          </p>
          <p>
            Se transferirmos as suas informações pessoais para fora do Espaço Económico Europeu ou do Reino 
            Unido, recorreremos a mecanismos de transferência reconhecidos, tais como as Cláusulas Contratuais 
            Padrão da Comissão Europeia ou quaisquer contratos equivalentes emitidos pela autoridade competente 
            relevante do Reino Unido, conforme relevante, exceto se a transferência de dados ocorrer para um país 
            que tenha sido determinado como fornecendo um nível de proteção adequado.
          </p>

          <h3 className="font-semibold text-lg mt-6">Alterações à Presente Política de Privacidade</h3>
          <p>
            Podemos atualizar a presente Política de Privacidade periodicamente, incluindo para refletir alterações às 
            nossas práticas ou por outros motivos operacionais, legais ou regulamentares. Publicaremos a Política de 
            Privacidade revista neste website, atualizaremos a data da "Última atualização" e apresentaremos um 
            aviso, conforme exigido pela lei aplicável.
          </p>

          <h3 className="font-semibold text-lg mt-6">Contacto</h3>
          <p>
            Caso tenha alguma dúvida sobre as nossas práticas de privacidade ou sobre a presente Política de 
            Privacidade, ou se desejar exercer qualquer um dos direitos que lhe assistem, pode enviar-nos um e-mail 
            para geral@alexandraribeiro.pt.
          </p>
          <p>
            Para efeitos das leis de proteção de dados aplicáveis, Alexandra Ribeiro é a controladora de dados das 
            suas informações pessoais.
          </p>
          <p>
            Esta Política de Privacidade foi adaptada para a Loja Digital - Alexandra Ribeiro, consultoria, especializada 
            em produtos digitais e serviços de consultoria digital e assistência virtual.
          </p>
          </div>
        )
    }
  }
}
