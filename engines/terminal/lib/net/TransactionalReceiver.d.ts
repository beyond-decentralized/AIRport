import { ILocalAPIRequest } from '@airport/aviation-communication';
import { IApiIMI, IIsolateMessage, IIsolateMessageOut } from '@airport/apron';
import { IApiCallContext, IDatabaseManager, ITerminalStore, ITransactionalServer, ITransactionContext, ITransactionCredentials } from '@airport/terminal-map';
import { IInternalRecordManager } from '../data/InternalRecordManager';
export declare abstract class TransactionalReceiver {
    databaseManager: IDatabaseManager;
    internalRecordManager: IInternalRecordManager;
    terminalStore: ITerminalStore;
    transactionalServer: ITransactionalServer;
    processMessage<ReturnType extends IIsolateMessageOut<any>>(message: IIsolateMessage & IApiIMI): Promise<ReturnType>;
    protected abstract nativeStartApiCall(message: ILocalAPIRequest<'FromClientRedirected'>, context: IApiCallContext): Promise<boolean>;
    protected abstract nativeHandleApiCall<Result>(message: ILocalAPIRequest<'FromClientRedirected'>, context: IApiCallContext): Promise<Result>;
    protected startApiCall(message: ILocalAPIRequest<'FromClientRedirected'>, context: IApiCallContext & ITransactionContext, nativeHandleCallback: () => void): Promise<boolean>;
    protected endApiCall(credentials: ITransactionCredentials, errorMessage: string, context: IApiCallContext): Promise<boolean>;
}
//# sourceMappingURL=TransactionalReceiver.d.ts.map