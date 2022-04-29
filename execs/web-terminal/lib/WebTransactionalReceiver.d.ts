import { ILocalAPIRequest, ILocalAPIResponse } from '@airport/aviation-communication';
import { IApiIMI, IIsolateMessage } from '@airport/security-check';
import { TransactionalReceiver } from '@airport/terminal';
import { ITransactionalReceiver, IApiCallContext, ITransactionContext, ITerminalStore } from '@airport/terminal-map';
import { IWebApplicationInitializer } from './WebApplicationInitializer';
import { IWebMessageReceiver } from './WebMessageReceiver';
export declare class WebTransactionalReceiver extends TransactionalReceiver implements ITransactionalReceiver {
    applicationInitializer: IWebApplicationInitializer;
    terminalStore: ITerminalStore;
    webMessageReciever: IWebMessageReceiver;
    constructor();
    handleClientRequest(message: ILocalAPIRequest): void;
    handleAppRequest(message: (IIsolateMessage & IApiIMI) | ILocalAPIResponse, messageOrigin: string, source: any): void;
    onMessage(callback: (message: any) => void): void;
    protected nativeStartApiCall(message: ILocalAPIRequest<'FromClientRedirected'>, context: IApiCallContext & ITransactionContext): Promise<boolean>;
    protected nativeHandleApiCall<Result>(message: ILocalAPIRequest<'FromClientRedirected'>, context: IApiCallContext & ITransactionContext): Promise<Result>;
    private ensureConnectionIsReady;
    private hasValidApplicationInfo;
    private handleFromClientRequest;
    private relyToClientWithError;
    private getFrameWindow;
    private handleToClientRequest;
    private replyToClientRequest;
    private ensureApplicationIsInstalled;
    private messageIsFromValidApp;
    private handleIsolateMessage;
}
//# sourceMappingURL=WebTransactionalReceiver.d.ts.map