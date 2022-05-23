import { AUTOPILOT_API_LOADER, INTER_APP_API_CLIENT, lib } from "@airport/direction-indicator";
import { OPERATION_SERIALIZER, QUERY_RESULTS_DESERIALIZER } from "@airport/pressurization";
import { AutopilotApiLoader } from "./api/AutopilotApiLoader";
import { LocalAPIClient } from "./LocalAPIClient";
import { UiStateManager } from "./UiStateManager";
const autopilot = lib('autopilot');
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
AUTOPILOT_API_LOADER.setClass(AutopilotApiLoader);
AUTOPILOT_API_LOADER.setDependencies({
    interAppApiClient: INTER_APP_API_CLIENT,
    localApiClient: LOCAL_API_CLIENT
});
//# sourceMappingURL=tokens.js.map