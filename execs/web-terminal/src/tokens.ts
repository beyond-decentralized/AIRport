import { lib } from "@airport/direction-indicator";
import { APPLICATION_INITIALIZER, DOMAIN_RETRIEVER, TERMINAL_STORE, TRANSACTIONAL_RECEIVER } from "@airport/terminal-map";
import { DomainRetriever } from "./DomainRetriever";
import { WebApplicationInitializer } from "./WebApplicationInitializer";
import { IWebMessageReceiver, WebMesageReceiver } from "./WebMessageReceiver";
import { WebTransactionalReceiver } from "./WebTransactionalReceiver";

const webTerminal = lib('web-terminal')

DOMAIN_RETRIEVER.setClass(DomainRetriever)
APPLICATION_INITIALIZER.setClass(WebApplicationInitializer)
export const WEB_MESSAGE_RECEIVER = webTerminal.token<IWebMessageReceiver>({
    class: WebMesageReceiver,
    interface: 'IWebMessageReceiver',
    token: 'WEB_MESSAGE_RECEIVER'
})
WEB_MESSAGE_RECEIVER.setDependencies({
    transactionalReceiver: TRANSACTIONAL_RECEIVER
})
TRANSACTIONAL_RECEIVER.setClass(WebTransactionalReceiver)
TRANSACTIONAL_RECEIVER.setDependencies({
    terminalStore: TERMINAL_STORE,
    webMessageReciever: WEB_MESSAGE_RECEIVER
})
