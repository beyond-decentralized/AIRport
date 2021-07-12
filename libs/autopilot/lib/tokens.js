import { system } from "@airport/di";
const autopilot = system('airport').lib('autopilot');
export const LOCAL_API_CLIENT = autopilot
    .token('ILocalAPIClient');
export const UPDATE_CACHE_MANAGER = autopilot
    .token('IUpdateCacheManager');
//# sourceMappingURL=tokens.js.map