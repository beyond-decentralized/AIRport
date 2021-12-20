export interface ILocalAPIRequest {
    __received__?: boolean
    __receivedTime__?: number
    application: string // name of the application
    args: Array<boolean | number | string>
    category: 'FromClient' | 'FromClientRedirected' | 'IsConnectionReady'
    domain: string // network DNS domain name (or alike) where applcation is hosted
    host: string
    id: string // UUID
    methodName: string
    objectName: string
    protocol: string
}
