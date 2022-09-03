import { AppState, IApplicationState } from "./ApplicationState";

export const applicationState: IApplicationState = {
    api: null,
    application: null,
    appState: AppState.NOT_INITIALIED,
    domain: null,
    // FIXME: make this dynamic for web version (https://turbase.app), local version (https://localhost:PORT)
    // and debugging (http://localhost:3000)
    hostServer: 'http://localhost:3000',
    // FIXME: tie this in to the hostServer variable
    mainDomain: null,
    observableMessageMap: new Map(),
    pendingMessageMap: new Map(),
    messageCallback: null,
}