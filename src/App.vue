<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/cadastrar">Cadastrar</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 10px;
  font-size: 110%
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

/* Novos estilos globais */
html,
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
}

/* Estilos para a tabela */
.table-container {
  width: 80%;
  margin-top: 5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 8px;
  font-size: smaller;
}

th {
  background-color: #004085;
  color: white;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.card {
  width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px 0;
}

.error-message {
  color: red;
  margin-top: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: none;
}

.error-message.is-visible {
  display: block;
  padding: 20px;
}

/* Estilos base para todos os botões */
.base-button {
  padding: 10px 20px;
  font-size: 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}

.btn-box {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  padding: 10px;
}

/* Estilos específicos para botões de ação */
.action-button {
  background-color: #4CAF50;
  color: white;
}

/* Estilos específicos para botões secundários */
.secondary-button {
  background-color: #e7e7e7;
  color: black;
}

/* Estilos específicos para botões de aviso */
.warning-button {
  background-color: orange;
  color: white;
}

.p-button-info {
  background-color: #204887;
  border-color: #204887;
  color: white;
}
</style>
