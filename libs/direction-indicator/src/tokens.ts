import { IAutopilotApiLoader } from "./autopilot/IAutopilotApiLoader";
import { ContainerAccessor } from "./dependencyInjection/ContainerAccessor";
import { lib } from "./dependencyInjection/InjectionApplication";
import { IInterAppAPIClient } from "./dependencyInjection/InterAppAPIClient";
import { IContainerAccessor } from "./dependencyInjection/interfaces/IContainerAccessor";

const directionIndicator = lib('direction-indicator')

export const AUTOPILOT_API_LOADER = directionIndicator.token<IAutopilotApiLoader>('AutopilotApiLoader')
export const CONTAINER_ACCESSOR = directionIndicator.token<IContainerAccessor>(ContainerAccessor)
export const INTER_APP_API_CLIENT = directionIndicator.token<IInterAppAPIClient>('InterAppAPIClient')
