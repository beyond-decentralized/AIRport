import { ILocalAPIRequest, ILocalAPIResponse } from '@airport/aviation-communication';
import { IApiIMI, IIsolateMessage, ILocalAPIServer } from '@airport/apron';
import { TransactionalReceiver } from '@airport/terminal';
import { ITransactionalReceiver, IApiCallContext, ITransactionContext, ITerminalStore } from '@airport/terminal-map';
import { IWebApplicationInitializer } from './WebApplicationInitializer';
import { IWebMessageReceiver } from './WebMessageReceiver';
import { IDbApplicationUtils } from '@airport/ground-control';
export declare class WebTransactionalReceiver extends TransactionalReceiver implements ITransactionalReceiver {
    applicationInitializer: IWebApplicationInitializer;
    dbApplicationUtils: IDbApplicationUtils;
    localApiServer: ILocalAPIServer;
    terminalStore: ITerminalStore;
    webMessageReciever: IWebMessageReceiver;
    init(): void;
    handleClientRequest(message: ILocalAPIRequest): void;
    handleAppRequest(message: (IIsolateMessage & IApiIMI) | ILocalAPIResponse, messageOrigin: string, source: any): void;
    onMessage(callback: (message: any) => void): void;
    protected nativeStartApiCall(message: ILocalAPIRequest<'FromClientRedirected'>, context: IApiCallContext & ITransactionContext): Promise<{
        isFramework?: boolean;
        isStarted: boolean;
    }>;
    protected nativeHandleApiCall(message: ILocalAPIRequest<'FromClientRedirected'>, context: IApiCallContext & ITransactionContext): Promise<ILocalAPIResponse>;
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