import { ROUTES } from './routes'

export type SidebarMenuLabelKey = 'initialMenu' | 'monitoring'

export const SIDEBAR_MENU_ITEMS = [
  { labelKey: 'initialMenu', path: ROUTES.root },
  { labelKey: 'monitoring', path: ROUTES.myEvidence },
]
