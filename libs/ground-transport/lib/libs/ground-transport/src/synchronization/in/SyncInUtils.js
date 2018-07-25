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
const arrivals_n_departures_1 = require("@airport/arrivals-n-departures");
const moving_walkway_1 = require("@airport/moving-walkway");
const typedi_1 = require("typedi");
const lib_1 = require("zipson/lib");
const InjectionTokens_1 = require("../../InjectionTokens");
/**
 * Result of comparing to versions of a given schema.
 */
var SchemaComparisonResult;
(function (SchemaComparisonResult) {
    // Version specified in the message is lower than it's version in the receiving Terminal (TM)
    SchemaComparisonResult[SchemaComparisonResult["MESSAGE_SCHEMA_VERSION_IS_LOWER"] = -1] = "MESSAGE_SCHEMA_VERSION_IS_LOWER";
    // Version of the schema used i the message is the same as that in the receiving Terminal (TM)
    SchemaComparisonResult[SchemaComparisonResult["MESSAGE_SCHEMA_VERSION_IS_EQUAL"] = 0] = "MESSAGE_SCHEMA_VERSION_IS_EQUAL";
    // Version specified in the message in higher than it's version in the receiving Terminal (TM)
    SchemaComparisonResult[SchemaComparisonResult["MESSAGE_SCHEMA_VERSION_IS_HIGHER"] = 1] = "MESSAGE_SCHEMA_VERSION_IS_HIGHER";
})(SchemaComparisonResult = exports.SchemaComparisonResult || (exports.SchemaComparisonResult = {}));
let SyncInUtils = class SyncInUtils {
    constructor(repositoryTransactionBlockDao, utils) {
        this.repositoryTransactionBlockDao = repositoryTransactionBlockDao;
        this.utils = utils;
    }
    ensureRecordMapForRepoInTable(repositoryId, operationHistory, recordMapBySchemaTableAndRepository) {
        // FIXME: ensure that OperationHistory schemaVersion is correctly set
        return this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(recordMapBySchemaTableAndRepository, operationHistory.schemaVersion.id), operationHistory.entity.index), repositoryId);
    }
    // createSharingMessage(
    // 	dataMessageToClient: IDataToTM,
    // 	processingStatus: RepoTransBlockSyncOutcomeType,
    // 	saveData: boolean
    // ): ISharingMessage {
    // 	return {
    // 		sharingNode: dataMessageToClient.sharingNode,
    // 		// agtTerminalSyncLogId: null,
    // 		// origin: DataOrigin.REMOTE,
    // 		// syncStatus: BlockSyncStatus.SYNCHRONIZED,
    // 		source: null, // FIXME add source terminal
    // 		processingStatus,
    // 		syncTimestamp: new Date(dataMessageToClient.syncDatetime),
    // 		// dataCache: saveData ? stringify(dataMessageToClient.data) : undefined
    // 	};
    // }
    async recordRepositoryTransBlocks(dataMessagesWithIncompatibleSchemas, dataMessagesWithIncompatibleData, dataMessagesToBeUpgraded, 
    // schemasWithChangesMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>,
    dataMessagesWithCompatibleSchemasAndData, dataMessagesWithInvalidData) {
        let allRepositoryTransactionBlocks = [];
        const repoTransBlocksNeedingSchemaChanges = this.createRepositoryTransactionBlocks(dataMessagesWithIncompatibleSchemas, arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_TO_TM_NEEDS_SCHEMA_CHANGES, true);
        allRepositoryTransactionBlocks = allRepositoryTransactionBlocks.concat(repoTransBlocksNeedingSchemaChanges);
        const repoTransBlocksNeedingDataUpgrades = this.createRepositoryTransactionBlocks(dataMessagesToBeUpgraded, arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_TO_TM_NEEDS_DATA_UPGRADES, true);
        allRepositoryTransactionBlocks = allRepositoryTransactionBlocks.concat(repoTransBlocksNeedingDataUpgrades);
        const repoTransBlocksNeedingAdditionalData = this.createRepositoryTransactionBlocks(dataMessagesWithIncompatibleData, arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_TO_TM_NEEDS_ADDITIONAL_DATA, true);
        allRepositoryTransactionBlocks = allRepositoryTransactionBlocks.concat(repoTransBlocksNeedingAdditionalData);
        const repoTransBlocksWithInvalidData = this.createRepositoryTransactionBlocks(dataMessagesWithInvalidData, arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_TO_TM_INVALID_DATA);
        allRepositoryTransactionBlocks = allRepositoryTransactionBlocks.concat(repoTransBlocksWithInvalidData);
        const repoTransBlocksWithValidDataAndSchemas = this.createRepositoryTransactionBlocks(dataMessagesWithCompatibleSchemasAndData, arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_TO_TM_SUCCESSFUL);
        allRepositoryTransactionBlocks = allRepositoryTransactionBlocks.concat(repoTransBlocksWithValidDataAndSchemas);
        await this.repositoryTransactionBlockDao.bulkCreate(repositoryTransactionBlockDao, false, false);
    }
    createRepositoryTransactionBlocks(dataMessages, syncOutcomeType, recordContents = false) {
        const repositoryTransactionBlocks = [];
        for (const dataMessage of dataMessages) {
            const data = dataMessage.data;
            const repositoryTransactionBlock = {
                contents: recordContents ? lib_1.stringify(data) : null,
                hash: null,
                repository: data.repository,
                source: data.terminal,
                syncOutcomeType,
            };
            dataMessage.repositoryTransactionBlock = repositoryTransactionBlock;
            repositoryTransactionBlocks.push(repositoryTransactionBlock);
        }
        return repositoryTransactionBlocks;
    }
    async recordSharingMessageRepoTransBlocks() {
    }
    async recordSharingNodeRepoTransBlocks() {
        let snrtb;
    }
};
SyncInUtils = __decorate([
    typedi_1.Service(InjectionTokens_1.SyncInUtilsToken),
    __param(0, typedi_1.Inject(moving_walkway_1.RepositoryTransactionBlockDaoToken)),
    __param(1, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object])
], SyncInUtils);
exports.SyncInUtils = SyncInUtils;
//# sourceMappingURL=SyncInUtils.js.map