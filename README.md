# crud-blue-web-app

## Configuração do Projeto
```
npm install
```

### Compila e recarrega em tempo real para desenvolvimento
```
npm run serve
```

### Compila e minifica para produção
```
npm run build
```

### Compila e minifica para produção
```
npm run lint
```

### Compila e minifica para produção
See [Configuration Reference](https://cli.vuejs.org/config/).

## Acesso à API

A aplicação está configurada para se conectar automaticamente à API CrudBlue. Certifique-se de que a API esteja em execução, seja localmente ou em um container Docker, para que a aplicação web possa consumir os dados.

### Uso do Docker

Se você estiver executando a API em um container Docker, inicie o container com o comando apropriado, especificando a porta desejada. Por exemplo:
    `docker run -d -p 7070:80 nome-da-imagem-api`

Substitua `nome-da-imagem-api` pelo nome correto da imagem Docker da sua API. A aplicação web irá se conectar à API na porta especificada.

