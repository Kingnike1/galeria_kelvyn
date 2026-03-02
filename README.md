# Galeria Kelvyn

Este projeto é uma galeria de fotos profissional, desenvolvida para exibir um portfólio de fotografia artística e profissional. Ele inclui funcionalidades de upload de fotos, visualização de galeria, e um sistema de autenticação de usuários (login e registro).

## Funcionalidades

- **Galeria de Fotos**: Exibição dinâmica de fotos, carregadas tanto de uma API externa (Cloudinary) quanto de arquivos locais.
- **Upload de Fotos**: Formulário dedicado para upload de novas imagens, com pré-visualização e suporte a drag-and-drop.
- **Sistema de Autenticação**: Registro e login de usuários com proteção de rotas via JWT (JSON Web Tokens).
- **Responsividade**: Layout adaptável para diferentes tamanhos de tela (desktops, tablets e celulares).
- **Tecnologias Modernas**: Utiliza um stack robusto para desenvolvimento web.

## Tecnologias Utilizadas

### Frontend

- **HTML5**: Estrutura semântica da aplicação.
- **JavaScript (ES6+)**: Lógica de interação e consumo de API.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva.
- **Bootstrap Icons**: Biblioteca de ícones para elementos visuais.

### Backend

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express.js**: Framework web para construção de APIs RESTful.
- **MongoDB (via Mongoose)**: Banco de dados NoSQL para armazenamento de dados de fotos e usuários.
- **Cloudinary**: Serviço de hospedagem e gerenciamento de imagens na nuvem.
- **Multer**: Middleware para tratamento de upload de arquivos.
- **CORS**: Configuração para permitir requisições de diferentes origens.
- **Dotenv**: Gerenciamento de variáveis de ambiente.
- **Bcrypt**: Biblioteca para hash de senhas, garantindo segurança.
- **JSON Web Tokens (JWT)**: Para autenticação e autorização de usuários.

## Como Rodar o Projeto Localmente

Para configurar e executar este projeto em sua máquina local, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/en/download/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/get-npm) (gerenciador de pacotes do Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (servidor de banco de dados)
- Uma conta no [Cloudinary](https://cloudinary.com/) para armazenamento de imagens.

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Kingnike1/galeria_kelvyn.git
   cd galeria_kelvyn
   ```

2. **Instale as dependências do backend:**
   ```bash
   npm install
   ```

3. **Crie um arquivo `.env` na pasta `backend`** com suas credenciais do Cloudinary e a URL do MongoDB:
   ```
   MONGO_URI=mongodb://localhost:27017/galeria_kelvyn
   CLOUD_NAME=seu_cloud_name_do_cloudinary
   API_KEY=sua_api_key_do_cloudinary
   API_SECRET=seu_api_secret_do_cloudinary
   JWT_SECRET=uma_chave_secreta_forte_para_jwt
   ```
   Certifique-se de substituir os valores pelos seus próprios.

### Execução

1. **Inicie o servidor backend:**
   ```bash
   npm run dev
   ```
   O servidor estará rodando em `http://localhost:3000`.

2. **Abra o frontend:**
   Navegue até `http://localhost:3000` em seu navegador para acessar a galeria.
   Para acessar o formulário de upload, vá para `http://localhost:3000/formulario`.
   Para acessar a página de login/registro, vá para `http://localhost:3000/login`.

## Estrutura do Projeto

```
galeria_kelvyn/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── photo.controller.js
│   │   ├── middlewares/
│   │   │   └── upload.js
│   │   ├── models/
│   │   │   ├── Photo.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── fotos.routes.js
│   │   │   ├── photo.routes.js
│   │   │   └── user.routes.js
│   │   └── services/
│   │       └── cloudinary.js
│   ├── .env.example
│   └── server.js
├── frontend/
│   ├── img/
│   │   └── (imagens locais)
│   ├── js/
│   │   ├── formulario.js
│   │   ├── login.js
│   │   └── main.js
│   ├── formulario.html
│   ├── i.html (renomeado para formulario.html)
│   ├── index.html
│   └── login.html
├── comandos.txt
├── imagem.json
├── package-lock.json
├── package.json
└── README.md
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes. (Nota: O arquivo LICENSE não foi fornecido, mas a licença foi definida no package.json).
