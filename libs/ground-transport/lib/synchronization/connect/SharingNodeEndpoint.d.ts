import { BatchedMessagesToTM, MessageFromTM } from "@airport/arrivals-n-departures";
import { ISharingNode } from "@airport/moving-walkway";
export interface ISharingNodeEndpoint {
    communicateWithAGT(sharingNode: ISharingNode, message: MessageFromTM): Promise<BatchedMessagesToTM>;
}
