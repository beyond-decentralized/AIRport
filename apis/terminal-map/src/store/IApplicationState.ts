import { IApplicationApi } from "@airport/air-traffic-control"
import { IClientSubjectCache, IMessage, Message_Id, SubscriptionId, TimeStamp } from "@airport/aviation-communication"
import { DbApplication_FullName, DbDomain_Name } from "@airport/ground-control"
import { Subject, Subscription } from "rxjs"

export interface IMessageInRecord<IM extends IMessage = IMessage> {
    message: IM
    reject?
    resolve
}

export interface IObservableMessageInRecord<T> {
    id: Message_Id
    subject?: Subject<T>
}

export enum AppState {
    NOT_INITIALIZED = 'NOT_INITIALIZED',
    START_INITIALIZING = 'START_INITIALIZING',
    INITIALIZING_IN_PROGRESS = 'INITIALIZING_IN_PROGRESS',
    INITIALIZED = 'INITIALIZED'
}

export interface IApplicationState {
    api: IApplicationApi
    application: DbApplication_FullName
    appState: AppState
    clientSubscriptionMap: Map<SubscriptionId, {
        lastActive: TimeStamp
        subscription: Subscription
    }>
    domain: DbDomain_Name
    // FIXME: make this dynamic for web version (https://turbase.app), local version (https://localhost:PORT)
    // and debugging (https://localhost:5173)
    hostServer: string
    // FIXME: tie this in to the hostServer variable
    mainDomain: string
    clientSubjectCache: IClientSubjectCache
    pendingMessageMap: Map<Message_Id, IMessageInRecord>
}
