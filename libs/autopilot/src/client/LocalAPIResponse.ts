export interface ILocalAPIResponse {
    __received__?: boolean
    category: 'ConnectionIsReady' | 'ToClient' | 'ToClientRedirected'
    errorMessage: string
    id: string // UUID
    host: string
    payload: any
    protocol: string
    schemaSignature: string
}
