import { DI } from '@airport/di';
import { ensureChildArray, ensureChildJsSet } from '@airport/ground-control';
import { SYNC_IN_REPO_CHECKER } from '../../../tokens';
export class SyncInRepositoryChecker {
    async ensureRepositories(incomingMessages, dataMessagesWithInvalidData) {
        const consistentMessages = [];
        // const dataMessageMapBySharingNodeAndAgtRepositoryId:
        // 	Map<SharingNode_Id, Map<AgtRepositoryId, IDataToTM[]>>
        // 	= new Map();
        const dataMessageMapBySharingNodeId = new Map();
        // const agtRepositoryIds: Set<AgtRepositoryId> = new Set();
        const sharingNodeIds = new Set();
        const sharingNodeRepositoryMap = new Map();
        for (const message of incomingMessages) {
            if (this.areRepositoryIdsConsistentInMessage(message)) {
                const sharingNodeId = message.sharingMessage.sharingNode.id;
                // const agtRepositoryId = message.agtRepositoryId;
                sharingNodeIds.add(sharingNodeId);
                // agtRepositoryIds.add(agtRepositoryId);
                // Add the Data message from AGT into the datastructure
                // this.utils.ensureChildArray(
                // 	this.utils.ensureChildJsMap(
                // 		dataMessageMapBySharingNodeAndAgtRepositoryId,
                // 		sharingNodeId), agtRepositoryId).push();
                ensureChildArray(dataMessageMapBySharingNodeId, sharingNodeId)
                    .push(message);
                ensureChildJsSet(sharingNodeRepositoryMap, sharingNodeId)
                    .add(message.data.repository.id);
                consistentMessages.push(message);
            }
            else {
                dataMessagesWithInvalidData.push(message);
            }
        }
        // const {dataMessages, sharingNodeRepositoryMap}
        // 	= await this.updateRepositoryIdsAndFilterOutMissingRepositoryMessages(
        // 	agtRepositoryIds, sharingNodeIds, dataMessageMapBySharingNodeAndAgtRepositoryId);
        return {
            // consistentMessages: dataMessages,
            consistentMessages,
            sharingNodeRepositoryMap
        };
    }
    areRepositoryIdsConsistentInMessage(message) {
        const data = message.data;
        const repositoryId = data.repository.id;
        const referencedRepositorySet = new Set();
        for (const repository of data.referencedRepositories) {
            if (referencedRepositorySet.has(repositoryId)) {
                return false;
            }
            referencedRepositorySet.add(repository.id);
        }
        for (const repoTransHistory of data.repoTransHistories) {
            if (repositoryId != repoTransHistory.repository.id) {
                return false;
            }
            for (const operationHistory of repoTransHistory.operationHistory) {
                // FIXME: implement
                //operationHistory.
            }
        }
        return true;
    }
}
DI.set(SYNC_IN_REPO_CHECKER, SyncInRepositoryChecker);
//# sourceMappingURL=SyncInRepositoryChecker.js.map