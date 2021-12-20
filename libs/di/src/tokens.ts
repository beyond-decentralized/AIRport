import { IAutopilotApiLoader } from "./autopilot/IAutopilotApiLoader";
import { lib } from "./dependencyInjection/InjectionApplication";

const directionIndicator = lib('di');

export const AUTOPILOT_API_LOADER = directionIndicator.token<IAutopilotApiLoader>('AUTOPILOT_API_LOADER');
