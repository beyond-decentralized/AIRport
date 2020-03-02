"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../../tokens");
class SyncOutMessageSender {
    async sendMessages(sharingNodeMap, messagesBySharingNode) {
        // FIXME: implement
    }
}
exports.SyncOutMessageSender = SyncOutMessageSender;
di_1.DI.set(tokens_1.SYNC_OUT_MSG_SENDER, SyncOutMessageSender);
//# sourceMappingURL=SyncOutMessageSender.js.map