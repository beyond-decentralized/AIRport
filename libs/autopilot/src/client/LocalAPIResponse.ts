export interface ILocalAPIResponse {
    category: 'ConnectionIsReady' | 'ToApp' | 'ToAppRedirected'
    errorMessage: string
    id: string // UUID
    host: string
    payload: any
    schemaSignature: string
}
