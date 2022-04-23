import { lib } from "@airport/direction-indicator";
import { ILocalAPIClient } from "./LocalAPIClient";
import { IUiStateManager } from "./UiStateManager";

const autopilot = lib('autopilot');

export const LOCAL_API_CLIENT = autopilot.token<ILocalAPIClient>('LOCAL_API_CLIENT')
export const UI_STATE_MANAGER = autopilot.token<IUiStateManager>('UI_STATE_MANAGER')
