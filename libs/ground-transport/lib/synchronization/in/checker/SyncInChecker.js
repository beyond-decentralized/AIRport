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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b, _c;
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
    checkSchemasAndDataAndRecordSharingMessages(dataMessages, actorMap, sharingNodeRepositoryMap) {
        return __awaiter(this, void 0, void 0, function* () {
            this.recordAllValidIncomingSharingMessages();
            const { allSchemaMap, dataMessagesWithIncompatibleSchemas, dataMessagesWithCompatibleSchemas, dataMessagesToBeUpgraded, schemasWithChangesMap } = yield this.schemaChecker.checkSchemas(dataMessages);
            this.updateSchemaReferences(dataMessagesWithIncompatibleSchemas, allSchemaMap);
            this.updateSchemaReferences(dataMessagesToBeUpgraded, allSchemaMap);
            const usedSchemaIndexSet = this.updateSchemaReferences(dataMessagesWithCompatibleSchemas, allSchemaMap);
            this.updateActorReferences(dataMessagesWithIncompatibleSchemas, actorMap);
            this.updateActorReferences(dataMessagesToBeUpgraded, actorMap);
            this.updateActorReferences(dataMessagesWithCompatibleSchemas, actorMap);
            this.updateRepositoryReferences(dataMessagesWithIncompatibleSchemas, sharingNodeRepositoryMap);
            this.updateRepositoryReferences(dataMessagesToBeUpgraded, sharingNodeRepositoryMap);
            this.updateRepositoryReferences(dataMessagesWithCompatibleSchemas, sharingNodeRepositoryMap);
            const { dataMessagesWithCompatibleSchemasAndData, existingRepoTransBlocksWithCompatibleSchemasAndData, missingRecordRepoTransBlocks, sharingMessagesWithIncompatibleData, } = yield this.dataChecker.checkData(dataMessagesWithCompatibleSchemas);
            this.recordAllRepoTransBlocksCompatibleOrNot();
            this.recordAllSharingMessageRepoTransBlocks();
            this.recordAllSharingNodeRepoTransBlocks();
            const sharingMessagesWithCompatibleSchemasAndData = yield this.recordSharingMessages(dataMessagesWithIncompatibleSchemas, dataMessagesToBeUpgraded, schemasWithChangesMap, dataMessagesWithCompatibleSchemasAndData, sharingMessagesWithIncompatibleData, missingRecordRepoTransBlocks);
            return [
                sharingMessagesWithCompatibleSchemasAndData,
                existingRepoTransBlocksWithCompatibleSchemasAndData,
                dataMessagesWithCompatibleSchemas,
                usedSchemaIndexSet
            ];
        });
    }
    updateSchemaReferences(dataMessages, schemaMap) {
        const usedSchemaIndexSet = new Set();
        for (const dataMessage of dataMessages) {
            const data = dataMessage.data;
            const schemaIndexMapByRemoteSchemaIndex = new Map();
            const newSchemas = [];
            const oldSchemas = data.schemas;
            for (const schema of oldSchemas) {
                // By now schema map is guaranteed to contain the remote schemas
                const localSchemaIndex = schemaMap.get(schema.domainName).get(schema.name).index;
                const remoteSchemaIndex = schema.index;
                schema.index = localSchemaIndex;
                newSchemas.push(schema);
                schemaIndexMapByRemoteSchemaIndex.set(remoteSchemaIndex, localSchemaIndex);
            }
            data.schemas = newSchemas;
            for (const repoTransHistory of data.repoTransHistories) {
                delete repoTransHistory.id;
                for (const operationHistory of repoTransHistory.operationHistory) {
                    delete operationHistory.id;
                    const localSchemaIndex = schemaIndexMapByRemoteSchemaIndex.get(operationHistory.schema.index);
                    usedSchemaIndexSet.add(localSchemaIndex);
                    operationHistory.schema.index = localSchemaIndex;
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
                const localActor = actorMap.get(actor.randomId).get(actor.user.uniqueId).get(actor.database.name)
                    .get(actor.database.secondId).get(actor.database.owner.uniqueId);
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
    recordSharingMessages(dataMessagesWithIncompatibleSchemas, dataMessagesToBeUpgraded, schemasWithChangesMap, dataMessagesWithCompatibleSchemasAndData, sharingMessagesWithIncompatibleData, missingRecordRepoTransBlocks) {
        return __awaiter(this, void 0, void 0, function* () {
            const sharingMessagesWithIncompatibleSchemas = dataMessagesWithIncompatibleSchemas.map((dataMessagesWithIncompatibleSchemas) => {
                /**
                 * Record the messages (with data, because it cannot yet be processed) for messages
                 * that require schema changes (new schemas or schema upgrades).
                 */
                return this.syncInUtils.createSharingMessage(dataMessagesWithIncompatibleSchemas, moving_walkway_1.SharingMessageProcessingStatus.NEEDS_SCHEMA_CHANGES, true);
            });
            const sharingMessagesToBeUpgraded = dataMessagesToBeUpgraded.map((dataMessageToBeUpgraded) => {
                /**
                 * Record the messages (with data, because it cannot yet be processed) for messages
                 * that need to be upgraded to schema versions present on this TM.
                 *
                 * Messages cannot yet be processed since messages upgrades are done by the client
                 * domain code and need to be sent over to those domains for upgrading.
                 */
                return this.syncInUtils.createSharingMessage(dataMessageToBeUpgraded, moving_walkway_1.SharingMessageProcessingStatus.NEEDS_DATA_UPGRADES, true);
            });
            const sharingMessagesWithCompatibleSchemasAndData = dataMessagesWithCompatibleSchemasAndData.map((sharingMessageWithCompatibleSchemas) => {
                return this.syncInUtils.createSharingMessage(sharingMessageWithCompatibleSchemas, moving_walkway_1.SharingMessageProcessingStatus.READY_FOR_PROCESSING, false);
            });
            const allSharingMessagesToCreate = [
                ...sharingMessagesWithIncompatibleSchemas,
                ...sharingMessagesToBeUpgraded,
                ...sharingMessagesWithIncompatibleData,
                ...sharingMessagesWithCompatibleSchemasAndData
            ];
            yield this.sharingMessageDao.bulkCreate(allSharingMessagesToCreate, false, false);
            if (missingRecordRepoTransBlocks.length) {
                yield this.missingRecordRepoTransBlockDao.bulkCreate(missingRecordRepoTransBlocks, false, false);
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
            yield this.repoTransBlockSchemasToChangeDao.bulkCreate(sharingMessagesSchemasToChange, false, false);
            return sharingMessagesWithCompatibleSchemasAndData;
        });
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
    __metadata("design:paramtypes", [typeof (_a = typeof moving_walkway_1.IMissingRecordRepoTransBlockDao !== "undefined" && moving_walkway_1.IMissingRecordRepoTransBlockDao) === "function" ? _a : Object, typeof (_b = typeof moving_walkway_1.ISharingMessageDao !== "undefined" && moving_walkway_1.ISharingMessageDao) === "function" ? _b : Object, typeof (_c = typeof moving_walkway_1.IRepoTransBlockSchemasToChangeDao !== "undefined" && moving_walkway_1.IRepoTransBlockSchemasToChangeDao) === "function" ? _c : Object, Object, Object, Object, Object, Object])
], SyncInChecker);
exports.SyncInChecker = SyncInChecker;
//# sourceMappingURL=SyncInChecker.js.map