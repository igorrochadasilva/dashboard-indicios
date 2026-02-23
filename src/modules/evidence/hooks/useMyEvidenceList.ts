import { useState } from 'react'

import { useEvidences } from '../services'

export type EvidenceListFilters = {
  transactionId: string
  classification: string
}

export function useMyEvidenceList() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filterTransactionId, setFilterTransactionId] = useState('')
  const [filterClassification, setFilterClassification] = useState('')

  const evidencesQuery = useEvidences({
    page: page + 1,
    limit: rowsPerPage,
    transactionId: filterTransactionId || undefined,
    classification: filterClassification || undefined,
  })

  const evidences = evidencesQuery.data?.data ?? []
  const totalCount = evidencesQuery.data?.totalCount ?? 0
  const isEvidencesLoading = evidencesQuery.isLoading

  const handleApplyFilters = (values: EvidenceListFilters) => {
    setFilterTransactionId(values.transactionId)
    setFilterClassification(values.classification)
    setPage(0)
  }

  const handleClearFilters = () => {
    setFilterTransactionId('')
    setFilterClassification('')
    setPage(0)
  }

  return {
    evidences,
    totalCount,
    isEvidencesLoading,
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    handleApplyFilters,
    handleClearFilters,
  }
}
