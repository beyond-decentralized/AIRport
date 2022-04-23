import { lib } from "@airport/direction-indicator";
import { ICrossTabCommunicator } from "./CrossTabCommunicator";

const vhfRadio = lib('vhf-radio');

export const CROSS_TAB_COMMUNCATOR = vhfRadio.token<ICrossTabCommunicator>('CROSS_TAB_COMMUNCATOR')
