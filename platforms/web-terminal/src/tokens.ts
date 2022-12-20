import { LOCAL_API_SERVER } from "@airport/apron";
import { lib } from "@airport/direction-indicator";
import { DB_APPLICATION_UTILS } from "@airport/ground-control";
import { ActorDao } from '@airport/holding-pattern/dist/app/bundle'
import { ApplicationDao } from '@airport/airspace/dist/app/bundle'
import { DatabaseManager, InternalRecordManager } from "@airport/terminal";
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
    actorDao: ActorDao,
    applicationDao: ApplicationDao,
    applicationInitializer: APPLICATION_INITIALIZER,
    databaseManager: DatabaseManager,
    dbApplicationUtils: DB_APPLICATION_UTILS,
    localApiServer: LOCAL_API_SERVER,
    internalRecordManager: InternalRecordManager,
    terminalSessionManager: TERMINAL_SESSION_MANAGER,
    terminalStore: TERMINAL_STORE,
    transactionalServer: TRANSACTIONAL_SERVER,
    webMessageReciever: WEB_MESSAGE_RECEIVER
})
