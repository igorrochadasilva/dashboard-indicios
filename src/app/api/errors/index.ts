/** Erro lançado quando já existe indício com mesma data e valor (duplicata). */
export class DuplicateEvidenceError extends Error {
  constructor() {
    super('Já existe indício com mesma data e valor da transação.')
    this.name = 'DuplicateEvidenceError'
  }
}
