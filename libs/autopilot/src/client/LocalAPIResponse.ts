export interface ILocalAPIResponse {
    category: 'ToApp'
    errorMessage: string
    id: string // UUID
    host: string
    payload: any
    schemaSignature: string
}
