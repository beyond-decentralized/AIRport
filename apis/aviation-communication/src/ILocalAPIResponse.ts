export interface ILocalAPIResponse {
    __received__?: boolean
    __receivedTime__?: number
    application: string //  name of the application
    args: any[]
    category: 'ConnectionIsReady' | 'ToClient' | 'ToClientRedirected' | 'FromDb'
    domain: string // network DNS domain name (or alike) where applcation is hosted
    errorMessage: string
    hostDomain: string
    hostProtocol: string
    id: string // GUID
    methodName: string
    objectName: string
    payload: any
    protocol: string
    transactionId: string
}

export interface IObservableLocalAPIResponse
    extends ILocalAPIResponse {
    subscriptionId: string
}