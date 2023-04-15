import { IApplicationApi } from "@airport/air-traffic-control"
import { IMessage } from "@airport/aviation-communication"
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
    clientSubscriptionMap: Map<string, Subscription>
    domain: string
    // FIXME: make this dynamic for web version (https://turbase.app), local version (https://localhost:PORT)
    // and debugging (https://localhost:3000)
    hostServer: string
    // FIXME: tie this in to the hostServer variable
    mainDomain: string
    observableRequestSubjectMap: Map<string, Subject<any>>
    pendingMessageMap: Map<string, IMessageInRecord>

    messageCallback: (
        message: any
    ) => void
}
