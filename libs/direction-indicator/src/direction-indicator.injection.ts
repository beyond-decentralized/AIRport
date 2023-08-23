import { IAutopilotApiLoader } from "./autopilot/IAutopilotApiLoader";
import { ContainerAccessor } from "./dependencyInjection/ContainerAccessor";
import { lib } from "./dependencyInjection/InjectionApplication";
import { IApiClient } from "./dependencyInjection/InterAppAPIClient";

const directionIndicator = lib('direction-indicator')
directionIndicator.register(ContainerAccessor)

const aviationCommunication = lib('aviation-communication')
export const AIR_ENTITY_UTILS = aviationCommunication.token('AirEntityUtils')
globalThis.AIR_ENTITY_UTILS = AIR_ENTITY_UTILS
export const AIR_MESSAGE_UTILS = aviationCommunication.token('AirMessageUtils')
globalThis.AIR_MESSAGE_UTILS = AIR_MESSAGE_UTILS

const pressurization = lib('pressurization')
globalThis.OPERATION_SERIALIZER = pressurization.token('OperationSerializer')
export const QUERY_RESULTS_DESERIALIZER = pressurization.token('QueryResultsDeserializer')
globalThis.QUERY_RESULTS_DESERIALIZER = QUERY_RESULTS_DESERIALIZER
globalThis.SERIALIZATION_STATE_MANAGER = pressurization.token('SerializationStateManager')

const autopilot = lib('autopilot')
export const AUTOPILOT_API_LOADER = autopilot.token<IAutopilotApiLoader>('AutopilotApiLoader')
globalThis.AUTOPILOT_API_LOADER = AUTOPILOT_API_LOADER
export const API_CLIENT = autopilot.token<IApiClient>('InterAppAPIClient')
globalThis.API_CLIENT = API_CLIENT