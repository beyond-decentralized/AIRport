import { IAutopilotApiLoader } from "./autopilot/IAutopilotApiLoader";
import { lib } from "./dependencyInjection/Library";

const directionIndicator = lib('di');

export const AUTOPILOT_API_LOADER = directionIndicator
    .token<IAutopilotApiLoader>('IAutopilotApiLoader');
