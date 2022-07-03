export interface ICoreLocalApiRequest {
    application: string // name of the application
    args: Array<boolean | number | string>
    domain: string // network DNS domain name (or alike) where applcation is hostedß
    methodName: string
    objectName: string
}

export type LocalApiRequestCategoryType =
    'FromClient' | 'FromClientRedirected' | 'IsConnectionReady'

export interface ILocalAPIRequest<CategoryType = LocalApiRequestCategoryType>
    extends ICoreLocalApiRequest {
    __received__?: boolean
    __receivedTime__?: number
    category: CategoryType
    hostDomain: string // network DNS domain name (or alike) of the client application
    // (weather the client is a UI or an AIRport application)
    hostProtocol: string // protocol (http or https) of the client application
    id: string // GUID
    protocol: string
    transactionId?: string
}
