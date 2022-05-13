import { ILocalAPIRequest, ILocalAPIResponse } from '@airport/aviation-communication';
import { IDbApplicationUtils } from '@airport/ground-control';
import { IApiIMI, IIsolateMessage, IIsolateMessageOut } from '@airport/apron';
import { IApiCallContext, IDatabaseManager, ITerminalStore, ITransactionalServer, ITransactionContext, ITransactionCredentials, ITransactionManager } from '@airport/terminal-map';
import { IInternalRecordManager } from '../data/InternalRecordManager';
export declare abstract class TransactionalReceiver {
    databaseManager: IDatabaseManager;
    dbApplicationUtils: IDbApplicationUtils;
    internalRecordManager: IInternalRecordManager;
    terminalStore: ITerminalStore;
    transactionManager: ITransactionManager;
    transactionalServer: ITransactionalServer;
    processMessage<ReturnType extends IIsolateMessageOut<any>>(message: IIsolateMessage & IApiIMI): Promise<ReturnType>;
    private doProcessMessage;
    protected abstract nativeStartApiCall(message: ILocalAPIRequest<'FromClientRedirected'>, context: IApiCallContext): Promise<boolean>;
    protected abstract nativeHandleApiCall(message: ILocalAPIRequest<'FromClientRedirected'>, context: IApiCallContext): Promise<ILocalAPIResponse>;
    protected startApiCall(message: ILocalAPIRequest<'FromClientRedirected'>, context: IApiCallContext & ITransactionContext, nativeHandleCallback: () => void): Promise<boolean>;
    protected endApiCall(credentials: ITransactionCredentials, errorMessage: string, context: IApiCallContext): Promise<boolean>;
}
//# sourceMappingURL=TransactionalReceiver.d.ts.map