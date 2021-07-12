import { system } from "./dependencyInjection/System";
const directionIndicator = system('airport').lib('di');
export const AUTOPILOT_DAO_LOADER = directionIndicator
    .token('IAutopilotDaoLoader');
//# sourceMappingURL=tokens.js.map