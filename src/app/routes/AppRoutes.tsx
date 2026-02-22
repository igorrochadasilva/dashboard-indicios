import { Navigate, Route, Routes } from 'react-router'

import { ROUTES } from '@/app/constants'
import { CreateEvidencePage, MyEvidencePage } from '@/modules/evidence/pages'
import { AppLayout } from '@/shared/components'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to={ROUTES.myEvidence} replace />} />
        <Route path="meus-indicios" element={<MyEvidencePage />} />
        <Route
          path="meus-indicios/criar-indicio"
          element={<CreateEvidencePage />}
        />
      </Route>
    </Routes>
  )
}
