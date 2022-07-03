import { lib } from "@airport/direction-indicator"
import { IAirEntityUtils, AirEntityUtils } from "./AirEntityUtils"

const aviationCommunication = lib('aviation-communication')

export const AIR_ENTITY_UTILS = aviationCommunication.token<IAirEntityUtils>({
    class: AirEntityUtils,
    interface: 'IAirEntityUtils',
    token: 'AIR_ENTITY_UTILS'
})