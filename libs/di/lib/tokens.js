import { lib } from "./dependencyInjection/InjectionApplication";
const directionIndicator = lib('di');
export const AUTOPILOT_API_LOADER = directionIndicator.token({
    class: null,
    interface: 'IAutopilotApiLoader',
    token: 'AUTOPILOT_API_LOADER'
});
//# sourceMappingURL=tokens.js.map