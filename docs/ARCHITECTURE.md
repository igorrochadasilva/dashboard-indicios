# Arquitetura do projeto

Este documento descreve a organização do código do **dashboard-indicios**: estrutura de pastas, responsabilidades e fluxo de dependências.

---

## Visão geral

O projeto usa um **design feature-based (flat)**: cada funcionalidade vive em um módulo com estrutura simples (tipos, API, hooks, UI), sem camadas formais como domain/data/presentation. O foco é clareza e manutenção sem over-engineering.

**Stack:** React 19, Vite, TypeScript, MUI, React Query, React Hook Form + Zod, React Router.

---

## Estrutura de pastas

```
src/
├── main.tsx                 # Entry point: providers (Query, Theme, Router) e <AppRoutes />
├── app/                     # Configuração global da aplicação
│   ├── constants/           # Rotas, menu do sidebar
│   ├── routes/              # Definição das rotas (AppRoutes)
│   ├── theme/               # Tema MUI e augmentações
│   └── texts/               # Textos da interface (site.json, etc.)
├── shared/                  # Componentes e recursos compartilhados
│   └── components/          # Layout (AppLayout, Sidebar, TopBar), Toast, PageHeader, Icons
├── modules/                 # Módulos por feature
│   └── evidence/            # Feature "Indícios"
│       ├── types.ts         # Tipos e DTOs da feature
│       ├── api.ts           # Chamadas HTTP (getEvidences, getActivities)
│       ├── hooks/           # Hooks React Query (useEvidences, useActivities)
│       ├── schema/          # Validação Zod e defaults do formulário
│       ├── components/      # Componentes de UI da feature
│       └── pages/           # Páginas (telas de rota)
└── assets/                  # Ícones e assets estáticos
```

---

## Responsabilidades

### `app/`

- **constants:** paths de rotas (`ROUTES`), itens do menu lateral.
- **routes:** `<AppRoutes />` declara as rotas e usa layout (`AppLayout`); importa páginas dos módulos.
- **theme:** tema MUI (palette, typography) e arquivos de augment (palette.d.ts, theme-augment).
- **texts:** textos da UI (ex.: `site.json`) para i18n ou centralização de copy.

Nenhuma lógica de negócio nem chamadas HTTP; só configuração e roteamento.

### `shared/`

Componentes e recursos usados por mais de um módulo ou pela shell da aplicação:

- **AppLayout, Sidebar, TopBar:** estrutura da página (menu, barra superior).
- **PageHeader:** cabeçalho de página com título e ação opcional.
- **Toast:** notificações.
- **Icons:** ícones reutilizáveis (SVG/React).

`shared` não importa de `modules`; é a base comum da UI.

### `modules/<feature>/`

Cada feature (ex.: `evidence`) segue a mesma estrutura:

| Arquivo/pasta   | Responsabilidade                                                                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **types.ts**    | Tipos, enums e DTOs da feature (entidades, parâmetros e resultados de API).                                                                      |
| **api.ts**      | Funções que fazem as chamadas HTTP (fetch). Config (ex.: base URL) pode ficar no próprio arquivo ou em um `config` local.                        |
| **hooks/**      | Hooks que expõem dados e estado (ex.: React Query). Usam `api` e `types`.                                                                        |
| **schema/**     | Schemas Zod e valores default para formulários da feature.                                                                                       |
| **components/** | Componentes React da UI da feature (formulários, tabelas, filtros, gráficos). Usam `types`, `schema` e, se necessário, hooks da própria feature. |
| **pages/**      | Componentes de página (um por rota). Compõem componentes e hooks; são o que as rotas renderizam.                                                 |

**Fluxo de dependência dentro do módulo:**

- `pages` → `hooks`, `components`
- `hooks` → `api`, `types`
- `components` → `types`, `schema` (e às vezes hooks)
- `api` → `types`

Não há camada “domain” ou “application”; a orquestração fica nos hooks e nas páginas.

---

## Módulo Evidence (exemplo)

```
modules/evidence/
├── types.ts              # ReportedEvidenceRow, SubmissionsByActivityDataPoint,
│                         # GetEvidencesParams, GetEvidencesResult, enums (EvidenceSource, etc.)
├── api.ts                # getEvidences(params), getActivities(); base URL e endpoints
├── hooks/
│   ├── useEvidences.ts   # useQuery que chama getEvidences
│   ├── useActivities.ts  # useQuery que chama getActivities
│   └── index.ts
├── schema/
│   ├── createEvidenceSchema.ts   # Zod schema + default values do formulário
│   └── index.ts
├── components/           # EvidenceFilters, ReportedEvidenceTable, CreateEvidenceForm,
│   └── ...               # SubmissionsByActivityChart, etc.
└── pages/
    ├── MyEvidencePage.tsx      # Lista + filtros + tabela + gráfico
    ├── CreateEvidencePage.tsx  # Formulário de criação
    └── index.ts
```

- **Rotas:** `app/routes/AppRoutes.tsx` importa `CreateEvidencePage` e `MyEvidencePage` de `@/modules/evidence/pages` e associa às rotas.
- **Dados:** as páginas usam `useEvidences` e `useActivities`; os hooks chamam `getEvidences` e `getActivities` de `api.ts`.

---

## Entry point e providers

`main.tsx`:

1. Cria o `QueryClient` (React Query).
2. Renderiza a árvore com `QueryClientProvider`, `ThemeProvider`, `CssBaseline`, `BrowserRouter`.
3. Dentro do router, renderiza `<AppRoutes />`.

Não há composition root de repositórios nem providers por feature; cada módulo importa o que precisa (api, hooks) diretamente.

---

## Regras práticas

1. **Módulos não importam outros módulos** (por enquanto). Cada feature é autocontida.
2. **`app` e `shared`** não importam de `modules`, exceto nas rotas (`app/routes` importa páginas dos módulos).
3. **Tipos da feature** ficam em `modules/<feature>/types.ts`; componentes podem reexportar em seus próprios `types.ts` para conveniência (ex.: `ReportedEvidenceTable/types.ts` reexporta de `@/modules/evidence/types`).
4. **Chamadas HTTP** ficam concentradas em `api.ts` (ou em um único lugar por feature), não espalhadas em componentes.
5. **Novas features:** criar nova pasta em `modules/` com a mesma estrutura (types, api, hooks, schema se houver form, components, pages).

---

## Resumo

| Área                  | Função                                                             |
| --------------------- | ------------------------------------------------------------------ |
| **app**               | Configuração global: rotas, tema, constantes, textos.              |
| **shared**            | Layout e componentes reutilizáveis (não dependem de módulos).      |
| **modules/<feature>** | Tudo da feature: tipos, API, hooks, schema, componentes e páginas. |
| **main.tsx**          | Providers globais e `<AppRoutes />`.                               |

O padrão é **feature folder flat**: poucas camadas, nomes claros (types, api, hooks, pages) e dependências em uma direção só (pages → hooks/components → api/types).
