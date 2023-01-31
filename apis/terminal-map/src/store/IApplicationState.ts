import { IApplicationApi } from "@airport/air-traffic-control"
import { Observer } from "rxjs"
import { IIsolateMessage } from "../isolate/IIsolateMessage"

export interface IMessageInRecord {
    message: IIsolateMessage
    reject?
    resolve
}

export interface IObservableMessageInRecord<T> {
    id: string
    observer?: Observer<T>
}
export enum AppState {
    NOT_INITIALIED = 'NOT_INITIALIED',
    START_INITIALIZING = 'START_INITIALIZING',
    INITIALIZING_IN_PROGRESS = 'INITIALIZING_IN_PROGRESS',
    INITIALIZED = 'INITIALIZED'
}

export interface IApplicationState {
    api: IApplicationApi
    application: string
    appState: AppState
    domain: string
    // FIXME: make this dynamic for web version (https://turbase.app), local version (https://localhost:PORT)
    // and debugging (https://localhost:3000)
    hostServer: string
    // FIXME: tie this in to the hostServer variable
    mainDomain: string
    observableMessageMap: Map<string, IObservableMessageInRecord<any>>
    pendingMessageMap: Map<string, IMessageInRecord>

    messageCallback: (
        message: any
    ) => void
}
