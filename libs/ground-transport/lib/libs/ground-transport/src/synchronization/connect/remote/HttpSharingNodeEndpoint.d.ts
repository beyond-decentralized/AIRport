import { BatchedMessagesToTM, IMessageFromTMSerializer, IMessageToTMDeserializer, IMessageToTMVerifier, MessageFromTM } from "@airport/arrivals-n-departures";
import { ISharingNode } from "@airport/moving-walkway";
import { ISharingNodeEndpoint } from "../SharingNodeEndpoint";
/**
 * P2P endpoint to a built-in AGT
 */
export declare class HttpSharingNodeEndpoint implements ISharingNodeEndpoint {
    private messageFromTMSerializer;
    private messageToTMDeserializer;
    private messageToTMVerifier;
    xhr: XMLHttpRequest;
    agtUrl: string;
    constructor(messageFromTMSerializer: IMessageFromTMSerializer, messageToTMDeserializer: IMessageToTMDeserializer, messageToTMVerifier: IMessageToTMVerifier);
    communicateWithAGT(sharingNode: ISharingNode, message: MessageFromTM): Promise<BatchedMessagesToTM>;
}
