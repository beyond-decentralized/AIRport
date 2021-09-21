export interface ILocalAPIRequest {
    category:  'FromApp' | 'FromAppRedirected' | 'IsConnectionReady' 
    args: Array<boolean | number | string>
    host: string
    id: string // UUID
    methodName: string
    objectName: string
    schemaSignature: string
}
