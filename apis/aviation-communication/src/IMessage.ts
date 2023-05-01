export type Message_Application = 'UserInterface' | string
export type Message_Domain = string
export type Message_DomainProtocol = 'https' | string
export type Message_Error = string
export type Message_Id = string
export type SubscriptionId = string
export type TimeStamp = number
export type TransactionId = string

export enum Message_Direction {
    FROM_CLIENT = 'FROM_CLIENT',
    INTERNAL = 'INTERNAL',
    TO_CLIENT = 'TO_CLIENT'
}

export enum Message_Leg {
    FROM_HUB = 'FROM_HUB',
    TO_HUB = 'TO_HUB'
}

export enum Message_Type {
    API_CALL = 'API_CALL',
    API_SUBSCRIBE = 'API_SUBSCRIBE',
    API_SUBSCRIPTION_DATA = 'API_SUBSCRIPTION_DATA',
    SUBSCRIPTION_PING = 'SUBSCRIPTION_PING',
    API_UNSUBSCRIBE = 'API_UNSUBSCRIBE',
    APP_INITIALIZED = 'APP_INITIALIZED',
    APP_INITIALIZING = 'APP_INITIALIZING',
    CONNECTION_IS_READY = 'CONNECTION_IS_READY',
    DELETE_WHERE = 'DELETE_WHERE',
    FIND = 'FIND',
    FIND_ONE = 'FIND_ONE',
    GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME = 'GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME',
    INSERT_VALUES = 'INSERT_VALUES',
    INSERT_VALUES_GET_IDS = 'INSERT_VALUES_GET_IDS',
    IS_CONNECTION_READY = 'IS_CONNECTION_READY',
    RETRIEVE_DOMAIN = 'RETRIEVE_DOMAIN',
    SAVE = 'SAVE',
    SEARCH_ONE_SUBSCRIBE = 'SEARCH_ONE_SUBSCRIBE',
    SEARCH_ONE_SUBSCRIBTION_DATA = 'SEARCH_ONE_SUBSCRIBTION_DATA',
    SEARCH_ONE_UNSUBSCRIBE = 'ONE_UNSUBSCRIBE',
    SEARCH_SUBSCRIBE = 'SEARCH_SUBSCRIBE',
    SEARCH_SUBSCRIBTION_DATA = 'SEARCH_SUBSCRIBTION_DATA',
    SEARCH_UNSUBSCRIBE = 'SEARCH_UNSUBSCRIBE',
    UPDATE_VALUES = 'UPDATE_VALUES'
}

export interface IMessage extends ICoreRequestFields {
    __received__?: boolean
    __receivedTime__?: TimeStamp
    errorMessage?: Message_Error
    subscriptionId?: SubscriptionId
    transactionId?: TransactionId
}

export interface ICoreRequestFields {
    clientApplication?: Message_Application,
    clientDomain?: Message_Domain,
    clientDomainProtocol?: Message_DomainProtocol,
    direction: Message_Direction,
    id: Message_Id,
    messageLeg: Message_Leg,
    serverApplication?: Message_Application,
    serverDomain?: Message_Domain,
    serverDomainProtocol?: Message_DomainProtocol,
    type?: Message_Type
}
