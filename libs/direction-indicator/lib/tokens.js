import { ContainerAccessor } from "./dependencyInjection/ContainerAccessor";
import { lib } from "./dependencyInjection/InjectionApplication";
const directionIndicator = lib('direction-indicator');
export const AUTOPILOT_API_LOADER = directionIndicator.token({
    class: null,
    interface: 'IAutopilotApiLoader',
    token: 'AUTOPILOT_API_LOADER'
});
export const CONTAINER_ACCESSOR = directionIndicator.token({
    class: ContainerAccessor,
    interface: 'IContainerAccessor',
    token: 'CONTAINER_ACCESSOR'
});
export const INTER_APP_API_CLIENT = directionIndicator.token({
    class: null,
    interface: 'IInterAppAPIClient',
    token: 'INTER_APP_API_CLIENT'
});
//# sourceMappingURL=tokens.js.map