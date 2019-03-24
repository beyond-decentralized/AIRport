"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const moving_walkway_1 = require("@airport/moving-walkway");
const diTokens_1 = require("../../../diTokens");
class SyncInRepositoryChecker {
    constructor() {
        di_1.DI.get((sharingNodeRepositoryDao, utils) => {
            this.sharingNodeRepositoryDao = sharingNodeRepositoryDao;
            this.utils = utils;
        }, moving_walkway_1.SHARING_NODE_REPO_TRANS_BLOCK_DAO, air_control_1.UTILS);
    }
    async ensureRepositories(incomingMessages, dataMessagesWithInvalidData) {
        const consistentMessages = [];
        // const dataMessageMapBySharingNodeAndAgtRepositoryId:
        // 	Map<SharingNodeId, Map<AgtRepositoryId, IDataToTM[]>>
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
                this.utils.ensureChildArray(dataMessageMapBySharingNodeId, sharingNodeId)
                    .push(message);
                this.utils.ensureChildJsSet(sharingNodeRepositoryMap, sharingNodeId)
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
                operationHistory.
                ;
            }
        }
        return true;
    }
}
exports.SyncInRepositoryChecker = SyncInRepositoryChecker;
di_1.DI.set(diTokens_1.SYNC_IN_REPO_CHECKER, SyncInRepositoryChecker);
//# sourceMappingURL=SyncInRepositoryChecker.js.map