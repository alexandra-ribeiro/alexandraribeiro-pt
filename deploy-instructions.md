# Instruções para Deploy do Website

Este guia fornece instruções passo a passo para fazer o deploy do seu website em um servidor de hospedagem.

## Pré-requisitos

- Acesso ao seu servidor de hospedagem
- Domínio configurado
- Node.js instalado no servidor (versão 18 ou superior)
- Git instalado no servidor

## Opção 1: Deploy com Vercel (Recomendado)

A maneira mais fácil de fazer o deploy de um site Next.js é usando a plataforma Vercel, que é otimizada para Next.js.

1. Crie uma conta na [Vercel](https://vercel.com) se ainda não tiver uma.
2. Conecte sua conta do GitHub, GitLab ou Bitbucket.
3. Importe o repositório do seu projeto.
4. Configure as variáveis de ambiente necessárias:
   - `NEXTAUTH_SECRET`: Uma string aleatória para criptografar as sessões
   - `NEXTAUTH_URL`: A URL completa do seu site (ex: https://seudominio.com)
5. Clique em "Deploy".
6. Após o deploy, vá para as configurações de domínio e adicione seu domínio personalizado.

### Nota sobre dependências

Este projeto usa `bcryptjs` em vez de `bcrypt` para evitar problemas de compilação em ambientes serverless como a Vercel. Se você encontrar erros relacionados a módulos nativos durante o deploy, verifique se todas as dependências são compatíveis com ambientes serverless.

### Configurando o Domínio Personalizado na Vercel

Para configurar seu domínio personalizado (www.alexandraribeiro-av.pt) na Vercel:

1. Após fazer o deploy do seu projeto, vá para o dashboard da Vercel.
2. Selecione seu projeto.
3. Clique na aba "Settings" no topo da página.
4. No menu lateral, clique em "Domains".
5. No campo "Add Domain", digite seu domínio: `www.alexandraribeiro-av.pt` e clique em "Add".
6. A Vercel fornecerá instruções específicas para configurar os registros DNS do seu domínio:
   - Você precisará adicionar um registro CNAME apontando `www` para `cname.vercel-dns.com`.
   - Para o domínio raiz (alexandraribeiro-av.pt), você precisará configurar registros A apontando para os IPs da Vercel.

7. Acesse o painel de controle do seu provedor de domínio (onde você registrou alexandraribeiro-av.pt) e adicione os registros DNS conforme as instruções da Vercel:
   
   Para o subdomínio www:
   \`\`\`
   Tipo: CNAME
   Nome/Host: www
   Valor/Destino: cname.vercel-dns.com
   TTL: Automático ou 3600
   \`\`\`

   Para o domínio raiz (opcional, se quiser que alexandraribeiro-av.pt também funcione):
   \`\`\`
   Tipo: A
   Nome/Host: @
   Valor/Destino: 76.76.21.21
   TTL: Automático ou 3600
   \`\`\`

8. Volte ao painel da Vercel e aguarde a verificação do domínio. Isso pode levar até 48 horas, mas geralmente é muito mais rápido (minutos a algumas horas).

9. A Vercel configurará automaticamente um certificado SSL/TLS para seu domínio, garantindo que o site seja acessível via HTTPS.

10. Após a verificação, seu site estará disponível em https://www.alexandraribeiro-av.pt

### Alterando as Credenciais de Acesso ao Backoffice

Para alterar o usuário e senha de acesso ao backoffice, você precisa modificar o arquivo `lib/admin-db.ts`:

1. Abra o arquivo `lib/admin-db.ts` no seu editor de código.

2. Para alterar as credenciais existentes:
   - Você precisará gerar um novo hash para a senha. Você pode fazer isso usando o seguinte script Node.js:

   \`\`\`javascript
   // Salve como generate-password.js
   const bcryptjs = require('bcryptjs');
   
   async function hashPassword(password) {
     const hashedPassword = await bcryptjs.hash(password, 10);
     console.log('Senha hash:', hashedPassword);
   }
   
   // Substitua 'sua_nova_senha' pela senha desejada
   hashPassword('sua_nova_senha');
   \`\`\`

3. Execute o script no terminal:
   \`\`\`bash
   npm install bcryptjs  # Se ainda não tiver instalado
   node generate-password.js
   \`\`\`

4. Copie o hash gerado e substitua o valor da senha no arquivo `lib/admin-db.ts`:
   \`\`\`typescript
   const adminUsers = [
     {
       id: "1",
       name: "Seu Nome",  // Altere para o nome desejado
       email: "seu_email@exemplo.com",  // Altere para o email desejado
       password: "novo_hash_gerado",  // Cole o hash gerado aqui
     },
   ]
   \`\`\`

5. Salve o arquivo, faça o commit das alterações e implante novamente o site.

6. Para adicionar um novo usuário administrador, você pode adicionar um novo objeto ao array `adminUsers`:
   \`\`\`typescript
   const adminUsers = [
     {
       id: "1",
       name: "Admin",
       email: "admin@example.com",
       password: "$2a$10$8OxDlUUu9C.CsyVXcyR1mOD8YQgCJ0Ew5dUcM4xRRyq0xW8t0B7Vy",
     },
     {
       id: "2",
       name: "Novo Admin",
       email: "novo_admin@exemplo.com",
       password: "hash_da_nova_senha",  // Use o script acima para gerar
     },
   ]
   \`\`\`

7. Em um ambiente de produção, é recomendável migrar para um banco de dados real (como MongoDB, PostgreSQL, etc.) para armazenar as credenciais de usuário de forma mais segura.

### Integrando com MailerLite

Para configurar a integração do popup de newsletter com o MailerLite, siga estas etapas:

1. Crie uma conta no [MailerLite](https://www.mailerlite.com/) se ainda não tiver uma.
2. Após criar a conta, vá para a seção de "Integrações" ou "API" no painel do MailerLite.
3. Gere uma nova API Key.
4. No dashboard da Vercel, vá para "Settings" > "Environment Variables" e adicione:
   \`\`\`
   MAILERLITE_API_KEY=sua_api_key_aqui
   \`\`\`

### Configurando o envio de emails

Para configurar o envio de emails do formulário de contato, você precisa configurar um servidor SMTP:

1. Você pode usar serviços como SendGrid, Amazon SES, Gmail, ou o servidor SMTP do seu próprio provedor de hospedagem.
2. No dashboard da Vercel, adicione as seguintes variáveis de ambiente:
   \`\`\`
   SMTP_HOST=smtp.seu-provedor.com
   SMTP_PORT=587  # ou a porta correta para seu provedor
   SMTP_SECURE=false  # use 'true' se a porta for 465
   SMTP_USER=seu-email@exemplo.com
   SMTP_PASSWORD=sua-senha-ou-token
   \`\`\`

### Instalando dependências adicionais

Este projeto agora requer algumas dependências adicionais para o envio de email:

1. Adicione o nodemailer ao projeto executando:
   \`\`\`bash
   npm install nodemailer
   \`\`\`

2. Para TypeScript, também instale os tipos:
   \`\`\`bash
   npm install --save-dev @types/nodemailer
   \`\`\`

## Opção 2: Deploy Manual em um Servidor VPS ou Hospedagem Compartilhada

### Passo 1: Preparar o Projeto para Produção

1. No diretório do projeto, execute:
   \`\`\`bash
   npm run build
   \`\`\`

2. Isso criará uma versão otimizada do seu site na pasta `.next`.

### Passo 2: Transferir os Arquivos para o Servidor

#### Usando Git:

1. No seu servidor, clone o repositório:
   \`\`\`bash
   git clone https://seu-repositorio.git
   cd seu-projeto
   \`\`\`

2. Instale as dependências:
   \`\`\`bash
   npm install --production
   \`\`\`

3. Construa o projeto:
   \`\`\`bash
   npm run build
   \`\`\`

#### Usando FTP/SFTP:

1. Transfira todos os arquivos do projeto para o servidor, exceto:
   - node_modules
   - .git
   - arquivos de desenvolvimento (.env.local, etc.)

2. No servidor, navegue até a pasta do projeto e execute:
   \`\`\`bash
   npm install --production
   npm run build
   \`\`\`

### Passo 3: Configurar o Servidor

#### Usando PM2 (Recomendado para VPS):

1. Instale o PM2 globalmente:
   \`\`\`bash
   npm install -g pm2
   \`\`\`

2. Inicie o aplicativo:
   \`\`\`bash
   pm2 start npm --name "seu-site" -- start
   \`\`\`

3. Configure o PM2 para iniciar automaticamente após reinicialização:
   \`\`\`bash
   pm2 startup
   pm2 save
   \`\`\`

#### Configurando Nginx como Proxy Reverso:

1. Instale o Nginx:
   \`\`\`bash
   sudo apt update
   sudo apt install nginx
   \`\`\`

2. Crie um arquivo de configuração para o seu site:
   \`\`\`bash
   sudo nano /etc/nginx/sites-available/seu-dominio.com
   \`\`\`

3. Adicione a seguinte configuração:
   \`\`\`nginx
   server {
       listen 80;
       server_name seu-dominio.com www.seu-dominio.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   \`\`\`

4. Ative a configuração:
   \`\`\`bash
   sudo ln -s /etc/nginx/sites-available/seu-dominio.com /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   \`\`\`

### Passo 4: Configurar HTTPS com Let's Encrypt

1. Instale o Certbot:
   \`\`\`bash
   sudo apt install certbot python3-certbot-nginx
   \`\`\`

2. Obtenha e configure o certificado:
   \`\`\`bash
   sudo certbot --nginx -d seu-dominio.com -d www.seu-dominio.com
   \`\`\`

3. Siga as instruções na tela para completar a configuração.

## Opção 3: Deploy em Hospedagem Compartilhada com Node.js

Se sua hospedagem compartilhada suporta Node.js:

1. Faça upload dos arquivos do projeto via FTP/SFTP.
2. Conecte-se ao servidor via SSH ou use o terminal da hospedagem.
3. Navegue até a pasta do projeto e execute:
   \`\`\`bash
   npm install --production
   npm run build
   \`\`\`
4. Configure o arquivo de inicialização de acordo com as instruções da sua hospedagem.
5. Geralmente, você precisará configurar um arquivo `.htaccess` ou similar para redirecionar o tráfego para a porta onde o Next.js está rodando.

## Manutenção e Atualizações

Para atualizar o site após fazer alterações:

1. Se estiver usando Vercel, basta fazer push para o repositório conectado.
2. Se estiver usando deploy manual:
   \`\`\`bash
   git pull  # Se estiver usando Git
   npm install  # Se houver novas dependências
   npm run build
   pm2 restart seu-site  # Se estiver usando PM2
   \`\`\`

## Solução de Problemas

- **Erro 502 Bad Gateway**: Verifique se o aplicativo Next.js está rodando corretamente.
- **Erro 404 para rotas dinâmicas**: Verifique a configuração do Nginx para garantir que todas as rotas sejam redirecionadas para o Next.js.
- **Problemas com variáveis de ambiente**: Certifique-se de que todas as variáveis de ambiente necessárias estão configuradas no servidor.

### Solucionando problemas de acesso ao backoffice

Se você estiver enfrentando problemas para acessar o backoffice na URL `/admin/login`, verifique:

1. As variáveis de ambiente necessárias para NextAuth estão configuradas:
   \`\`\`
   NEXTAUTH_SECRET=um_valor_secreto_longo_e_aleatorio
   NEXTAUTH_URL=https://seu-dominio.com
   \`\`\`

2. Certifique-se de que o middleware não está interferindo com as rotas de administração.
   - Verifique se o arquivo `middleware.ts` está configurado para ignorar rotas `/admin/`.

3. Verifique os logs de erro no dashboard da Vercel para identificar problemas específicos.

Para mais informações, consulte a [documentação oficial do Next.js sobre deploy](https://nextjs.org/docs/deployment).
