import { Observer } from "rxjs";
import { IIsolateMessage } from "../isolate/IsolateMessage";
export interface IMessageInRecord {
    message: IIsolateMessage;
    reject: any;
    resolve: any;
}
export interface IObservableMessageInRecord<T> {
    id: string;
    observer?: Observer<T>;
}
export declare enum AppState {
    NOT_INITIALIED = "NOT_INITIALIED",
    START_INITIALIZING = "START_INITIALIZING",
    INITIALIZING_IN_PROGRESS = "INITIALIZING_IN_PROGRESS",
    INITIALIZED = "INITIALIZED"
}
export interface IApplicationState {
    application: string;
    appState: AppState;
    domain: string;
    hostServer: string;
    mainDomain: string;
    observableMessageMap: Map<string, IObservableMessageInRecord<any>>;
    pendingMessageMap: Map<string, IMessageInRecord>;
    messageCallback: (message: any) => void;
}
//# sourceMappingURL=ApplicationState.d.ts.map