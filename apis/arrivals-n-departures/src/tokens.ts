import { lib } from "@airport/direction-indicator";
import { RequestManager } from "./RequestManager";

export const arrivalsNDepartures = lib('arrivals-n-departures')

export const REQUEST_MANAGER = arrivalsNDepartures.token<RequestManager>({
    class: null,
    interface: 'RequestManager',
    token: 'REQUEST_MANAGER'
})