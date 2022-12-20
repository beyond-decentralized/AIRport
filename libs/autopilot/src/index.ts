
import { loadUiPressurisation } from '@airport/pressurization'
import { AutopilotApiLoader } from './api/AutopilotApiLoader'
import { LocalAPIClient } from './LocalAPIClient'
import { UiStateManager } from './UiStateManager'

export * from './LocalAPIClient'
export * from './api/AutopilotApiLoader'
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
    const autopilotApiLoader = new AutopilotApiLoader()
    const apiClient = new LocalAPIClient()
    autopilotApiLoader.apiClient = apiClient

    const {
        operationSerializer,
        queryResultsDeserializer
    } = loadUiPressurisation();
    apiClient.operationSerializer = operationSerializer
    apiClient.queryResultsDeserializer = queryResultsDeserializer

    globalThis.IOC = {
        getAutopilotApiLoader() {
            return autopilotApiLoader
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
