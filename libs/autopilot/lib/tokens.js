import { AUTOPILOT_API_LOADER, DEPENDENCY_INJECTION, lib } from "@airport/direction-indicator";
import { OPERATION_SERIALIZER, QUERY_RESULTS_DESERIALIZER } from "@airport/pressurization";
import { AutopilotApiLoader } from "./api/AutopilotApiLoader";
import { LocalAPIClient } from "./LocalAPIClient";
import { UiStateManager } from "./UiStateManager";
const autopilot = lib('autopilot');
autopilot.autopilot = false;
export const LOCAL_API_CLIENT = autopilot.token({
    class: LocalAPIClient,
    interface: 'ILocalAPIClient',
    token: 'LOCAL_API_CLIENT'
});
export const UI_STATE_MANAGER = autopilot.token({
    class: UiStateManager,
    interface: 'IUiStateManager',
    token: 'UI_STATE_MANAGER'
});
LOCAL_API_CLIENT.setDependencies({
    operationSerializer: OPERATION_SERIALIZER,
    queryResultsDeserializer: QUERY_RESULTS_DESERIALIZER
});
DEPENDENCY_INJECTION.set(AUTOPILOT_API_LOADER, AutopilotApiLoader);
AUTOPILOT_API_LOADER.setDependencies({
    localApiClient: LOCAL_API_CLIENT
});
//# sourceMappingURL=tokens.js.map