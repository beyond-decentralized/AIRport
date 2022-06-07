import { lib } from "@airport/direction-indicator";
import { AirEntityUtils } from "./AirEntityUuId";
const aviationCommunication = lib('aviation-communication');
export const AIR_ENTITY_UTILS = aviationCommunication.token({
    class: AirEntityUtils,
    interface: 'IAirEntityUtils',
    token: 'AIR_ENTITY_UTILS'
});
//# sourceMappingURL=tokens.js.map