import { lib } from "@airport/direction-indicator";
import { DB_APPLICATION_UTILS } from "@airport/ground-control";
import { DATABASE_MANAGER, INTERNAL_RECORD_MANAGER } from "@airport/terminal";
import { APPLICATION_INITIALIZER, DOMAIN_RETRIEVER, TERMINAL_STORE, TRANSACTIONAL_RECEIVER } from "@airport/terminal-map";
import { DomainRetriever } from "./DomainRetriever";
import { WebApplicationInitializer } from "./WebApplicationInitializer";
import { WebMesageReceiver } from "./WebMessageReceiver";
import { WebTransactionalReceiver } from "./WebTransactionalReceiver";
const webTerminal = lib('web-terminal');
DOMAIN_RETRIEVER.setClass(DomainRetriever);
APPLICATION_INITIALIZER.setClass(WebApplicationInitializer);
export const WEB_MESSAGE_RECEIVER = webTerminal.token({
    class: WebMesageReceiver,
    interface: 'IWebMessageReceiver',
    token: 'WEB_MESSAGE_RECEIVER'
});
APPLICATION_INITIALIZER.setDependencies({
    terminalStore: TERMINAL_STORE
});
WEB_MESSAGE_RECEIVER.setDependencies({
    transactionalReceiver: TRANSACTIONAL_RECEIVER
});
TRANSACTIONAL_RECEIVER.setClass(WebTransactionalReceiver);
TRANSACTIONAL_RECEIVER.setDependencies({
    databaseManager: DATABASE_MANAGER,
    dbApplicationUtils: DB_APPLICATION_UTILS,
    internalRecordManager: INTERNAL_RECORD_MANAGER,
    terminalStore: TERMINAL_STORE,
    webMessageReciever: WEB_MESSAGE_RECEIVER
});
//# sourceMappingURL=tokens.js.map