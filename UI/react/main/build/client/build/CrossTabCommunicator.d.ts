import { BroadcastChannel as SoftBroadcastChannel } from '../node_modules/broadcast-channel/dist/lib/index.es5';
export interface ICrossTabCommunicator {
}
export declare class CrossTabCommunicator implements ICrossTabCommunicator {
    demoListenerStarted: boolean;
    clientHost: string;
    clientProtocol: string;
    isNativeBroadcastChannel: boolean;
    communicationChannel: SoftBroadcastChannel;
    pendingMessageIdSet: Set<string>;
    constructor();
}
//# sourceMappingURL=CrossTabCommunicator.d.ts.map