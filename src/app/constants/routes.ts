/**
 * Rotas da aplicação. Alterar aqui reflete em todas as referências (Sidebar, AppRoutes, links).
 */
export const ROUTES = {
  root: '/',
  myEvidence: '/meus-indicios',
  createEvidence: '/meus-indicios/criar-indicio',
}

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
