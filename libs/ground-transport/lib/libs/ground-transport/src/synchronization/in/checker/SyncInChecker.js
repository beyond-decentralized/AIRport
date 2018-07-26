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
const moving_walkway_1 = require("@airport/moving-walkway");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../../../InjectionTokens");
let SyncInChecker = class SyncInChecker {
    constructor(missingRecordRepoTransBlockDao, sharingMessageDao, repoTransBlockSchemasToChangeDao, actorChecker, dataChecker, repositoryChecker, schemaChecker, syncInUtils) {
        this.missingRecordRepoTransBlockDao = missingRecordRepoTransBlockDao;
        this.sharingMessageDao = sharingMessageDao;
        this.repoTransBlockSchemasToChangeDao = repoTransBlockSchemasToChangeDao;
        this.actorChecker = actorChecker;
        this.dataChecker = dataChecker;
        this.repositoryChecker = repositoryChecker;
        this.schemaChecker = schemaChecker;
        this.syncInUtils = syncInUtils;
    }
    /**
     *
     * @param {IDataToTM[]} dataMessages
     * @returns {Promise<[IDataToTM[] , Map<SchemaDomainName, Map<SchemaName, ISchema>>]>}
     *      [
     *          checked messages composed entirely of records from schemas with versions compatible
     *              to this TM (it's present state),
     *          map of schemas used in messages that have been verified to be in acceptable state
     *              for message processing
     *      ]
     */
    async checkSchemasAndDataAndRecordSharingMessages(dataMessages, actorMap, sharingNodeRepositoryMap) {
        const { maxVersionedMapBySchemaAndDomainNames, dataMessagesWithIncompatibleSchemas, dataMessagesWithCompatibleSchemas, dataMessagesToBeUpgraded, } = await this.schemaChecker.checkSchemas(dataMessages);
        // this.updateSchemaReferences(dataMessagesWithIncompatibleSchemas, allSchemaMap);
        // this.updateSchemaReferences(dataMessagesToBeUpgraded, allSchemaMap);
        // Schema references for messages with incompatible schemas are converted
        // at when the messages are finally processed
        const usedSchemaVersionIdSet = this.updateSchemaReferences(dataMessagesWithCompatibleSchemas, maxVersionedMapBySchemaAndDomainNames);
        this.updateActorReferences(dataMessagesWithIncompatibleSchemas, actorMap);
        this.updateActorReferences(dataMessagesToBeUpgraded, actorMap);
        this.updateActorReferences(dataMessagesWithCompatibleSchemas, actorMap);
        this.updateRepositoryReferences(dataMessagesWithIncompatibleSchemas, sharingNodeRepositoryMap);
        this.updateRepositoryReferences(dataMessagesToBeUpgraded, sharingNodeRepositoryMap);
        this.updateRepositoryReferences(dataMessagesWithCompatibleSchemas, sharingNodeRepositoryMap);
        const { dataMessagesWithCompatibleSchemasAndData, existingRepoTransBlocksWithCompatibleSchemasAndData, missingRecordRepoTransBlocks, sharingMessagesWithIncompatibleData, } = await this.dataChecker.checkData(dataMessagesWithCompatibleSchemas);
        await this.recordAllRepoTransBlocksCompatibleOrNot(dataMessagesWithIncompatibleSchemas, dataMessagesToBeUpgraded, 
        // schemasWithChangesMap,
        dataMessagesWithCompatibleSchemasAndData, sharingMessagesWithIncompatibleData, missingRecordRepoTransBlocks);
        await this.recordAllSharingMessageRepoTransBlocks();
        await this.recordAllSharingNodeRepoTransBlocks();
        const sharingMessagesWithCompatibleSchemasAndData = await this.recordSharingMessages(dataMessagesWithIncompatibleSchemas, dataMessagesToBeUpgraded, schemasWithChangesMap, dataMessagesWithCompatibleSchemasAndData, sharingMessagesWithIncompatibleData, missingRecordRepoTransBlocks);
        return [
            sharingMessagesWithCompatibleSchemasAndData,
            existingRepoTransBlocksWithCompatibleSchemasAndData,
            dataMessagesWithCompatibleSchemas,
            usedSchemaVersionIdSet
        ];
    }
    /**
     * Schema references are to be upgraded for messages with Compatible Schemas only. The remaining
     * types of messages are only upgraded when processed
     *
     * 1) Incompatible schemas:
     *
     * Missing Schema ids cannot be upgraded
     * Schema version ids are not yet be upgraded
     *
     * FIXME: when missing schemas are retrieved - map schema & schema version ids to local values
     * FIXME: when messages/or local schema are upgraded - map schema version ids to local values
     *
     * 2) Data to be upgraded:
     * Schema version ids are not yet be upgraded
     * FIXME: when messages are upgraded - map schema version ids to local values
     *
     */
    updateSchemaReferences(dataMessages, maxVersionedMapBySchemaAndDomainNames) {
        const usedSchemaIndexSet = new Set();
        for (const dataMessage of dataMessages) {
            const data = dataMessage.data;
            // const schemaIndexMapByRemoteSchemaIndex: Map<RemoteSchemaIndex, SchemaIndex> = new Map();
            const schemaVersionIdMapByRemoteSchemaVersionId = new Map();
            const localSchemaVersions = [];
            const remoteSchemaVersions = data.schemaVersions;
            for (const schemaVersion of remoteSchemaVersions) {
                const schema = schemaVersion.schema;
                const localSchemaVersionView = maxVersionedMapBySchemaAndDomainNames
                    .get(schema.domainName).get(schema.name);
                // const localSchemaIndex = localSchemaVersionView.index;
                // const remoteSchemaIndex = schema.index;
                // schema.index = localSchemaIndex;
                schema.index = localSchemaVersionView.index;
                // schemaIndexMapByRemoteSchemaIndex.set(remoteSchemaIndex, localSchemaIndex);
                const localSchemaVersionId = localSchemaVersionView.schemaVersionId;
                const remoteSchemaVersionId = schemaVersion.id;
                schemaVersionIdMapByRemoteSchemaVersionId.set(remoteSchemaVersionId, localSchemaVersionId);
                localSchemaVersions.push(schemaVersion);
            }
            data.schemaVersions = localSchemaVersions;
            for (const repoTransHistory of data.repoTransHistories) {
                delete repoTransHistory.id;
                for (const operationHistory of repoTransHistory.operationHistory) {
                    delete operationHistory.id;
                    const localSchemaVersionId = schemaVersionIdMapByRemoteSchemaVersionId.get(operationHistory.schemaVersion.id);
                    usedSchemaIndexSet.add(localSchemaVersionId);
                    operationHistory.schemaVersion.id = localSchemaVersionId;
                    for (const recordHistory of operationHistory.recordHistory) {
                        delete recordHistory.id;
                    }
                }
            }
        }
        return usedSchemaIndexSet;
    }
    updateActorReferences(dataMessages, actorMap) {
        for (const dataMessage of dataMessages) {
            const data = dataMessage.data;
            const actorMapByRemoteActorId = new Map();
            const newActors = [];
            for (const actor of data.actors) {
                const localActor = actorMap.get(actor.randomId).get(actor.user.uniqueId).get(actor.terminal.name)
                    .get(actor.terminal.secondId).get(actor.terminal.owner.uniqueId);
                actorMapByRemoteActorId.set(actor.id, localActor);
                newActors.push(localActor);
            }
            data.actors = newActors;
            for (const repoTransHistory of data.repoTransHistories) {
                repoTransHistory.actor = actorMapByRemoteActorId.get(repoTransHistory.actor.id);
                for (const operationHistory of repoTransHistory.operationHistory) {
                    for (const recordHistory of operationHistory.recordHistory) {
                        recordHistory.actor = actorMapByRemoteActorId.get(recordHistory.actor.id);
                    }
                }
            }
        }
    }
    updateRepositoryReferences(dataMessages, sharingNodeRepositoryMap) {
        for (const dataMessage of dataMessages) {
            const data = dataMessage.data;
            const repositoryMap = sharingNodeRepositoryMap.get(dataMessage.sharingNode.id);
            const repositoryId = repositoryMap.get(dataMessage.agtRepositoryId);
            data.repository.id = repositoryId;
            for (const repoTransHistory of data.repoTransHistories) {
                if (repoTransHistory.repository) {
                    repoTransHistory.repository.id = repositoryId;
                }
            }
        }
    }
    async recordSharingMessages(dataMessagesWithIncompatibleSchemas, dataMessagesToBeUpgraded, schemasWithChangesMap, dataMessagesWithCompatibleSchemasAndData, sharingMessagesWithIncompatibleData, missingRecordRepoTransBlocks) {
        // const sharingMessagesWithIncompatibleSchemas = dataMessagesWithIncompatibleSchemas.map((
        // 	dataMessagesWithIncompatibleSchemas
        // ) => {
        // 	/**
        // 	 * Record the messages (with data, because it cannot yet be processed) for messages
        // 	 * that require schema changes (new schemas or schema upgrades).
        // 	 */
        // 	return this.syncInUtils.createSharingMessage(
        // 		dataMessagesWithIncompatibleSchemas,
        // SharingMessageProcessingStatus.NEEDS_SCHEMA_CHANGES, true); }); const
        // sharingMessagesToBeUpgraded = dataMessagesToBeUpgraded.map(( dataMessageToBeUpgraded ) =>
        // { /** * Record the messages (with data, because it cannot yet be processed) for messages *
        // that need to be upgraded to schema versions present on this TM. * * Messages cannot yet be
        // processed since messages upgrades are done by the client * domain code and need to be sent
        // over to those domains for upgrading. */ return this.syncInUtils.createSharingMessage(
        // dataMessageToBeUpgraded, SharingMessageProcessingStatus.NEEDS_DATA_UPGRADES, true); });
        // const sharingMessagesWithCompatibleSchemasAndData =
        // dataMessagesWithCompatibleSchemasAndData.map(( sharingMessageWithCompatibleSchemas ) => {
        // return this.syncInUtils.createSharingMessage( sharingMessageWithCompatibleSchemas, SharingMessageProcessingStatus.READY_FOR_PROCESSING, false); }); const allSharingMessagesToCreate: ISharingMessage[] = [ ...sharingMessagesWithIncompatibleSchemas, ...sharingMessagesToBeUpgraded, ...sharingMessagesWithIncompatibleData, ...sharingMessagesWithCompatibleSchemasAndData ];  await this.sharingMessageDao.bulkCreate( allSharingMessagesToCreate, false, false);
        const m;
        if (missingRecordRepoTransBlocks.length) {
            await this.missingRecordRepoTransBlockDao.bulkCreate(missingRecordRepoTransBlocks, false, false);
        }
        // Record all schemas to change per sharing message with incompatible schemas
        const sharingMessagesSchemasToChange = [];
        for (let i = 0; i < dataMessagesWithIncompatibleSchemas.length; i++) {
            const message = dataMessagesWithIncompatibleSchemas[i];
            const sharingMessage = sharingMessagesWithIncompatibleSchemas[i];
            let allMessageSchemasAreCompatible = true;
            let messageBuildWithOutdatedSchemaVersions = false;
            // for every schema (at a given version) used in the message
            for (const schema of message.data.schemas) {
                let matchingSchema = this.findMatchingSchema(schemasWithChangesMap, schema);
                if (!matchingSchema) {
                    continue;
                }
                // If a there was a schema that needs to be added or upgraded
                sharingMessagesSchemasToChange.push({
                    sharingMessage,
                    status: moving_walkway_1.SchemaChangeStatus.CHANGE_NEEDED,
                    schema: matchingSchema
                });
            }
        }
        await this.repoTransBlockSchemasToChangeDao.bulkCreate(sharingMessagesSchemasToChange, false, false);
        return sharingMessagesWithCompatibleSchemasAndData;
    }
    findMatchingSchema(schemaMap, schema) {
        const schemasForDomainName = schemaMap.get(schema.domainName);
        if (!schemasForDomainName) {
            return null;
        }
        return schemasForDomainName.get(schema.name);
    }
};
SyncInChecker = __decorate([
    typedi_1.Service(InjectionTokens_1.SyncInCheckerToken),
    __param(0, typedi_1.Inject(moving_walkway_1.MissingRecordRepoTransBlockDaoToken)),
    __param(1, typedi_1.Inject(moving_walkway_1.SharingMessageDaoToken)),
    __param(2, typedi_1.Inject(moving_walkway_1.RepoTransBlockSchemasToChangeDaoToken)),
    __param(3, typedi_1.Inject(InjectionTokens_1.SyncInActorCheckerToken)),
    __param(4, typedi_1.Inject(InjectionTokens_1.SyncInDataCheckerToken)),
    __param(5, typedi_1.Inject(InjectionTokens_1.SyncInRepositoryCheckerToken)),
    __param(6, typedi_1.Inject(InjectionTokens_1.SyncInSchemaCheckerToken)),
    __param(7, typedi_1.Inject(InjectionTokens_1.SyncInUtilsToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object])
], SyncInChecker);
exports.SyncInChecker = SyncInChecker;
//# sourceMappingURL=SyncInChecker.js.map