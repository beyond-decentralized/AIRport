import { system } from "@airport/di";
import { ILocalAPIClient } from "./client/LocalAPIClient";

const autopilot = system('airport').lib('autopilot');

export const LOCAL_API_CLIENT = autopilot
    .token<ILocalAPIClient>('ILocalAPIClient');
