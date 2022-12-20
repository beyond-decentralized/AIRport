import { lib } from "@airport/direction-indicator";
import { CrossTabCommunicator } from "./CrossTabCommunicator";

const vhfRadio = lib('vhf-radio')

vhfRadio.register(CrossTabCommunicator)
