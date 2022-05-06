import { IAutopilotApiLoader } from "./autopilot/IAutopilotApiLoader";
import { lib } from "./dependencyInjection/InjectionApplication";

const directionIndicator = lib('direction-indicator')

export const AUTOPILOT_API_LOADER = directionIndicator.token<IAutopilotApiLoader>({
    class: null,
    interface: 'IAutopilotApiLoader',
    token: 'AUTOPILOT_API_LOADER'
})
