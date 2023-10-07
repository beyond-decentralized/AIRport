import { AppState, IApplicationState } from "@airport/terminal-map";
import { ClientSubjectCache } from "@airport/autopilot";

export const applicationState: IApplicationState = {
    api: null,
    application: null,
    appState: AppState.NOT_INITIALIZED,
    clientSubscriptionMap: new Map(),
    domain: null,
    // FIXME: make this dynamic for web version (https://turbase.app), local version (https://localhost:PORT)
    // and debugging (https://localhost:4200)
    hostServer: 'https://localhost:4200',
    // FIXME: tie this in to the hostServer variable
    mainDomain: null,
    clientSubjectCache: new ClientSubjectCache(),
    pendingMessageMap: new Map(),
}
