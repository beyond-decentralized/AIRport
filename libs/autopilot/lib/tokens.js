import { system } from "@airport/di";
const autopilot = system('airport').lib('autopilot');
export const LOCAL_API_CLIENT = autopilot
    .token('ILocalAPIClient');
//# sourceMappingURL=tokens.js.map