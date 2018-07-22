"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const moving_walkway_1 = require("@airport/moving-walkway");
const terminal_map_1 = require("@airport/terminal-map");
const traffic_pattern_1 = require("@airport/traffic-pattern");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../../InjectionTokens");
const maxSingleRepoChangeLength = 1048576;
const maxAllRepoChangesLength = 10485760;
const log = InjectionTokens_1.GroundTransportLogger.add('SynchronizationOutManager');
/**
 * Synchronization manager is in charge of maintaining the AIR Terminal in sync.
 *
 * Any number of sync nodes can be configured to communicate
 * over any periods of time.  At any given point in time all pending Repository
 * Transaction Log entries
 *
 */
let SynchronizationOutManager = class SynchronizationOutManager {
    constructor(repositoryDao, repositoryTransactionHistoryDao, schemaDao, sharingMessageDao, sharingMessageRepoTransBlockDao, sharingNodeDao, sharingNodeTerminalDao, sharingNodeRepositoryDao, sharingNodeRepoTransBlockDao, repositoryTransactionBlockCreator, repositoryTransactionBlockDao, syncOutMessageSender, syncOutSerializer, utils) {
        this.repositoryDao = repositoryDao;
        this.repositoryTransactionHistoryDao = repositoryTransactionHistoryDao;
        this.schemaDao = schemaDao;
        this.sharingMessageDao = sharingMessageDao;
        this.sharingMessageRepoTransBlockDao = sharingMessageRepoTransBlockDao;
        this.sharingNodeDao = sharingNodeDao;
        this.sharingNodeTerminalDao = sharingNodeTerminalDao;
        this.sharingNodeRepositoryDao = sharingNodeRepositoryDao;
        this.sharingNodeRepoTransBlockDao = sharingNodeRepoTransBlockDao;
        this.repositoryTransactionBlockCreator = repositoryTransactionBlockCreator;
        this.repositoryTransactionBlockDao = repositoryTransactionBlockDao;
        this.syncOutMessageSender = syncOutMessageSender;
        this.syncOutSerializer = syncOutSerializer;
        this.utils = utils;
    }
    async synchronize(sharingNodes, terminal) {
        const sharingNodeMap = new Map();
        sharingNodes.forEach(sharingNode => {
            sharingNodeMap.set(sharingNode.id, sharingNode);
        });
        /**
         * Right now - dealing with network issues only (or server going down while syncing
         * is happening).  Performance issues and scaling syncing down or up is not handled.
         *
         * Does this have to be in the Alpha release?
         *    Yes, is part of core functionality
         *
         * What to implement (TM):
         *
         *  Check if not-acked message have been received by AGT
         *  If acks have stopped coming back switch to keep alive
         *  If server responds to keep alive switch back to ack checks
         *      First get through the backlog of not-acked RTBs
         *      Then start sending new RTBs
         *
         *  NOTE: what if sync server was down for a long time and some RTBs aged off?
         *  Then there should be a record of them in archival subsystem and they may
         *  be retrieved from the archive
         *
         * (AGT):
         *  On ack checks:
         *    If RTBs found, respond with synced
         *    If RTBs not found, respond with re-sync
         *  On keep alive:
         *    Respond with Alive
         *
         * QUESTION:  Is tracking of SyncStatus needed in SharingMessage?
         *
         * ANSWER:
         * PROS:
         *  On ack check can send only the message id and not all blocks in it
         *
         * CONS:
         *  Need to maintain it along with the status in repo trans blocks
         *
         * Q: Can we maintain the sync status in SharingMessage and NOT SharingNode RTB?
         *
         * A: Given that messages never get re-sent, it's more strait forward keep track of it in
         * SharingNode RTB.  If the messages were to be re-sent then it would make more sense
         * to store it in SharingMessage.
         *
         * Q: Should messages be resent?
         * A: No, because Sync Priority is maintained per Repository.
         */
        // Get RepoTransBlocks that have not acknowledged by AGT (or not sent for some reason)
        // Send Sync Status request for each of these messages
        await this.getNotAcknowledgedRTBs(sharingNodeMap);
        if (sharingNodeMap.size) {
            // Get new repository transaction histories not yet in RepoTransBlocks
            const newReposTransHistoryBlocksBySharingNodeId = await this.repositoryTransactionBlockCreator
                .createNewBlocks(Array.from(sharingNodeMap.keys()), terminal);
            await this.addNewSharingMessages(newReposTransHistoryBlocksBySharingNodeId, terminal);
        }
        const sharingMessageIdsBySharingNodeId = await this.sharingMessageDao
            .findAllSyncedSharingMessageIdsForSharingNodes(sharingNodeIds);
        // FIXME: check RepoTransBlocks that were denied sync due to no Write Permission
        // if it is determined that AGT did not yet have the up-to-date repo permissions
        const messagesBySharingNode = await this.syncOutSerializer.serializeMessages(sharingNodeDbMap, sharingNodeMap, repositoriesBySharingNodeIds, repoTransBlockDataByRepoId, repoTransHistoryIds, terminal);
        await this.syncOutMessageSender.sendMessages(sharingNodeMap, messagesBySharingNode);
    }
    /**
     *
     * @param {SharingNodeId[]} sharingNodeIds
     * @returns {Promise<void>}
     */
    async getNotAcknowledgedRTBs(sharingNodeMap) {
        const startingSharingNodeIds = Array.from(sharingNodeMap.keys());
        const { syncStatusRepositoryTransactionBlockIds, syncStatusRepoTransBlockIdsBySharingNodeId } = await this.sharingNodeRepoTransBlockDao.getForSharingNodeIdsAndBlockStatus(startingSharingNodeIds, terminal_map_1.BlockSyncStatus.REQUESTING_SYNC_STATUS);
        // If server did not respond to Sync Status requests
        if (syncStatusRepositoryTransactionBlockIds.length) {
            // scale down to keep-alive request
            const inactiveSharingNodeIds = Array.from(syncStatusRepoTransBlockIdsBySharingNodeId.keys());
            // Keep the RTB Sync Status in Requesting and update the SharingNode status
            await this.sharingNodeDao.updateIsActive(inactiveSharingNodeIds, false);
            // TODO: add keep alive requests
            // Remove inactive Sharing Nodes from further message processing
            for (const inactiveSharingNodeId of inactiveSharingNodeIds) {
                sharingNodeMap.delete(inactiveSharingNodeId);
            }
        }
        if (!sharingNodeMap.size) {
            // None of the nodes to sync to are active
        }
        const { syncingRepositoryTransactionBlockIds, syncingRepoTransBlockIdsBySharingNodeIds } = await this.sharingNodeRepoTransBlockDao.getForSharingNodeIdsAndBlockStatus(startingSharingNodeIds, terminal_map_1.BlockSyncStatus.SYNCHRONIZING);
        if (syncingRepositoryTransactionBlockIds.length) {
            // scale down to sync status requests
            const syncAckSharingNodeIds = Array.from(syncingRepoTransBlockIdsBySharingNodeIds.keys());
            await this.sharingNodeRepoTransBlockDao.updateBlockSyncStatus(syncAckSharingNodeIds, syncingRepositoryTransactionBlockIds, terminal_map_1.BlockSyncStatus.SYNCHRONIZING, terminal_map_1.BlockSyncStatus.REQUESTING_SYNC_STATUS);
            // Todo add sync ack requests
            for (const sharingNodeId in sharingNodeMap.keys()) {
            }
            // Remove inactive Sharing Nodes from further message processing
            for (const syncAckSharingNodeId of syncAckSharingNodeIds) {
                sharingNodeMap.delete(syncAckSharingNodeId);
            }
        }
    }
    /**
     * Unfinished messages get merged into new messages
     */
    async updateUnsyncedSharingMessages() {
        /*
        FIXME: Do sharing messages need to be updated or do we create new sharing messages?

        re-sending existing sharing message keeps the record of when the first time the message
        was sent but complicates sharing.

        SyncStatus is now kept on per-RTB basis.  Hence we will now simply create a new
        SharingMessage.  AGT can now respond telling a TM to send only RTBs for some Repositories
        while delaying/suspending/redirecting others - so no need to resend SharingMessages.  But
        we do want to find out which ones have not been acked by an AGT.



        In the case of an outage of an AGT TMs will keep on accumulating RTBs and could cause
        a perfect storm once an AGT comes back (by potentially overwhelming the it with the amount
        of data being sent to it at once).  So, need to build in a way to slowly
        sync all of the changes when the AGT comes back.

        First off, can the AGT capacity be temporarily increased after an outage?
            The number of node servers processing the requests in parallel can be increased.
            NOTE, we do not want to have to maintain spare capacity!
            Additional nodes can be spun up during the recovering process, in anticipation
            of a spike.  These nodes could then potentially be spun down, if and when
            needed.

        How can the backlog of RTBs be split up?
            Aug 2018 blog  - repository syncing prioritization
            Sept 2018 blog - reduce the syncing frequency of TMs after an outage
            Oct 2018 blog  - tri-state model (sync, check sync status, check alive status)
            Nov 2018 blog  - ephemeral repositories (shared but history not stored (
                and can't be reconciled in case of conflicts - just gotta have some recent value
                or there is always a single source of truth for the data),
                or shared but not stored at all, ex: real time update data)
            Dec 2018 blog  - ... history and identification Part 3 (optimizing)
            Jan 2019 blog  - in stormy weather (DDOS attacks)
            Feb 2019 blog  - syncing orchestration
            Mar 2019       - archiving part 1
            Apr 2019       - archiving part 2
            May 2019       - chaining AGTs together
            Jun 2019       - inner workings of sync - change detection
            Jul 2019       - managing transactions with cross domain communication
            Aug 2019       - end to end testing

         */
    }
    /**
     * Once an RTB has beens successfuly synced it's serialied data should be dropped.
     */
    clearDataOfSuccessfullySyncedRTBS() {
    }
    async addNewSharingMessages(newReposTransHistoryBlocksBySharingNodeId, source) {
        const origin = moving_walkway_1.DataOrigin.LOCAL;
        const messageSyncStatus = terminal_map_1.SyncStatus.SYNCHRONIZING;
        const processingStatus = moving_walkway_1.SharingMessageProcessingStatus.PROCESSED;
        const transmissionRetryCount = 0;
        const firstSyncRequestTimestamp = new Date();
        const lastSyncRequestTimestamp = firstSyncRequestTimestamp;
        const sharingMessages = [];
        const sharingMessageRepoTransBlocks = [];
        for (const [sharingNodeId, repositoryTransactionBlocks] of newReposTransHistoryBlocksBySharingNodeId) {
            const sharingMessage = {
                sharingNode: {
                    id: sharingNodeId
                },
                source,
                origin,
                messageSyncStatus,
                processingStatus,
                transmissionRetryCount,
                firstSyncRequestTimestamp,
                lastSyncRequestTimestamp,
            };
            sharingMessages.push(sharingMessage);
            for (const repositoryTransactionBlock of repositoryTransactionBlocks) {
                sharingMessageRepoTransBlocks.push({
                    sharingMessage,
                    repositoryTransactionBlock
                });
            }
        }
        await this.sharingMessageDao.bulkCreate(sharingMessages, false, false);
        await this.sharingMessageRepoTransBlockDao.bulkCreate(sharingMessageRepoTransBlocks, false, false);
    }
};
SynchronizationOutManager = __decorate([
    typedi_1.Service(InjectionTokens_1.SynchronizationOutManagerToken),
    __param(0, typedi_1.Inject(holding_pattern_1.RepositoryDaoToken)),
    __param(1, typedi_1.Inject(holding_pattern_1.RepositoryTransactionHistoryDaoToken)),
    __param(2, typedi_1.Inject(traffic_pattern_1.SchemaDaoToken)),
    __param(3, typedi_1.Inject(moving_walkway_1.SharingMessageDaoToken)),
    __param(4, typedi_1.Inject(moving_walkway_1.SharingMessageRepoTransBlockDaoToken)),
    __param(5, typedi_1.Inject(moving_walkway_1.SharingNodeDaoToken)),
    __param(6, typedi_1.Inject(moving_walkway_1.SharingNodeTerminalDaoToken)),
    __param(7, typedi_1.Inject(moving_walkway_1.SharingNodeRepositoryDaoToken)),
    __param(8, typedi_1.Inject(moving_walkway_1.SharingNodeRepoTransBlockDaoToken)),
    __param(9, typedi_1.Inject(InjectionTokens_1.RepositoryTransactionBlockCreatorToken)),
    __param(10, typedi_1.Inject(moving_walkway_1.RepositoryTransactionBlockDaoToken)),
    __param(11, typedi_1.Inject(InjectionTokens_1.SyncOutMessageSenderToken)),
    __param(12, typedi_1.Inject(InjectionTokens_1.SyncOutSerializerToken)),
    __param(13, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], SynchronizationOutManager);
exports.SynchronizationOutManager = SynchronizationOutManager;
//# sourceMappingURL=SynchronizationOutManager.js.map