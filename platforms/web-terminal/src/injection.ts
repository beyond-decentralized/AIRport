import { LOCAL_API_SERVER } from "@airport/apron";
import { lib } from "@airport/direction-indicator";
import { ActorDao } from '@airport/holding-pattern/dist/app/bundle'
import { ApplicationDao } from '@airport/airspace/dist/app/bundle'
import { DatabaseManager, InternalRecordManager } from "@airport/terminal";
import { APPLICATION_INITIALIZER, DOMAIN_RETRIEVER, TerminalStore, TERMINAL_SESSION_MANAGER, TRANSACTIONAL_RECEIVER, TRANSACTIONAL_SERVER } from "@airport/terminal-map";
import { DomainRetriever } from "./DomainRetriever";
import { WebApplicationInitializer } from "./WebApplicationInitializer";
import { WebMessageReceiver } from "./WebMessageReceiver";
import { WebTransactionalReceiver } from "./WebTransactionalReceiver";
import { DbApplicationUtils } from "@airport/ground-control";

const webTerminal = lib('web-terminal')

webTerminal.register(WebMessageReceiver)

DOMAIN_RETRIEVER.setClass(DomainRetriever)
APPLICATION_INITIALIZER.setClass(WebApplicationInitializer)
APPLICATION_INITIALIZER.setDependencies({
    terminalStore: TerminalStore
})
webTerminal.setDependencies(WebMessageReceiver, {
    transactionalReceiver: TRANSACTIONAL_RECEIVER
})
TRANSACTIONAL_RECEIVER.setClass(WebTransactionalReceiver)
TRANSACTIONAL_RECEIVER.setDependencies({
    actorDao: ActorDao,
    applicationDao: ApplicationDao,
    applicationInitializer: APPLICATION_INITIALIZER,
    databaseManager: DatabaseManager,
    dbApplicationUtils: DbApplicationUtils,
    localApiServer: LOCAL_API_SERVER,
    internalRecordManager: InternalRecordManager,
    terminalSessionManager: TERMINAL_SESSION_MANAGER,
    terminalStore: TerminalStore,
    transactionalServer: TRANSACTIONAL_SERVER,
    webMessageReceiver: WebMessageReceiver
})