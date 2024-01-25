### CRUD alimentando e consumindo uma API

## Dependências

Dependências utilizadas no Node.js para iniciar o projeto.

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

# DELETE - Deletar um jogo
http://localhost:4567/game/id_game

```

## O CRUD para alimentar a API

### A listagem de jogos fica  na home junto com opção de deletar:
- http://localhost:4567/views/

### Para cadastrar um novo jogo:
- http://localhost:4567/views/cadastrar

### Para atualizar um jogo:
- http://localhost:4567/views/consultar/id_jgo

## Observações

- O retorno das API's estão em formato JSON com status de retorno
- Foi usado o CDN da axios para interpretar o retorno das API's no CRUD
- Os erros estão sendo tratados na API e retornando o motivo em JSON
