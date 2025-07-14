# Minha Lista de Tarefas | Projeto Fullstack

> **Link da Aplicação:** [https://desafio-fullstack-justtravel-ten.vercel.app/](https://desafio-fullstack-justtravel-ten.vercel.app/)

Uma aplicação web completa para gerenciamento de tarefas, construída com React no frontend e Python/Flask no backend, com dados persistidos em um banco de dados PostgreSQL.
<p align="center">
<img width="433" height="588" alt="image" src="https://github.com/user-attachments/assets/0143cd35-168f-4ebd-a490-ff35a73331b0" />
  <br>
  <em>Foto da aplicação</em>
</p>

-----

## ✨ Funcionalidades

  - **Gerenciamento Completo:** Crie, edite e delete tarefas.
  - **Prioridades:** Defina níveis de prioridade (Baixa, Média, Alta).
  - **Status:** Alterne tarefas entre pendente e concluída.
  - **Filtros e Ordenação:** Filtre por status e ordene por data ou prioridade.
  - **Persistência de Dados:** Suas tarefas são salvas de forma segura em um banco de dados na nuvem.

-----

## 🛠️ Tecnologias Utilizadas

  - **Frontend:** React (com Vite), Axios, Bootstrap
  - **Backend:** Python, Flask, SQLAlchemy
  - **Banco de Dados:** PostgreSQL
  - **Deploy:** Vercel (Frontend) e Render (Backend)

-----

## ⚙️ Como Rodar o Projeto Localmente

### Pré-requisitos

  - [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
  - [Python](https://www.python.org/downloads/) (versão 3.10 ou superior)
  - [Git](https://git-scm.com/)

### 1\. Clone o Repositório

```bash
git clone https://github.com/LeonSantana7/desafio-fullstack-justtravel.git
cd desafio-fullstack-justtravel
```

### 2\. Rodando o Backend

1.  **Navegue até a pasta do backend**
    ```bash
    cd backend
    ```
2.  **Crie e ative um ambiente virtual**
    ```bash
    # No macOS/Linux:
    python3 -m venv venv
    source venv/bin/activate

    # No Windows:
    # python -m venv venv
    # venv\Scripts\activate
    ```
3.  **Instale as dependências**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Configure a Variável de Ambiente**
      - Crie um arquivo chamado `.env` dentro da pasta `backend`.
      - Adicione sua string de conexão do PostgreSQL ao arquivo `.env`:
    <!-- end list -->
    ```.env
    DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@localhost/SEU_BANCO_LOCAL"
    ```
5.  **Rode o servidor Flask**
    ```bash
    flask run
    ```
    *A API estará rodando em `http://127.0.0.1:5000`*

### 3\. Rodando o Frontend

1.  **Em um novo terminal, navegue até a pasta do frontend**
    ```bash
    cd frontend
    ```
2.  **Instale as dependências**
    ```bash
    npm install
    ```
3.  **Configure a Variável de Ambiente**
      - Crie um arquivo chamado `.env` na pasta `frontend` com a URL da API local:
    <!-- end list -->
    ```.env
    VITE_API_URL=http://127.0.0.1:5000
    ```
4.  **Rode a aplicação React**
    ```bash
    npm run dev
    ```
    *O site estará acessível em `http://localhost:5173` (ou outra porta indicada no terminal)*

-----

## 👤 Autor

**Leon Santana**

  - **GitHub:** [@LeonSantana7](https://github.com/LeonSantana7)
  - **LinkedIn:** [https://www.linkedin.com/in/leon-santana-8b5041193/](https://www.linkedin.com/in/leon-santana-8b5041193/)
