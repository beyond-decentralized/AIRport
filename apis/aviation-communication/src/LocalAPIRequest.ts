export interface ICoreLocalApiRequest {
    args: Array<boolean | number | string>
    methodName: string
    objectName: string
}

export interface ILocalAPIRequest
    extends ICoreLocalApiRequest {
    __received__?: boolean
    __receivedTime__?: number
    application: string // name of the application
    category: 'FromClient' | 'FromClientRedirected' | 'IsConnectionReady'
    domain: string // network DNS domain name (or alike) where applcation is hosted
    id: string // UUID
    protocol: string
}
