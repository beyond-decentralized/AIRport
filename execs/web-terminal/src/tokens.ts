import { lib } from "@airport/direction-indicator";
import { TRANSACTIONAL_RECEIVER } from "@airport/terminal-map";
import { IWebMessageReceiver } from "./WebMessageReceiver";

const webTerminal = lib('web-terminal')

export const WEB_MESSAGE_RECEIVER = webTerminal.token<IWebMessageReceiver>('WEB_MESSAGE_RECEIVER')

WEB_MESSAGE_RECEIVER.setDependencies({
    transactionalReceiver: TRANSACTIONAL_RECEIVER
})