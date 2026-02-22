const JSON_SERVER_BASE = 'http://localhost:3001'

export const evidenceApiConfig = {
  baseUrl: JSON_SERVER_BASE,
  endpoints: {
    evidences: `${JSON_SERVER_BASE}/evidences`,
    activities: `${JSON_SERVER_BASE}/activities`,
  },
}
