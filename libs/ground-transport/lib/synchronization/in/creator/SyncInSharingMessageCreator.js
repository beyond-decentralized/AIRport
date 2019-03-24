"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("@airport/di/lib/src");
const moving_walkway_1 = require("@airport/moving-walkway");
const diTokens_1 = require("../../../diTokens");
class SyncInSharingMessageCreator {
    createRecord(sharingNode, syncTimestamp) {
        return {
            sharingNode,
            origin: moving_walkway_1.DataOrigin.REMOTE,
            syncTimestamp
        };
    }
    async saveIncoming(dataMessages) {
        const sharingMessages = [];
        for (const dataMessage of dataMessages) {
            sharingMessages.push({});
        }
    }
}
exports.SyncInSharingMessageCreator = SyncInSharingMessageCreator;
src_1.DI.set(diTokens_1.SYNC_IN_SHARING_MESSAGE_CREATOR, SyncInSharingMessageCreator);
//# sourceMappingURL=SyncInSharingMessageCreator.js.map