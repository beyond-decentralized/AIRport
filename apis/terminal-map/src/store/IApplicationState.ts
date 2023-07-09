import { IApplicationApi } from "@airport/air-traffic-control"
import { IClientSubjectCache, IMessage, SubscriptionId, TimeStamp } from "@airport/aviation-communication"
import { Subject, Subscription } from "rxjs"

export interface IMessageInRecord {
    message: IMessage
    reject?
    resolve
}

export interface IObservableMessageInRecord<T> {
    id: string
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
    application: string
    appState: AppState
    clientSubscriptionMap: Map<SubscriptionId, {
        lastActive: TimeStamp
        subscription: Subscription
    }>
    domain: string
    // FIXME: make this dynamic for web version (https://turbase.app), local version (https://localhost:PORT)
    // and debugging (https://localhost:5173)
    hostServer: string
    // FIXME: tie this in to the hostServer variable
    mainDomain: string
    clientSubjectCache: IClientSubjectCache
    pendingMessageMap: Map<string, IMessageInRecord>

    messageCallback: (
        message: any
    ) => void
}
