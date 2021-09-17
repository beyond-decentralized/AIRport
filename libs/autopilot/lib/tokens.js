import { lib } from "@airport/di";
const autopilot = lib('autopilot');
export const LOCAL_API_CLIENT = autopilot
    .token('ILocalAPIClient');
export const UI_STATE_MANAGER = autopilot
    .token('IUiStateManager');
//# sourceMappingURL=tokens.js.map