export interface ILocalAPIResponse {
    __received__?: boolean
    __receivedTime__?: number
    category: 'ConnectionIsReady' | 'ToClient' | 'ToClientRedirected'
    errorMessage: string
    id: string // UUID
    host: string
    payload: any
    protocol: string
    applicationSignature: string
}
