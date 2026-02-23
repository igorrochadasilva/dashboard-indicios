# Dashboard Indícios

Dashboard para gestão de indícios: listagem com filtros e paginação, criação de indícios e visualização de atividades por gráfico.

## Stack

- **React 19** + **TypeScript**
- **Vite 7** — build e dev server
- **Material UI (MUI) 7** — componentes e tema
- **React Query** — dados e cache
- **React Hook Form** + **Zod** — formulários e validação
- **React Router 7** — rotas
- **Recharts** — gráfico de atividades
- **Zustand** — estado global

## Pré-requisitos

- Node.js 18+
- npm (ou pnpm/yarn)

## Como rodar

### 1. Instalar dependências

```bash
npm install
```

### 2. Subir o backend (API mock)

O projeto usa **json-server** como API local. Em um terminal:

```bash
npm run server
```

Isso sobe o servidor em `http://localhost:3001` com os dados em `db.json`.

### 3. Subir o frontend

Em outro terminal:

```bash
npm run dev
```

Acesse **http://localhost:5173**.

## Scripts

| Comando                | Descrição                             |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | Inicia o dev server (Vite)            |
| `npm run build`        | Build de produção (TypeScript + Vite) |
| `npm run preview`      | Preview do build (`dist`)             |
| `npm run server`       | Inicia o json-server (API mock)       |
| `npm run test`         | Roda os testes (Vitest)               |
| `npm run lint`         | ESLint                                |
| `npm run lint:fix`     | ESLint com correção automática        |
| `npm run format`       | Prettier (formatação)                 |
| `npm run format:check` | Verifica formatação (CI)              |

## Estrutura do projeto

- **`src/app/`** — rotas, tema, constantes e textos
- **`src/shared/`** — layout (Sidebar, TopBar), Toast, PageHeader, ícones
- **`src/modules/evidence/`** — feature de indícios: API, hooks, formulário, tabela, gráfico, páginas
- **`src/assets/`** — ícones e assets estáticos
- **`tests/`** — setup, test-utils e testes (Vitest + Testing Library)

A arquitetura é descrita em **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**.

## Build de produção

O build usa code-splitting e chunks por vendor:

- **App shell** — layout e rotas
- **vendor-mui** — apenas componentes MUI utilizados (tree-shaking)
- **vendor-react** / **vendor-react-query** — carregados no início
- **vendor-recharts** — carregado só na rota “Meus indícios” (gráfico)
- **CreateEvidencePage** / **MyEvidencePage** — carregadas sob demanda

```bash
npm run build
```

Saída em `dist/`. Para testar: `npm run preview`.

## Testes

```bash
npm run test
```

- **Vitest** + **React Testing Library**
- Setup em `tests/setup.ts` (jest-dom, mocks de SVG)
- `tests/test-utils.tsx` — `render` com ThemeProvider e MemoryRouter

## Licença

Projeto privado.
