import { IAutopilotApiLoader } from "./autopilot/IAutopilotApiLoader";
import { ContainerAccessor } from "./dependencyInjection/ContainerAccessor";
import { lib } from "./dependencyInjection/InjectionApplication";
import { IInterAppAPIClient } from "./dependencyInjection/InterAppAPIClient";
import { IContainerAccessor } from "./dependencyInjection/interfaces/IContainerAccessor";

const directionIndicator = lib('direction-indicator')
export const CONTAINER_ACCESSOR = directionIndicator.token<IContainerAccessor>(ContainerAccessor)

export const AIR_ENTITY_UTILS = lib('aviation-communication').token('AirEntityUtils')
globalThis.AIR_ENTITY_UTILS = AIR_ENTITY_UTILS

const pressurization = lib('pressurization')
globalThis.OPERATION_SERIALIZER = pressurization.token('OperationSerializer')
export const QUERY_RESULTS_DESERIALIZER = pressurization.token('QueryResultsDeserializer')
globalThis.QUERY_RESULTS_DESERIALIZER = QUERY_RESULTS_DESERIALIZER
globalThis.SERIALIZATION_STATE_MANAGER = pressurization.token('SerializationStateManager')

const autopilot = lib('autopilot')
export const AUTOPILOT_API_LOADER = autopilot.token<IAutopilotApiLoader>('AutopilotApiLoader')
globalThis.AUTOPILOT_API_LOADER = AUTOPILOT_API_LOADER
export const API_CLIENT = autopilot.token<IInterAppAPIClient>('InterAppAPIClient')
globalThis.API_CLIENT = API_CLIENT