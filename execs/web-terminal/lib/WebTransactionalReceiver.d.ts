import { ILocalAPIRequest } from '@airport/aviation-communication';
import { TransactionalReceiver } from '@airport/terminal';
import { ITransactionalReceiver, IApiCallContext, ITransactionContext } from '@airport/terminal-map';
import { BroadcastChannel as SoftBroadcastChannel } from '../node_modules/broadcast-channel/dist/lib/index.es5';
import { Subscription } from 'rxjs';
export interface IMessageInRecord {
    message: ILocalAPIRequest<'FromClientRedirected'>;
    reject: any;
    resolve: any;
}
export declare class WebTransactionalReceiver extends TransactionalReceiver implements ITransactionalReceiver {
    communicationChannel: SoftBroadcastChannel;
    dbName: string;
    domainPrefix: string;
    isNativeBroadcastChannel: boolean;
    mainDomainFragments: string[];
    pendingApplicationCounts: Map<string, number>;
    pendingHostCounts: Map<string, number>;
    pendingInterAppApiCallMessageMap: Map<string, IMessageInRecord>;
    serverUrl: string;
    subsriptionMap: Map<string, Map<string, Subscription>>;
    messageCallback: (message: any) => void;
    constructor();
    onMessage(callback: (message: any) => void): void;
    private ensureConnectionIsReady;
    private hasValidApplicationInfo;
    private handleFromClientRequest;
    protected nativeStartApiCall(message: ILocalAPIRequest<'FromClientRedirected'>, context: IApiCallContext & ITransactionContext): Promise<boolean>;
    protected nativeHandleApiCall<Result>(message: ILocalAPIRequest<'FromClientRedirected'>, context: IApiCallContext & ITransactionContext): Promise<Result>;
    private relyToClientWithError;
    private getFrameWindow;
    private handleToClientRequest;
    private replyToClientRequest;
    private ensureApplicationIsInstalled;
    private messageIsFromValidApp;
    private handleIsolateMessage;
}
//# sourceMappingURL=WebTransactionalReceiver.d.ts.map