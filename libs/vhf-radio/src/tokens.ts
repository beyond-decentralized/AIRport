import { lib } from "@airport/di";
import { ICrossTabCommunicator } from "./CrossTabCommunicator";

const vhfRadio = lib('vhf-radio');

export const CROSS_TAB_COMMUNCATOR = vhfRadio.token<ICrossTabCommunicator>('CROSS_TAB_COMMUNCATOR')
