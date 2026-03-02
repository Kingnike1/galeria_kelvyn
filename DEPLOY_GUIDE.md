# Guia de Deploy - Galeria Kelvyn

Este guia fornece instruções passo a passo para implantar a Galeria Kelvyn no **Render** (backend) e **Vercel** (frontend).

---

## 📋 Pré-requisitos

- Conta no [Render.com](https://render.com)
- Conta no [Vercel](https://vercel.com)
- URL do MongoDB Atlas (você já tem)
- Credenciais do Cloudinary (Cloud Name, API Key, API Secret)

---

## 🚀 Parte 1: Deploy do Backend no Render

### Passo 1: Acessar o Render Dashboard

1. Faça login em [render.com](https://render.com)
2. Clique em **"New +"** no canto superior direito
3. Selecione **"Web Service"**

### Passo 2: Conectar o Repositório GitHub

1. Selecione **"Deploy an existing project from a Git repository"**
2. Clique em **"Connect account"** para conectar sua conta GitHub
3. Procure pelo repositório **`galeria_kelvyn`**
4. Clique em **"Connect"**

### Passo 3: Configurar o Serviço

Preencha os campos conforme abaixo:

| Campo | Valor |
|-------|-------|
| **Name** | `galeria-kelvyn-api` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | Free (ou pago, conforme preferir) |

### Passo 4: Adicionar Variáveis de Ambiente

Clique em **"Environment"** e adicione as seguintes variáveis:

```
MONGO_URI=sua_url_do_mongodb_atlas_aqui
CLOUD_NAME=seu_cloud_name_do_cloudinary
API_KEY=sua_api_key_do_cloudinary
API_SECRET=seu_api_secret_do_cloudinary
JWT_SECRET=uma_chave_secreta_super_segura_aqui
NODE_ENV=production
FRONTEND_URL=https://seu-dominio-vercel.vercel.app
```

**Nota**: Substitua os valores pelos seus próprios. A `FRONTEND_URL` será a URL do seu deploy no Vercel (você descobrirá isso na Parte 2).

### Passo 5: Deploy

1. Clique em **"Create Web Service"**
2. Aguarde o deploy ser concluído (pode levar 2-5 minutos)
3. Copie a URL fornecida pelo Render (ex: `https://galeria-kelvyn-api.onrender.com`)

**Importante**: Guarde essa URL, você precisará dela para configurar o frontend!

---

## 🎨 Parte 2: Deploy do Frontend no Vercel

### Passo 1: Acessar o Vercel Dashboard

1. Faça login em [vercel.com](https://vercel.com)
2. Clique em **"Add New..."** e selecione **"Project"**

### Passo 2: Importar o Repositório GitHub

1. Clique em **"Import Git Repository"**
2. Cole a URL do seu repositório: `https://github.com/Kingnike1/galeria_kelvyn.git`
3. Clique em **"Continue"**

### Passo 3: Configurar o Projeto

1. **Project Name**: `galeria-kelvyn`
2. **Framework Preset**: Selecione **"Other"** (já que é um projeto fullstack)
3. **Root Directory**: Deixe em branco (padrão)

### Passo 4: Adicionar Variáveis de Ambiente

Clique em **"Environment Variables"** e adicione:

```
VITE_API_URL=https://galeria-kelvyn-api.onrender.com
```

**Nota**: Substitua pela URL do seu backend no Render (obtida na Parte 1).

### Passo 5: Deploy

1. Clique em **"Deploy"**
2. Aguarde o deploy ser concluído (pode levar 1-3 minutos)
3. Você receberá uma URL como: `https://galeria-kelvyn.vercel.app`

---

## ✅ Verificação Final

Após ambos os deploys, teste a aplicação:

1. Acesse `https://galeria-kelvyn.vercel.app` (seu frontend)
2. Teste o login/registro
3. Teste o upload de fotos
4. Verifique se a galeria carrega corretamente

---

## 🔧 Solução de Problemas

### Erro de CORS

Se receber erro de CORS, certifique-se de que:
- A variável `FRONTEND_URL` no Render está correta
- A variável `VITE_API_URL` no Vercel está correta

### Banco de Dados Não Conecta

- Verifique se a URL do MongoDB está correta
- Certifique-se de que seu IP está na whitelist do MongoDB Atlas

### Fotos Não Carregam

- Verifique as credenciais do Cloudinary
- Certifique-se de que o `CLOUD_NAME`, `API_KEY` e `API_SECRET` estão corretos

---

## 📝 Notas Importantes

- O Render coloca serviços gratuitos em hibernação após 15 minutos de inatividade. Para evitar isso, considere fazer upgrade para um plano pago.
- O Vercel oferece 100GB de banda por mês no plano gratuito.
- Sempre mantenha suas credenciais seguras e nunca as compartilhe.

---

## 🎉 Pronto!

Seu site está ao vivo! Compartilhe a URL do Vercel com seus clientes e amigos.

Para atualizações futuras, basta fazer `git push` no repositório e os deploys serão atualizados automaticamente.
