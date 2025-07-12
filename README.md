# Minha Lista de Tarefas | Projeto Fullstack

    Link da Aplicação: https://desafio-fullstack-justtravel-ten.vercel.app/

Uma aplicação web completa para gerenciamento de tarefas, construída com React no frontend e Python/Flask no backend, com dados persistidos em um banco de dados PostgreSQL.

# ✨ Funcionalidades

   * Gerenciamento Completo: Crie, edite e delete tarefas.

   * Prioridades: Defina níveis de prioridade (Baixa, Média, Alta).

   * Status: Alterne tarefas entre pendente e concluída.

   * Filtros e Ordenação: Filtre por status e ordene por data ou prioridade.

   * Persistência de Dados: Suas tarefas são salvas de forma segura em um banco de dados na nuvem.

# 🛠️ Tecnologias Utilizadas

   * Frontend: React (com Vite), Axios, Bootstrap

   * Backend: Python, Flask, SQLAlchemy

   * Banco de Dados: PostgreSQL

   * Deploy: Vercel (Frontend) e Render (Backend)

# ⚙️ Como Rodar o Projeto Localmente

Pré-requisitos

   * Node.js (versão 18 ou superior)

   * Python (versão 3.10 ou superior)

   * Git

# 1. Clone o Repositório

  * git clone https://github.com/LeonSantana7/desafio-fullstack-justtravel.git
  * cd desafio-fullstack-justtravel

# 2. Rodando o Backend

*  Navegue até a pasta do backend
*  cd backend

* Crie e ative um ambiente virtual
  *  No Windows:
    *  python -m venv venv
    *  venv\Scripts\activate

  * No macOS/Linux:
    *  python3 -m venv venv
    *  source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt

  *  Crie um arquivo .env na pasta 'backend' e adicione a string de conexão  do seu banco de dados local. Exemplo:

    DATABASE_URL="postgresql://user:password@localhost/db_name"

  *  Rode o servidor Flask
  *  flask run

    
A API estará rodando em http://127.0.0.1:5000

# 3. Rodando o Frontend

Em um novo terminal, navegue até a pasta do frontend
  * cd frontend

Instale as dependências
  * npm install

Crie um arquivo .env na pasta 'frontend' com a URL da API local:
  * VITE_API_URL=http://127.0.0.1:5000

Rode a aplicação React
  * npm run dev

# O site estará acessível em http://localhost:5173

👤 Autor

Leon Santana

    GitHub: @LeonSantana7
    Linkedin: https://www.linkedin.com/in/leon-santana-8b5041193/

