export interface ILocalAPIRequest {
    category:  'FromClient' | 'FromClientRedirected' | 'IsConnectionReady' 
    args: Array<boolean | number | string>
    host: string
    id: string // UUID
    methodName: string
    objectName: string
    protocol: string
    schemaSignature: string
}
