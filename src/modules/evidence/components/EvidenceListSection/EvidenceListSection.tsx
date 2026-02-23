import { useMyEvidenceList } from '@/modules/evidence/hooks'

import { EvidenceFilters } from '../EvidenceFilters'
import { EvidenceTableSkeleton } from '../EvidencePageSkeleton/EvidenceTableSkeleton'
import { ReportedEvidenceTable } from '../ReportedEvidenceTable'

export function EvidenceListSection() {
  const {
    evidences,
    totalCount,
    isEvidencesLoading,
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    handleApplyFilters,
    handleClearFilters,
  } = useMyEvidenceList()

  return (
    <>
      <EvidenceFilters
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />
      {isEvidencesLoading ? (
        <EvidenceTableSkeleton />
      ) : (
        <ReportedEvidenceTable
          rows={evidences}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      )}
    </>
  )
}
