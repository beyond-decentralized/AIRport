import { DI } from '@airport/di/lib/src';
import { DataOrigin } from '@airport/moving-walkway';
import { SYNC_IN_SHARING_MESSAGE_CREATOR } from '../../../tokens';
export class SyncInSharingMessageCreator {
    createRecord(sharingNode, syncTimestamp) {
        return {
            sharingNode,
            origin: DataOrigin.REMOTE,
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
DI.set(SYNC_IN_SHARING_MESSAGE_CREATOR, SyncInSharingMessageCreator);
//# sourceMappingURL=SyncInSharingMessageCreator.js.map