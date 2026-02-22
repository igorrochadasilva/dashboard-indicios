import { ROUTES } from '@/app/constants'

export { HomeIcon } from './HomeIcon'
export { MenuCollapseIcon } from './MenuCollapseIcon'
export { MonitoringIcon } from './MonitoringIcon'
export { MonogramIcon } from './MonogramIcon'
export { PlusIcon } from './PlusIcon'
export { EllipsisIcon } from './EllipsisIcon'
export { SearchIcon } from './SearchIcon'

import { HomeIcon } from './HomeIcon'
import { MonitoringIcon } from './MonitoringIcon'

export const PATH_TO_ICON = {
  [ROUTES.root]: HomeIcon,
  [ROUTES.myEvidence]: MonitoringIcon,
}
