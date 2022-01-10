import { lib } from "@airport/di";
import { ILocalAPIClient } from "./LocalAPIClient";

const autopilot = lib('vhf-radio');

export const LOCAL_API_CLIENT = autopilot.token<ILocalAPIClient>('LOCAL_API_CLIENT')
