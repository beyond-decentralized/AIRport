export interface ILocalAPIRequest {
    __received__?: boolean
    __receivedTime__?: number
    args: Array<boolean | number | string>
    category: 'FromClient' | 'FromClientRedirected' | 'IsConnectionReady'
    host: string
    id: string // UUID
    methodName: string
    objectName: string
    protocol: string
    schemaSignature: string
}
