import { lib } from "@airport/direction-indicator";
import { IRequestManager } from "./RequestManager";

export const arrivalsNDepartures = lib('arrivals-n-departures')

export const REQUEST_MANAGER = arrivalsNDepartures.token<IRequestManager>({
    class: null,
    interface: 'IRequestManager',
    token: 'REQUEST_MANAGER'
})