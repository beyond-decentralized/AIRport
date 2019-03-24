import { ISyncConnectionServer, MessageFromTM, MessageToTM } from "@airport/arrivals-n-departures";
import { ISharingNode } from "@airport/moving-walkway";
import { ISharingNodeEndpoint } from "../SharingNodeEndpoint";
/**
 * P2P endpoint to a built-in AGT
 */
export declare class DirectSharingNodeEndpoint implements ISharingNodeEndpoint {
    recentConnectionServer: ISyncConnectionServer<MessageFromTM, any, any, any>;
    constructor();
    communicateWithAGT(sharingNode: ISharingNode, message: MessageFromTM): Promise<MessageToTM[]>;
}
