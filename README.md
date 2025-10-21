# Frontend Product API

Este é o frontend da aplicação de gerenciamento de produtos, desenvolvido com Vue.js 3. Ele fornece uma interface web para autenticação de usuários e gerenciamento completo de produtos (CRUD).

## Funcionalidades

- **Autenticação de Usuários**: Login e registro de usuários
- **Gerenciamento de Produtos**:
  - Listar produtos com paginação
  - Pesquisar produtos por nome
  - Criar novos produtos
  - Visualizar detalhes de produtos
  - Editar produtos existentes
  - Excluir produtos
- **Interface Responsiva**: Design adaptável para diferentes tamanhos de tela usando Bootstrap
- **Mensagens de Boas-vindas**: Saudação personalizada para usuários logados

## Tecnologias Utilizadas

- **Vue.js 3**: Framework JavaScript progressivo
- **Vite**: Ferramenta de build rápida
- **TypeScript**: Superset tipado do JavaScript
- **Pinia**: Gerenciamento de estado
- **Vue Router**: Roteamento para aplicações SPA
- **Bootstrap 5**: Framework CSS para design responsivo
- **Axios**: Cliente HTTP para requisições à API

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Backend da API rodando (Spring Boot)

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd frontend-product-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure a URL da API no arquivo `src/stores/auth.js` e `src/stores/produto.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:8080/api'  // Ajuste conforme necessário
   ```

## Como Usar

### Desenvolvimento Local

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Abra o navegador em `http://localhost:5173`

### Build para Produção

1. Gere os arquivos otimizados:
   ```bash
   npm run build
   ```

2. Visualize a build:
   ```bash
   npm run preview
   ```

## Docker

### Construir e Executar com Docker

1. Construa a imagem:
   ```bash
   docker build -t frontend-product-api .
   ```

2. Execute o container:
   ```bash
   docker run -p 8080:80 frontend-product-api
   ```

3. Acesse em `http://localhost:8080`

## API Backend

Este frontend se conecta a uma API REST desenvolvida em Spring Boot. Os endpoints principais incluem:

- `POST /api/auth/login` - Autenticação
- `POST /api/users/register` - Registro de usuário
- `GET /api/produtos` - Listar produtos
- `POST /api/produtos` - Criar produto
- `GET /api/produtos/{id}` - Detalhes do produto
- `PUT /api/produtos/{id}` - Atualizar produto
- `DELETE /api/produtos/{id}` - Excluir produto

Certifique-se de que o backend esteja rodando e acessível.

## Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── stores/         # Gerenciamento de estado (Pinia)
│   ├── auth.js     # Estado de autenticação
│   └── produto.js  # Estado dos produtos
├── views/          # Páginas da aplicação
│   ├── LoginView.vue
│   ├── RegisterView.vue
│   ├── ProdutoListView.vue
│   ├── ProdutoFormView.vue
│   └── ProdutoDetailView.vue
├── router/         # Configuração de rotas
└── main.ts         # Ponto de entrada da aplicação
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run type-check` - Verifica tipos TypeScript

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
