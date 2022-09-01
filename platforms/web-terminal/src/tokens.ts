import { LOCAL_API_SERVER } from "@airport/apron";
import { lib } from "@airport/direction-indicator";
import { DB_APPLICATION_UTILS } from "@airport/ground-control";
import { ACTOR_DAO } from '@airport/holding-pattern/lib/to_be_generated/runtime-index'
import { APPLICATION_DAO } from '@airport/airspace/lib/to_be_generated/runtime-index'
import { DATABASE_MANAGER, INTERNAL_RECORD_MANAGER } from "@airport/terminal";
import { APPLICATION_INITIALIZER, DOMAIN_RETRIEVER, TERMINAL_SESSION_MANAGER, TERMINAL_STORE, TRANSACTIONAL_RECEIVER, TRANSACTIONAL_SERVER } from "@airport/terminal-map";
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
APPLICATION_INITIALIZER.setDependencies({
    terminalStore: TERMINAL_STORE
})
WEB_MESSAGE_RECEIVER.setDependencies({
    transactionalReceiver: TRANSACTIONAL_RECEIVER
})
TRANSACTIONAL_RECEIVER.setClass(WebTransactionalReceiver)
TRANSACTIONAL_RECEIVER.setDependencies({
    actorDao: ACTOR_DAO,
    applicationDao: APPLICATION_DAO,
    applicationInitializer: APPLICATION_INITIALIZER,
    databaseManager: DATABASE_MANAGER,
    dbApplicationUtils: DB_APPLICATION_UTILS,
    localApiServer: LOCAL_API_SERVER,
    internalRecordManager: INTERNAL_RECORD_MANAGER,
    terminalSessionManager: TERMINAL_SESSION_MANAGER,
    terminalStore: TERMINAL_STORE,
    transactionalServer: TRANSACTIONAL_SERVER,
    webMessageReciever: WEB_MESSAGE_RECEIVER
})
