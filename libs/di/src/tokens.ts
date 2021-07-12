import { IAutopilotDaoLoader } from "./autopilot/IAutopilotDaoLoader";
import { system } from "./dependencyInjection/System";

const directionIndicator = system('airport').lib('di');

export const AUTOPILOT_DAO_LOADER = directionIndicator
    .token<IAutopilotDaoLoader>('IAutopilotDaoLoader');
