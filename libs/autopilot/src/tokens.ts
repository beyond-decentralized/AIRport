import { lib } from "@airport/di";
import { ILocalAPIClient } from "./client/LocalAPIClient";
import { IUiStateManager } from "./UiStateManager";

const autopilot = lib('autopilot');

export const LOCAL_API_CLIENT = autopilot
    .token<ILocalAPIClient>('ILocalAPIClient');
export const UI_STATE_MANAGER = autopilot
    .token<IUiStateManager>('IUiStateManager')
