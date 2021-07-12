import { system } from "@airport/di";
import { ILocalAPIClient } from "./client/LocalAPIClient";
import { IUpdateCacheManager } from "./update/UpdateCacheManager";

const autopilot = system('airport').lib('autopilot');

export const LOCAL_API_CLIENT = autopilot
    .token<ILocalAPIClient>('ILocalAPIClient');
export const UPDATE_CACHE_MANAGER = autopilot
    .token<IUpdateCacheManager>('IUpdateCacheManager');
