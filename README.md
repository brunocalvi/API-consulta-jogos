### CRUD alimentando e consumindo uma API

## Dependências

Dependências utilizadas no Node.js para iniciar o projeto.

```bash
"body-parser": "^1.20.2",
"cors": "^2.8.5",
"ejs": "^3.1.9",
"express": "^4.18.2",
"jsonwebtoken": "^9.0.2",
"mysql2": "^3.7.0",
"sequelize": "^6.35.2"
```

## Chamadas da API:

### API's de jogos:
```python
# GET - Lista de Jogos
http://localhost:4567/game/listaGames

# GET - Dados de um jogo
http://localhost:4567/game/consultaGame/id

# PUT - Atualizar um jogo
http://localhost:4567/game/atualizaGame/:id

# POST - Cadastrar um novo jogo
http://localhost:4567/game/cadastraGame

# DELETE - Deletar um jogo
http://localhost:4567/game/deletaGame/id

```

### API's de usuario:
```python
# POST - Para se logar
http://localhost:4567/user/auth (email, password)

# POST - Para se cadastrar
http://localhost:4567/user/cadastro (name, email, password)

```

## O CRUD para alimentar a API

### A listagem de jogos fica  na home junto com opção de deletar:
- http://localhost:4567/lista

### Para cadastrar um novo jogo:
- http://localhost:4567/cadastrar

### Para atualizar um jogo:
- http://localhost:4567/consultar/id_jogo

## Observações

- O retorno das API's estão em formato JSON com status de retorno
- Foi usado o CDN da axios para interpretar o retorno das API's no CRUD
- Os erros estão sendo tratados na API e retornando o motivo em JSON

## Autenticação

- Foi inserido um sistema de login para proteger o CRUD que alimenta a API
- As API's estão trabalhando com validação por token pela biblioteca jsonwebtoken