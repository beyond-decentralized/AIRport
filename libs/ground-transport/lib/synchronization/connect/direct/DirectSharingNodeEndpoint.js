"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arrivals_n_departures_1 = require("@airport/arrivals-n-departures");
const di_1 = require("@airport/di");
const tokens_1 = require("../../../tokens");
const DirectResonse_1 = require("./DirectResonse");
/**
 * P2P endpoint to a built-in AGT
 */
class DirectSharingNodeEndpoint {
    async communicateWithAGT(sharingNode, message) {
        const recentConnectionServer = await di_1.container(this).get(arrivals_n_departures_1.SYNC_CONNECTION_SERVER);
        return new Promise((resolve, reject) => {
            recentConnectionServer.handleInMemoryConnect(message, new DirectResonse_1.DirectResponse((statusCode, data) => {
                if (statusCode !== 200) {
                    reject([statusCode, `Error from AGT: ` + statusCode.toString()]);
                }
                resolve(data);
            }));
        });
    }
}
exports.DirectSharingNodeEndpoint = DirectSharingNodeEndpoint;
di_1.DI.set(tokens_1.DIRECT_SHARING_NODE_ENDPOINT, DirectSharingNodeEndpoint);
//# sourceMappingURL=DirectSharingNodeEndpoint.js.map