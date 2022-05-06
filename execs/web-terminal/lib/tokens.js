import { DEPENDENCY_INJECTION, lib } from "@airport/direction-indicator";
import { APPLICATION_INITIALIZER, DOMAIN_RETRIEVER, TERMINAL_STORE, TRANSACTIONAL_RECEIVER } from "@airport/terminal-map";
import { DomainRetriever } from "./DomainRetriever";
import { WebApplicationInitializer } from "./WebApplicationInitializer";
import { WebMesageReceiver } from "./WebMessageReceiver";
import { WebTransactionalReceiver } from "./WebTransactionalReceiver";
const webTerminal = lib('web-terminal');
DEPENDENCY_INJECTION.set(DOMAIN_RETRIEVER, DomainRetriever);
DEPENDENCY_INJECTION.set(APPLICATION_INITIALIZER, WebApplicationInitializer);
export const WEB_MESSAGE_RECEIVER = webTerminal.token({
    class: WebMesageReceiver,
    interface: 'IWebMessageReceiver',
    token: 'WEB_MESSAGE_RECEIVER'
});
WEB_MESSAGE_RECEIVER.setDependencies({
    transactionalReceiver: TRANSACTIONAL_RECEIVER
});
DEPENDENCY_INJECTION.set(TRANSACTIONAL_RECEIVER, WebTransactionalReceiver);
TRANSACTIONAL_RECEIVER.setDependencies({
    terminalStore: TERMINAL_STORE,
    webMessageReciever: WEB_MESSAGE_RECEIVER
});
//# sourceMappingURL=tokens.js.map