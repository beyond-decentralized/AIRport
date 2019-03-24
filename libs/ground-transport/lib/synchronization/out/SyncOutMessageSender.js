"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../../diTokens");
class SyncOutMessageSender {
    async sendMessages(sharingNodeMap, messagesBySharingNode) {
        // FIXME: implement
    }
}
exports.SyncOutMessageSender = SyncOutMessageSender;
di_1.DI.set(diTokens_1.SYNC_OUT_MSG_SENDER, SyncOutMessageSender);
//# sourceMappingURL=SyncOutMessageSender.js.map