import { IAutopilotApiLoader } from "./autopilot/IAutopilotApiLoader";
import { lib } from "./dependencyInjection/InjectionApplication";

const directionIndicator = lib('di')
directionIndicator.autopilot = false

export const AUTOPILOT_API_LOADER = directionIndicator.token<IAutopilotApiLoader>({
    class: null,
    interface: 'IAutopilotApiLoader',
    token: 'AUTOPILOT_API_LOADER'
})
