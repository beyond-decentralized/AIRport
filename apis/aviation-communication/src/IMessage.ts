export type Message_Application = 'UserInterface' | string
export type Message_Domain = string
export type Message_DomainProtocol = 'https' | string
export type Message_Error = string
export type Message_Id = string
export type SubscriptionId = string
export type TimeStamp = number
export type TransactionId = string

export enum Message_OriginOrDestination_Type {
    APPLICATION = 'APPLICATION',
    DATABASE = 'DATABASE',
    FRAMEWORK = 'FRAMEWORK',
    USER_INTERFACE = 'USER_INTERFACE',
}
export enum Message_Leg {
    FROM_HUB = 'FROM_HUB',
    TO_HUB = 'TO_HUB',
}

export enum Message_Type_Group {
    API = 'API',
    CRUD = 'CRUD',
    INTERNAL = 'INTERNAL',
    SUBSCRIPTION = 'SUBSCRIPTION',
}

export enum CRUD_Message_Type {
    DELETE_WHERE = 'DELETE_WHERE',
    FIND = 'FIND',
    FIND_ONE = 'FIND_ONE',
    INSERT_VALUES = 'INSERT_VALUES',
    INSERT_VALUES_GET_IDS = 'INSERT_VALUES_GET_IDS',
    SAVE = 'SAVE',
    UPDATE_VALUES = 'UPDATE_VALUES',
}

export enum INTERNAL_Message_Type {
    APP_INITIALIZED = 'APP_INITIALIZED',
    APP_INITIALIZING = 'APP_INITIALIZING',
    CONNECTION_IS_READY = 'CONNECTION_IS_READY',
    GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME = 'GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME',
    IS_CONNECTION_READY = 'IS_CONNECTION_READY',
    RETRIEVE_DOMAIN = 'RETRIEVE_DOMAIN',
}

export enum SUBSCRIPTION_Message_Type {
    API_SUBSCRIBE = 'API_SUBSCRIBE',
    API_SUBSCRIPTION_DATA = 'API_SUBSCRIPTION_DATA',
    API_UNSUBSCRIBE = 'API_UNSUBSCRIBE',
    SEARCH_ONE_SUBSCRIBE = 'SEARCH_ONE_SUBSCRIBE',
    SEARCH_ONE_SUBSCRIBTION_DATA = 'SEARCH_ONE_SUBSCRIBTION_DATA',
    SEARCH_ONE_UNSUBSCRIBE = 'ONE_UNSUBSCRIBE',
    SEARCH_SUBSCRIBE = 'SEARCH_SUBSCRIBE',
    SEARCH_SUBSCRIBTION_DATA = 'SEARCH_SUBSCRIBTION_DATA',
    SEARCH_UNSUBSCRIBE = 'SEARCH_UNSUBSCRIBE',
    SUBSCRIPTION_PING = 'SUBSCRIPTION_PING',
}

export interface IApiMessage extends IMessage {
    transactionId?: TransactionId
}

export interface ICrudMessage extends IMessage {
    transactionId?: TransactionId
    type: CRUD_Message_Type
}

export interface IInternalMessage extends IMessage {
    type: INTERNAL_Message_Type
}

export interface ISubscriptionMessage extends IMessage {
    subscriptionId?: SubscriptionId
    subscriptionIds?: SubscriptionId[]
    type: SUBSCRIPTION_Message_Type
}

export interface IMessage extends ICoreRequestFields {
    __received__?: boolean
    __receivedTime__?: TimeStamp
    errorMessage?: Message_Error
}

export interface ICoreRequestFields {
    destination?: MessageOriginOrDestination
    id: Message_Id
    messageLeg: Message_Leg
    origin: MessageOriginOrDestination
    typeGroup: Message_Type_Group
}

export interface MessageOriginOrDestination {
    app?: Message_Application
    domain: Message_Domain
    protocol: Message_DomainProtocol
    type: Message_OriginOrDestination_Type
}
