import { AppState, IApplicationState } from "@airport/terminal-map";
import { SubjectCache } from "@airport/autopilot";

export const applicationState: IApplicationState = {
    api: null,
    application: null,
    appState: AppState.NOT_INITIALIZED,
    clientSubscriptionMap: new Map(),
    domain: null,
    // FIXME: make this dynamic for web version (https://turbase.app), local version (https://localhost:PORT)
    // and debugging (https://localhost:3000)
    hostServer: 'https://localhost:3000',
    // FIXME: tie this in to the hostServer variable
    mainDomain: null,
    subjectCache: new SubjectCache(),
    pendingMessageMap: new Map(),
    messageCallback: null,
}
