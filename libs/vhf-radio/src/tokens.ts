import { lib } from "@airport/direction-indicator";
import { CrossTabCommunicator, ICrossTabCommunicator } from "./CrossTabCommunicator";

const vhfRadio = lib('vhf-radio')

export const CROSS_TAB_COMMUNCATOR = vhfRadio.token<ICrossTabCommunicator>({
    class: CrossTabCommunicator,
    interface: 'ICrossTabCommunicator',
    token: 'CROSS_TAB_COMMUNCATOR'
})
