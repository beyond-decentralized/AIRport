import { TransactionalReceiver } from '@airport/terminal';
import { ITransactionalReceiver } from '@airport/terminal-map';
import { BroadcastChannel as SoftBroadcastChannel } from 'broadcast-channel';
import { Subscription } from 'rxjs';
export declare class WebTransactionalReceiver extends TransactionalReceiver implements ITransactionalReceiver {
    communicationChannel: SoftBroadcastChannel;
    dbName: string;
    domainPrefix: string;
    isNativeBroadcastChannel: boolean;
    mainDomainFragments: string[];
    serverUrl: string;
    subsriptionMap: Map<string, Map<number, Subscription>>;
    pendingHostCounts: Map<string, number>;
    pendingApplicationCounts: Map<string, number>;
    installedApplicationFrames: Set<string>;
    messageCallback: (message: any) => void;
    constructor();
    onMessage(callback: (message: any) => void): void;
    private ensureConnectionIsReady;
    private hasValidApplicationInfo;
    private handleFromClientRequest;
    private getFrameWindow;
    private handleToClientRequest;
    private ensureApplicationIsInstalled;
    private messageIsFromValidApp;
    private handleIsolateMessage;
}
export declare function injectTransactionalReceiver(): void;
//# sourceMappingURL=WebTransactionalReceiver.d.ts.map