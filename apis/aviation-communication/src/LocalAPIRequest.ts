export interface ICoreLocalApiRequest {
    args: Array<boolean | number | string>
    methodName?: string
    objectName?: string
}

export type LocalApiRequestCategoryType =
    'FromClient' | 'FromClientRedirected' | 'IsConnectionReady'

export interface ILocalAPIRequest<CategoryType = LocalApiRequestCategoryType>
    extends ICoreLocalApiRequest {
    __received__?: boolean
    __receivedTime__?: number
    application: string // name of the application
    category: CategoryType
    domain: string // network DNS domain name (or alike) where applcation is hosted
    id: string // UUID
    protocol: string
    transactionId?: string
}
