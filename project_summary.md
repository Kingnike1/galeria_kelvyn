# Análise do Projeto: Galeria Kelvyn

## Introdução

O projeto **Galeria Kelvyn** é uma aplicação web full-stack projetada para funcionar como um portfólio de fotografia profissional. A plataforma permite a exibição de imagens de forma dinâmica, o upload de novas fotos através de um formulário seguro e um sistema de autenticação para gerenciamento de usuários. A análise a seguir detalha a arquitetura, as tecnologias empregadas e o funcionamento geral do sistema.

## Funcionalidades Principais

O sistema é composto por três funcionalidades centrais que definem sua operação:

| Funcionalidade | Descrição |
| :--- | :--- |
| **Galeria de Fotos** | Exibe imagens de forma dinâmica, carregando-as a partir de um serviço de nuvem (Cloudinary) e de um diretório local no servidor. A galeria é atualizada periodicamente para buscar novas imagens. |
| **Upload de Fotos** | Oferece um formulário dedicado que permite aos usuários autenticados enviar novas imagens. O formulário suporta pré-visualização e funcionalidade de arrastar e soltar (drag-and-drop). |
| **Autenticação de Usuários** | Inclui um sistema completo de registro e login, utilizando JSON Web Tokens (JWT) para proteger rotas e gerenciar o acesso dos usuários. |

## Arquitetura e Tecnologias

O projeto segue uma arquitetura cliente-servidor clássica, com uma separação clara entre o frontend e o backend.

### Frontend

O frontend é construído com tecnologias web padrão, focando em simplicidade e responsividade.

- **HTML5:** Utilizado para a estruturação semântica das páginas.
- **Tailwind CSS:** Framework de estilização utilitário que garante um design moderno e responsivo.
- **JavaScript (Vanilla):** Responsável por toda a lógica de interação do cliente, incluindo a comunicação com a API do backend, a manipulação do DOM para exibir as fotos e o gerenciamento do estado de autenticação.

O código do frontend está organizado em arquivos HTML (`index.html`, `login.html`, `i.html`) e JavaScript (`main.js`, `login.js`, `formulario.js`), que lidam com a lógica da galeria, autenticação e upload, respectivamente.

### Backend

O backend é desenvolvido em Node.js e serve como o cérebro da aplicação, gerenciando a lógica de negócios, o acesso a dados e a segurança.

- **Node.js com Express.js:** Cria um servidor web robusto para construir a API RESTful.
- **MongoDB com Mongoose:** Utilizado como banco de dados NoSQL para persistir informações sobre as fotos (títulos, URLs) e os usuários (email, senhas criptografadas).
- **Cloudinary:** Serviço de nuvem integrado para o armazenamento, otimização e entrega das imagens enviadas.
- **JWT (JSON Web Tokens):** Implementa um sistema de autenticação stateless, gerando tokens para os usuários após o login.
- **Bcrypt:** Biblioteca usada para criptografar as senhas dos usuários antes de armazená-las no banco de dados, uma prática essencial de segurança.
- **Multer:** Middleware para o tratamento de uploads de arquivos, que neste caso são mantidos em memória (`memoryStorage`) antes de serem enviados para o Cloudinary.

### Configuração de Implantação (Deploy)

O repositório contém arquivos de configuração para duas plataformas de nuvem populares, indicando flexibilidade no processo de implantação:

- **Vercel (`vercel.json`):** Configurado para servir o diretório `frontend`, ideal para a hospedagem de aplicações estáticas e serverless functions.
- **Render (`render.yaml`):** Define um serviço web completo para o backend Node.js, incluindo a configuração de variáveis de ambiente e a integração com um banco de dados MongoDB gerenciado pela própria plataforma.

## Estrutura do Código

A organização dos arquivos no projeto é lógica e segue convenções comuns de desenvolvimento web:

```
galeria_kelvyn/
├── api/               # Configuração para deploy serverless (Vercel)
│   └── index.js
├── backend/           # Código-fonte do servidor
│   ├── src/
│   │   ├── config/    # Conexão com o banco de dados
│   │   ├── controllers/ # Lógica de requisição/resposta (não totalmente utilizado)
│   │   ├── middlewares/ # Middlewares customizados (upload)
│   │   ├── models/    # Schemas do Mongoose (Photo, User)
│   │   ├── routes/    # Definição das rotas da API
│   │   └── services/  # Configuração de serviços externos (Cloudinary)
│   └── server.js      # Ponto de entrada do servidor
├── frontend/          # Arquivos do cliente (interface do usuário)
│   ├── js/            # Scripts JavaScript
│   └── *.html         # Arquivos HTML
├── package.json       # Dependências e scripts do projeto
└── README.md          # Documentação do projeto
```

## Conclusão

O projeto **Galeria Kelvyn** é uma aplicação bem estruturada que demonstra um bom entendimento de tecnologias full-stack modernas. A separação entre frontend e backend é clara, e a escolha de ferramentas como Node.js, MongoDB e Cloudinary é adequada para os requisitos de um portfólio de fotografia. A inclusão de um sistema de autenticação robusto com JWT e criptografia de senhas eleva o projeto além de uma simples galeria estática, transformando-o em uma plataforma dinâmica e segura.
