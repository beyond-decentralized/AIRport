export interface ILocalAPIResponse {
    __received__?: boolean
    __receivedTime__?: number
    application: string //  name of the application
    category: 'ConnectionIsReady' | 'ToClient' | 'ToClientRedirected'
    domain: string // network DNS domain name (or alike) where applcation is hosted
    errorMessage: string
    id: string // UUID
    payload: any
    protocol: string
}
