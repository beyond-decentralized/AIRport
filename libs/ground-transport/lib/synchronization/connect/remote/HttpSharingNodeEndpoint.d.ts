import { BatchedMessagesToTM, MessageFromTM } from '@airport/arrivals-n-departures';
import { ISharingNode } from '@airport/moving-walkway';
import { ISharingNodeEndpoint } from '../SharingNodeEndpoint';
/**
 * P2P endpoint to a built-in AGT
 */
export declare class HttpSharingNodeEndpoint implements ISharingNodeEndpoint {
    xhr: XMLHttpRequest;
    agtUrl: string;
    communicateWithAGT(sharingNode: ISharingNode, message: MessageFromTM): Promise<BatchedMessagesToTM>;
}
//# sourceMappingURL=HttpSharingNodeEndpoint.d.ts.map