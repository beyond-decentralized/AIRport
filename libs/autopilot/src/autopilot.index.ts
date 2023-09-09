
import { AirEntityUtils, AirMessageUtils, INTERNAL_Message_Type, IUrlChangeMessage } from '@airport/aviation-communication'
import { loadUiPressurisation } from '@airport/pressurization'
import { AutopilotApiLoader } from './api/AutopilotApiLoader'
import { LocalAPIClient } from './LocalAPIClient'
import { UiStateManager } from './UiStateManager'

export * from './ApiClientSubject'
export * from './ClientSubjectCache'
export * from './api/AutopilotApiLoader'
export * from './LocalAPIClient'
export * from './SubscriptionCountSubject'
export * from './UiStateManager'

// This library is used in UI/Client bundles and does does not include @airport/direction-indicator
// dependency injection library
if (globalThis.IOC) {
    globalThis.AUTOPILOT_API_LOADER.setClass(AutopilotApiLoader)
    globalThis.AUTOPILOT_API_LOADER.setDependencies({
        apiClient: globalThis.API_CLIENT
    })
    globalThis.API_CLIENT.setDependencies({
        operationSerializer: globalThis.OPERATION_SERIALIZER,
        queryResultsDeserializer: globalThis.QUERY_RESULTS_DESERIALIZER
    })

}

export function loadAutopilot() {
    console.log("@airport/autopilot loaded")
}

export function loadUiAutopilot() {
    console.log("@airport/autopilot for UI is loaded")
    if (globalThis.IOC) {
        return
    }

    const airEntityUtils = new AirEntityUtils()
    const airMessageUtils = new AirMessageUtils()
    const autopilotApiLoader = new AutopilotApiLoader()
    const apiClient = new LocalAPIClient()
    autopilotApiLoader.apiClient = apiClient

    const {
        operationSerializer,
        queryResultsDeserializer
    } = loadUiPressurisation();
    apiClient.airMessageUtils = airMessageUtils
    apiClient.operationSerializer = operationSerializer
    apiClient.queryResultsDeserializer = queryResultsDeserializer

    apiClient.init()

    globalThis.IOC = {
        getAutopilotApiLoader() {
            return autopilotApiLoader
        },
        getSync() {
            return airEntityUtils
        }
    }

    const request: IUrlChangeMessage = this.getInternalMessage(INTERNAL_Message_Type.UI_URL_CHANGED)
    let currentUrl: string
    const history = window.history
    const pushState = history.pushState
    history.pushState = (state, ...args) => {
        if (typeof (history as any).onpushstate == "function") {
            (history as any).onpushstate({ state: state });
        }
        pushState.call(history, state, ...args)

        if (currentUrl === args[1]) {
            return
        }
        currentUrl = args[1].toString()
        request.newUrl = currentUrl
        try {
            apiClient.sendMessage(request)
        } catch (e) {
            console.error(e)
        }
    }
}

export const UI_STATE_MANAGER = new UiStateManager()

export function markForDeletion<T>(
    entity: T
): void {
    UI_STATE_MANAGER.markForDeletion(entity);
}

export function isDeleted<T>(
    entity: T
): boolean {
    return UI_STATE_MANAGER.isDeleted(entity);
}
