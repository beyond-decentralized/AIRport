import { ILocalAPIRequest } from '@airport/aviation-communication';
import { IApiIMI, IIsolateMessage, IIsolateMessageOut } from '@airport/security-check';
import { IApiCallContext, ICredentials, ITransactionContext } from '@airport/terminal-map';
export declare abstract class TransactionalReceiver {
    initializingApps: Set<string>;
    processMessage<ReturnType extends IIsolateMessageOut<any>>(message: IIsolateMessage & IApiIMI): Promise<ReturnType>;
    protected abstract nativeStartApiCall(message: ILocalAPIRequest<'FromClientRedirected'>, context: IApiCallContext): Promise<boolean>;
    protected abstract nativeHandleApiCall<Result>(message: ILocalAPIRequest<'FromClientRedirected'>, context: IApiCallContext): Promise<Result>;
    protected startApiCall(message: ILocalAPIRequest<'FromClientRedirected'>, context: IApiCallContext & ITransactionContext, nativeHandleCallback: () => void): Promise<boolean>;
    protected endApiCall(credentials: ICredentials, errorMessage: string, context: IApiCallContext): Promise<boolean>;
    protected handleApiCall(message: ILocalAPIRequest<'FromClientRedirected'>, context: IApiCallContext, nativeHandleCallback: () => void): Promise<boolean>;
}
//# sourceMappingURL=TransactionalReceiver.d.ts.map