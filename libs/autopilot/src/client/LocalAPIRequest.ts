export interface ILocalAPIRequest {
    category: 'FromApp'
    args: Array<boolean | number | string>
    host: string
    id: string // UUID
    methodName: string
    objectName: string
    schemaSignature: string
}
