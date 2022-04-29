import { ILocalAPIResponse } from "@airport/aviation-communication";
import { ITerminalStore, ITransactionalReceiver } from "@airport/terminal-map";
import { BroadcastChannel as SoftBroadcastChannel } from '../node_modules/broadcast-channel/dist/lib/index.es5';
export interface IWebMessageReceiver {
    needMessageSerialization(): boolean;
    sendMessageToClient(message: ILocalAPIResponse): void;
    sendMessageToApp(): void;
}
export declare class WebMesageReceiver implements IWebMessageReceiver {
    terminalStore: ITerminalStore;
    transactionalReceiver: ITransactionalReceiver;
    communicationChannel: SoftBroadcastChannel;
    isNativeBroadcastChannel: boolean;
    constructor();
    needMessageSerialization(): boolean;
    sendMessageToClient(message: ILocalAPIResponse): void;
    sendMessageToApp(): void;
}
export declare function injectWebReceiver(): void;
//# sourceMappingURL=WebMessageReceiver.d.ts.map