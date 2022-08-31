import { ILocalAPIRequest, ILocalAPIResponse } from '@airport/aviation-communication';
import { IDbApplicationUtils } from '@airport/ground-control';
import { IApiIMI, IIsolateMessage, IIsolateMessageOut } from '@airport/apron';
import { IApiCallContext, IDatabaseManager, ITerminalSessionManager, ITerminalStore, ITransactionalServer, ITransactionContext, ITransactionCredentials, ITransactionManager, IUserSession } from '@airport/terminal-map';
import { IInternalRecordManager } from '../data/InternalRecordManager';
import { Actor } from '@airport/holding-pattern';
import { ActorDao } from '@airport/holding-pattern/lib/dao/dao';
import { ApplicationDao } from '@airport/airspace';
export declare abstract class TransactionalReceiver {
    actorDao: ActorDao;
    applicationDao: ApplicationDao;
    databaseManager: IDatabaseManager;
    dbApplicationUtils: IDbApplicationUtils;
    internalRecordManager: IInternalRecordManager;
    terminalSessionManager: ITerminalSessionManager;
    terminalStore: ITerminalStore;
    transactionManager: ITransactionManager;
    transactionalServer: ITransactionalServer;
    processMessage<ReturnType extends IIsolateMessageOut<any>>(message: IIsolateMessage & IApiIMI): Promise<ReturnType>;
    private doProcessMessage;
    protected abstract nativeStartApiCall(message: ILocalAPIRequest<'FromClientRedirected'>, context: IApiCallContext): Promise<boolean>;
    protected abstract nativeHandleApiCall(message: ILocalAPIRequest<'FromClientRedirected'>, context: IApiCallContext): Promise<ILocalAPIResponse>;
    protected startApiCall(message: ILocalAPIRequest<'FromClientRedirected'>, context: IApiCallContext & ITransactionContext, nativeHandleCallback: () => void): Promise<boolean>;
    getApiCallActor(message: ILocalAPIRequest<'FromClientRedirected'>, userSession: IUserSession, context: IApiCallContext & ITransactionContext): Promise<Actor>;
    protected endApiCall(credentials: ITransactionCredentials, errorMessage: string, context: IApiCallContext): Promise<boolean>;
}
//# sourceMappingURL=TransactionalReceiver.d.ts.map