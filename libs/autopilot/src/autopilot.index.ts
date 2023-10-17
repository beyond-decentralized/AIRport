
import { AirEntityUtils, AirMessageUtils, IAirMessageUtils, INTERNAL_Message_Type, IUrlChangeMessage } from '@airport/aviation-communication'
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
    globalThis.setApiClientNgZone = (ngZone) => {
        apiClient.ngZone = ngZone
    }
    globalThis.setApiClientNavigationCallback = (navigationCallback: (url: string) => void) => {
        apiClient.navigationCallback = navigationCallback
    }

    trackUrlState(airMessageUtils, apiClient)
}
/**
 * 
 * Objective: When the user presses the back/forward browser buttons
 * the UI in the iframe navigates back and forth.
 * 
 * Considerations - UIs might implement browser history management
 * differently.  However they all should support the user clicking
 * back and forward buttons anyway, so directly manipulating browser
 * history should be good enough.
 * 
 * @param airMessageUtils 
 * @param apiClient 
 */
function trackUrlState(
    airMessageUtils: IAirMessageUtils,
    apiClient: LocalAPIClient
) {
    const request: IUrlChangeMessage = airMessageUtils
        .getInternalMessage(INTERNAL_Message_Type.UI_URL_CHANGED) as IUrlChangeMessage
    const href = location.href
    let currentPath = href.substring(
        `${location.protocol}//${location.host}`.length)
    request.newUrl = location.href
    try {
        apiClient.sendMessage(request)
    } catch (e) {
        console.error(e)
    }

    const pushState = history.pushState
    history.pushState = (state, ...args) => {
        if (typeof (history as any).onpushstate == "function") {
            (history as any).onpushstate({ state: state });
        }
        pushState.call(history, state, ...args)

        if (currentPath === args[1]) {
            return
        }
        currentPath = args[1].toString()
        request.newUrl = location.href
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
