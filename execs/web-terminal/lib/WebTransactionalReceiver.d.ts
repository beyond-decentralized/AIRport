import { TransactionalReceiver } from '@airport/terminal';
import { ITransactionalReceiver } from '@airport/terminal-map';
import { BroadcastChannel as SoftBroadcastChannel } from '../node_modules/broadcast-channel/dist/lib/index.es5';
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
//# sourceMappingURL=WebTransactionalReceiver.d.ts.map