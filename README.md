# Análise DCP

Front End application oriented to SPA

## Technologies used

- [React](https://reactjs.org/) single page application
- Routing done using [React Router](https://reacttraining.com/react-router/web/guides/philosophy)
- [API](https://analisedcp.cyclic.app/) 

### Architecture diagrams

Diagram
[Diagram](/src/assets/diagram.png)

## Setup

1. Clone the repository and install the dependencies
```bash
npm install
```
2. Start the frontend application locally
```bash
npm start
```

## Available commands

* `npm start`: Start the app locally in your development environment, by default it will be in http://localhost:3000.

## Development flow

Here are the steps of the process you need to follow in order to integrate new code or a new feature into the project:

1. Create a local branch to get started using git: `git checkout -b <your-name>`.
1. Develop the new feature while doing atomic commits to your local branch using `git commit`.
1. After you are done, you might want to do a `git rebase develop` in case new changes were integrated, so your new commits are applied on top of that and you make sure everything still works.
1. Now you are ready to create a new Pull Request with your changes, but before, push your changes to origin using `git push -u origin <your-branch-name>`.
1. Your code should be reviewed, you can update the branch with new changes after you get some feedback.
1. After the Pull Request is approved, merge it using the UI on Github (you can also remove the branch directly from the same page, which is also convenient). Your code will land to the `develop` branch (and eventually deployed into the staging environment).

## CSS framework

This project implements [Bootstrap](https://getbootstrap.com) and [Bootstrap icons](https://icons.getbootstrap.com/)

## Routes

This project is using [`react-router-dom v6.4.3`](https://reacttraining.com/react-router/core), have a look at `Routes.jsx` which is the file that defines the routes that are available.

There are several routes to navigate to different pages of the app:

1. path="/" Login
1. path="/signup" Criar conta de usuário
1. path="/profile" Ver e editar o perfil do usuário
1. path="/analises" Recupera as análises realizadas pelo usuários nas DCPs
1. path="/logs" Recupera os logs (disponível apenas para usuário administrador do sistema)
1. path="/relatorio" Gera relatório em PDF com as análises do usuário
1. path="/notas" Recupera as notas fiscais do banco de dados
1. path="*" Trata de páginas inexistentes

## CI/CD

Autodeploy on new push to GitHub

## Deployment

Deployed using netlify.com
[Netlify](https://www.netlify.com/)

### Test deployment

The `main` branch deploys to https://analisedcp.netlify.app/

### Backend address

https://analisedcp.cyclic.app/