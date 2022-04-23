import { lib } from "@airport/direction-indicator";
import { IWebMessageReceiver } from "./WebMessageReceiver";

const webTerminal = lib('web-terminal')

export const WEB_MESSAGE_RECEIVER = webTerminal.token<IWebMessageReceiver>('WEB_MESSAGE_RECEIVER')