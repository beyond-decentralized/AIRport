import { IAutopilotApiLoader } from "./autopilot/IAutopilotApiLoader";
import { ContainerAccessor } from "./dependencyInjection/ContainerAccessor";
import { lib } from "./dependencyInjection/InjectionApplication";
import { IInterAppAPIClient } from "./dependencyInjection/InterAppAPIClient";
import { IContainerAccessor } from "./dependencyInjection/interfaces/IContainerAccessor";

const directionIndicator = lib('direction-indicator')

export const AUTOPILOT_API_LOADER = directionIndicator.token<IAutopilotApiLoader>({
    class: null,
    interface: 'IAutopilotApiLoader',
    token: 'AUTOPILOT_API_LOADER'
})
export const CONTAINER_ACCESSOR = directionIndicator.token<IContainerAccessor>({
    class: ContainerAccessor,
    interface: 'IContainerAccessor',
    token: 'CONTAINER_ACCESSOR'
})
export const INTER_APP_API_CLIENT = directionIndicator.token<IInterAppAPIClient>({
    class: null,
    interface: 'IInterAppAPIClient',
    token: 'INTER_APP_API_CLIENT'
})
