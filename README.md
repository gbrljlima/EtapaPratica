# Gerenciador de Tarefas

Aplicação Full-Stack desenvolvida para gerenciar uma lista de tarefas (To-Do). O sistema permite ao usuário criar, editar, excluir e visualizar tarefas, além de alternar o status entre "Pendente" e "Concluída.

## Tecnologias utilizadas:
* <b>Backend:</b> Node.js, Express e Cors.
* <b>Frontend:</b> React, Axios, React Router Dom, Tailwind CSS e React Toastify.

##  Instruções para instalar dependências e rodar backend e frontend:
Você precisará ter o Node.js instalado. (https://nodejs.org/pt-br/download)
### Backend: 
* Abra o terminal e navegue até a pasta do backend (cd backend);
* Instale as dependências (npm install);
* Inicie o servidor (node index.js);
* A Api estará rodando em http://localhost:3001/ .

### Frontend:
* Abra outro terminal e navegue até a pasta do frontend (cd frontend);
* Instale as depedências (npm install);
* Inicie o servidor (npm run dev);
* A aplicação estará rodando em http://localhost:5173/ (Utilize seu navegador).

## Estruturas de pastas
A organização da aplicação está dividida em duas partes (backend e frontend).
```
└───Gerenciador-de-Tarefas
    ├───backend
    │   ├───controllers
    │   ├───middlewares
    │   ├───models
    │   └───routes
    └───frontend
        └───src
            ├───components
            ├───pages
            └───services
    
