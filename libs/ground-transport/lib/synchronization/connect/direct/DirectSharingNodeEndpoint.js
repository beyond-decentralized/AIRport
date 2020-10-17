import { SYNC_CONNECTION_SERVER } from '@airport/arrivals-n-departures';
import { container, DI } from '@airport/di';
import { DIRECT_SHARING_NODE_ENDPOINT } from '../../../tokens';
import { DirectResponse } from './DirectResonse';
/**
 * P2P endpoint to a built-in AGT
 */
export class DirectSharingNodeEndpoint {
    async communicateWithAGT(sharingNode, message) {
        const recentConnectionServer = await container(this).get(SYNC_CONNECTION_SERVER);
        return new Promise((resolve, reject) => {
            recentConnectionServer.handleInMemoryConnect(message, new DirectResponse((statusCode, data) => {
                if (statusCode !== 200) {
                    reject([statusCode, `Error from AGT: ` + statusCode.toString()]);
                }
                resolve(data);
            }));
        });
    }
}
DI.set(DIRECT_SHARING_NODE_ENDPOINT, DirectSharingNodeEndpoint);
//# sourceMappingURL=DirectSharingNodeEndpoint.js.map