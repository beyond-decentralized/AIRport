import { BroadcastChannel as SoftBroadcastChannel } from 'broadcast-channel';
export interface ICrossTabCommunicator {
}
export declare class CrossTabCommunicator implements ICrossTabCommunicator {
    demoListenerStarted: boolean;
    clientHost: string;
    isNativeBroadcastChannel: boolean;
    communicationChannel: SoftBroadcastChannel;
    constructor();
}
//# sourceMappingURL=CrossTabCommunicator.d.ts.map