export interface ILocalAPIResponse {
    category: 'ToApp' | 'ToAppRedirected'
    errorMessage: string
    id: string // UUID
    host: string
    payload: any
    schemaSignature: string
}
