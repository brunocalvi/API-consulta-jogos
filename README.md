### CRUD alimentando e consumindo uma API

## Dependicias

Dependicias utilizadas no Node para startar o projeto.

```bash
"body-parser": "^1.20.2",
"cors": "^2.8.5",
"ejs": "^3.1.9",
"express": "^4.18.2",
"mysql2": "^3.7.0",
"sequelize": "^6.35.2"
```

## Chamadas da API:

```python
# GET - Lista de Jogos
http://localhost:4567/games

# GET - Dados de um jogo
http://localhost:4567/game/id_game

# PUT - Atualizar um jogo
http://localhost:4567/game/id_game

# POST - Cadastrar um novo jogo
http://localhost:4567/game

# DELETE - deletar um jogo
http://localhost:4567/game/id_game

```

## O CRUD para alimentar a API

### A API de listagem fica junto com a deletar na home
- http://localhost:4567/views/

### A API para cadastrar um novo jogo fica em
- http://localhost:4567/views/cadastrar

### A API para atualizar um jogo fica em
- http://localhost:4567/views/consultar/id_jgo

## Anotações

- Todas precisam do id do jogo para que tenham sucesso no retorno
- Todo retorno esta em formato JSON com status de retorno
