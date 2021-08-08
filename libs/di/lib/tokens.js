import { system } from "./dependencyInjection/System";
const directionIndicator = system('airport').lib('di');
export const AUTOPILOT_API_LOADER = directionIndicator
    .token('IAutopilotApiLoader');
//# sourceMappingURL=tokens.js.map