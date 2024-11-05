# CRUD de Cadastramento de Usuários

Este projeto é um CRUD (Create, Read, Update, Delete) para o cadastramento de usuários utilizando o framework Next.js e o banco de dados FireBase. O sistema permite o login dos usuários em um dashboard, utilizando tokens do FireBase para gerenciar a autenticação e recuperação de informações.

## Funcionalidades

- **Cadastro de Usuários**: Permite o registro de novos usuários.
- **Leitura de Usuários**: Exibe uma lista de usuários cadastrados.
- **Atualização de Usuários**: Permite a edição das informações do usuário.
- **Exclusão de Usuários**: Permite remover usuários do sistema.
- **Autenticação**: Implementação de login para acesso ao dashboard.

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [React](https://reactjs.org/)
- [JavaScript/TypeScript](https://www.typescriptlang.org/)
- [CSS Modules](https://github.com/css-modules/css-modules)

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Git](https://git-scm.com/) para controle de versão

## Como Executar o Projeto

Siga os passos abaixo para executar o projeto localmente:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
2. **Navegue até o diretório do projeto**:
   ```bash
   cd nome-do-repositorio
3. **Instale as dependências**:
   ```bash
   npm install
4. **Configure o Firebase**:
  - Crie um projeto no Firebase e adicione a configuração do seu app.
  - Adicione o arquivo de configuração do Firebase em services/firebaseConnections.ts.   
5. **Execute o projeto**:
   ```bash
   npm run dev
   ```
# Exemplo da funcionalidade do projeto:
Note que ao criar um usuário voçe tem acesso ao dashboard do sistema, mas se o login for feito pelo administrador do sistema, podemos listar, remover e até excluir os usuários cadastrados no sistema.

![testeCrud](https://github.com/user-attachments/assets/91a772a0-05c6-4abd-8797-4138fd488d53)



