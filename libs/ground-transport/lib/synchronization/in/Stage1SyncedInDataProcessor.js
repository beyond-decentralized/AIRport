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
var _a, _b, _c, _d;
const typedi_1 = require("typedi");
const air_control_1 = require("@airport/air-control");
const moving_walkway_1 = require("@airport/moving-walkway");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const Inject_1 = require("typedi/decorators/Inject");
const InjectionTokens_1 = require("../../../../apps/terminal/src/InjectionTokens");
let Stage1SyncedInDataProcessor = class Stage1SyncedInDataProcessor {
    constructor(actorDao, repositoryTransactionHistoryDao, repositoryTransactionHistoryDmo, syncInUtils, utils) {
        this.actorDao = actorDao;
        this.repositoryTransactionHistoryDao = repositoryTransactionHistoryDao;
        this.repositoryTransactionHistoryDmo = repositoryTransactionHistoryDmo;
        this.syncInUtils = syncInUtils;
        this.utils = utils;
    }
    /**
     * In stage one:
     *
     *  1)  Unique create/update/delete statement datastructures are generated
     *  2)  Synchronization conflict datastructure is generated
     *
     * @param {Map<RepositoryId, ISyncRepoTransHistory[]>} repoTransHistoryMapByRepositoryId
     * @param {Map<ActorId, IActor>} actorMayById
     * @returns {Promise<void>}
     */
    performStage1DataProcessing(repoTransHistoryMapByRepositoryId, actorMayById) {
        return __awaiter(this, void 0, void 0, function* () {
            // query for all local operations on records in a repository (since the earliest
            // received change time).  Get the
            // changes by repository ids or by the actual tables and records in those tables
            // that will be updated or deleted.
            const changedRecordIds = new Map();
            for (const [repositoryId, repoTransHistoriesForRepo] of repoTransHistoryMapByRepositoryId) {
                const changedRecordsForRepo = {
                    ids: new Map(),
                    firstChangeTime: new Date(new Date().getTime() + 10000000000),
                };
                changedRecordIds.set(repositoryId, changedRecordsForRepo);
                for (const repoTransHistory of repoTransHistoriesForRepo) {
                    // determine the earliest change time of incoming history records
                    const saveMillis = repoTransHistory.saveTimestamp.getTime();
                    if (saveMillis
                        < changedRecordsForRepo.firstChangeTime.getTime()) {
                        changedRecordsForRepo.firstChangeTime = repoTransHistory.saveTimestamp;
                    }
                    for (const operationHistory of repoTransHistory.operationHistory) {
                        // Collect the Actor related ids
                        const idsForEntity = this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(changedRecordsForRepo.ids, operationHistory.schema.index), operationHistory.entity.index);
                        for (const recordHistory of operationHistory.recordHistory) {
                            // Collect the Actor related ids
                            this.utils.ensureChildJsSet(idsForEntity, recordHistory.actor.id)
                                .add(recordHistory.actorRecordId);
                            // add a map of new values
                            const newValueMap = new Map();
                            recordHistory.newValueMap = newValueMap;
                            for (const newValue of recordHistory.newValues) {
                                newValueMap.set(newValue.columnIndex, newValue);
                            }
                        }
                    }
                }
            }
            const allRepoTransHistoryMapByRepoId = new Map();
            const allRemoteRecordDeletions = this.getDeletedRecordIds(allRepoTransHistoryMapByRepoId, repoTransHistoryMapByRepositoryId);
            // find local history for the matching repositories and corresponding time period
            const localRepoTransHistoryMapByRepositoryId = yield this.repositoryTransactionHistoryDao
                .findAllLocalChangesForRecordIds(changedRecordIds);
            const allLocalRecordDeletions = this.getDeletedRecordIds(allRepoTransHistoryMapByRepoId, localRepoTransHistoryMapByRepositoryId, true);
            // Find all actors that modified the locally recorded history, which are not already in the
            // actorMapById
            // collect actors not already in cache
            const newlyFoundActorSet = new Set();
            for (const [repositoryId, repoTransHistoriesForRepository] of localRepoTransHistoryMapByRepositoryId) {
                for (const repoTransHistory of repoTransHistoriesForRepository) {
                    const actorId = repoTransHistory.actor.id;
                    if (actorMayById.get(actorId) === undefined) {
                        newlyFoundActorSet.add(actorId);
                    }
                }
            }
            if (newlyFoundActorSet.size) {
                // cache remaining actors
                const newActors = yield this.actorDao.findWithDetailsAndGlobalIdsByIds(Array.from(newlyFoundActorSet));
                for (const newActor of newActors) {
                    actorMayById.set(newActor.id, newActor);
                }
            }
            // sort all repository histories in processing order
            for (const [repositoryId, repoTransHistoriesForRepository] of allRepoTransHistoryMapByRepoId) {
                this.repositoryTransactionHistoryDmo
                    .sortRepoTransHistories(repoTransHistoriesForRepository, actorMayById);
            }
            const recordCreations = new Map();
            const recordUpdates = new Map();
            const recordDeletions = new Map();
            const syncConflictMapByRepoId = new Map();
            // FIXME: add code to ensure that remote records coming in are performed only
            // by the actors that claim the operation AND that the records created are
            // created only by the actors that perform the operation (actorIds match)
            for (const [repositoryId, repoTransHistoriesForRepo] of allRepoTransHistoryMapByRepoId) {
                for (const repoTransHistory of repoTransHistoriesForRepo) {
                    for (const operationHistory of repoTransHistory.operationHistory) {
                        switch (operationHistory.changeType) {
                            case ground_control_1.ChangeType.INSERT_VALUES:
                                this.processCreation(repositoryId, operationHistory, repoTransHistory.isLocal, recordCreations, recordUpdates, recordDeletions, allRemoteRecordDeletions, allLocalRecordDeletions, syncConflictMapByRepoId);
                                break;
                            case ground_control_1.ChangeType.UPDATE_ROWS:
                                this.processUpdate(repositoryId, operationHistory, repoTransHistory.isLocal, recordCreations, recordUpdates, allRemoteRecordDeletions, allLocalRecordDeletions, syncConflictMapByRepoId);
                                break;
                            case ground_control_1.ChangeType.DELETE_ROWS:
                                this.processDeletion(repositoryId, operationHistory, recordCreations, recordUpdates, recordDeletions, allLocalRecordDeletions);
                                break;
                        }
                    }
                }
            }
            return {
                recordCreations,
                recordDeletions,
                recordUpdates,
                syncConflictMapByRepoId
            };
        });
    }
    getDeletedRecordIds(allRepoTransHistoryMapByRepoId, repoTransHistoryMapByRepoId, isLocal = false) {
        const recordDeletions = new Map();
        for (const [repositoryId, repoTransHistories] of repoTransHistoryMapByRepoId) {
            this.mergeArraysInMap(allRepoTransHistoryMapByRepoId, repositoryId, repoTransHistories);
            for (const repoTransHistory of repoTransHistories) {
                repoTransHistory.isLocal = isLocal;
                for (const operationHistory of repoTransHistory.operationHistory) {
                    switch (operationHistory.changeType) {
                        case ground_control_1.ChangeType.DELETE_ROWS:
                            for (const recordHistory of operationHistory.recordHistory) {
                                this.ensureRecordHistoryId(recordHistory, this.syncInUtils
                                    .ensureRecordMapForRepoInTable(repositoryId, operationHistory, recordDeletions));
                            }
                            break;
                    }
                }
            }
        }
        return recordDeletions;
    }
    mergeArraysInMap(map, key, array) {
        let targetArray = map[key];
        if (!targetArray) {
            targetArray = array;
        }
        else {
            targetArray = targetArray.concat(array);
        }
    }
    /*
    NOTE: local creates are not inputted into this processing.
     */
    processCreation(repositoryId, operationHistory, isLocal, recordCreations, recordUpdates, recordDeletions, allRemoteRecordDeletions, allLocalRecordDeletions, syncConflictMapByRepoId) {
        const recordUpdatesForRepoInTable = this.getRecordsForRepoInTable(repositoryId, operationHistory, recordUpdates);
        const recordDeletesForRepoInTable = this.getRecordsForRepoInTable(repositoryId, operationHistory, recordDeletions);
        const allRemoteRecordDeletesForRepoInTable = this.getRecordsForRepoInTable(repositoryId, operationHistory, allRemoteRecordDeletions);
        const allLocalRecordDeletesForRepoInTable = this.getRecordsForRepoInTable(repositoryId, operationHistory, allLocalRecordDeletions);
        const insertsForEntityInRepo = this.syncInUtils.ensureRecordMapForRepoInTable(repositoryId, operationHistory, recordCreations);
        for (const recordHistory of operationHistory.recordHistory) {
            if (this.getRecord(recordHistory, insertsForEntityInRepo)) {
                throw new Error(`A record is being created more than once.
					${this.getRecordInfo(repositoryId, operationHistory, recordHistory)}
					This is not possible if every remote change is only processed once.
					`);
            }
            if (isLocal) {
                throw new Error(`Remotely mutated record is being created locally.
					${this.getRecordInfo(repositoryId, operationHistory, recordHistory)}
					This is not possible if changes are never sent to originating TMs.
					`);
            }
            if (this.hasRecordId(recordHistory, recordDeletesForRepoInTable)) {
                throw new Error(`
				Remotely created record is being deleted remotely before it's been created.
					${this.getRecordInfo(repositoryId, operationHistory, recordHistory)}
					This is not possible if all server clocks are synced.
					`);
            }
            if (this.getRecordHistoryId(recordHistory, allLocalRecordDeletesForRepoInTable)) {
                throw new Error(`Remotely created record is being deleted locally.
					${this.getRecordInfo(repositoryId, operationHistory, recordHistory)}
					This is not possible if every remote change is only processed once.
					`);
            }
            const remoteDeleteRecordHistoryId = this.getRecordHistoryId(recordHistory, allRemoteRecordDeletesForRepoInTable);
            if (remoteDeleteRecordHistoryId) {
                // remotely created record has been remotely deleted
                this.addSyncConflict(moving_walkway_1.SynchronizationConflictType.REMOTE_CREATE_REMOTELY_DELETED, repositoryId, recordHistory, {
                    id: remoteDeleteRecordHistoryId
                }, syncConflictMapByRepoId);
                // If the record has been deleted, do not process the create
                continue;
            }
            const createdRecord = this.ensureColumnValueMap(recordHistory, insertsForEntityInRepo);
            if (this.getRecord(recordHistory, recordUpdatesForRepoInTable)) {
                throw new Error(`Remotely created record is being updated BEFORE it is created.
					${this.getRecordInfo(repositoryId, operationHistory, recordHistory)}
					This is not possible if all server clocks are synced.
					`);
            }
            // Record the creation of the record
            for (const newValue of recordHistory.newValues) {
                createdRecord.set(newValue.columnIndex, newValue.newValue);
            }
        }
    }
    /*
    NOTE: local updates to records NOT in incoming changes do not get inputted into
    this processing.
     */
    processUpdate(repositoryId, operationHistory, isLocal, recordCreations, recordUpdates, allRemoteRecordDeletions, allLocalRecordDeletions, syncConflictMapByRepoId) {
        const recordCreationsForRepoInTable = this.getRecordsForRepoInTable(repositoryId, operationHistory, recordCreations);
        const allRemoteRecordDeletesForRepoInTable = this.getRecordsForRepoInTable(repositoryId, operationHistory, allRemoteRecordDeletions);
        const allLocalRecordDeletesForRepoInTable = this.getRecordsForRepoInTable(repositoryId, operationHistory, allLocalRecordDeletions);
        const updatesForEntityInRepo = this.syncInUtils.ensureRecordMapForRepoInTable(repositoryId, operationHistory, recordUpdates);
        for (const recordHistory of operationHistory.recordHistory) {
            const localDeleteRecordHistoryId = this.getRecordHistoryId(recordHistory, allLocalRecordDeletesForRepoInTable);
            if (localDeleteRecordHistoryId) {
                if (!isLocal) {
                    // A remote update to a record has been locally deleted
                    this.addSyncConflict(moving_walkway_1.SynchronizationConflictType.REMOTE_UPDATE_LOCALLY_DELETED, repositoryId, recordHistory, {
                        id: localDeleteRecordHistoryId
                    }, syncConflictMapByRepoId);
                }
                // else {a local update to a record has been locally deleted - nothing to do}
                // If the record has been deleted, do not process the update
                continue;
            }
            const remoteDeleteRecordHistoryId = this.getRecordHistoryId(recordHistory, allRemoteRecordDeletesForRepoInTable);
            if (remoteDeleteRecordHistoryId) {
                if (isLocal) {
                    // A local update for a record that has been deleted remotely
                    this.addSyncConflict(moving_walkway_1.SynchronizationConflictType.LOCAL_UPDATE_REMOTELY_DELETED, repositoryId, recordHistory, {
                        id: remoteDeleteRecordHistoryId
                    }, syncConflictMapByRepoId);
                }
                // else {remote deletions do not cause conflicts for remotely updated records}
                // If the record has been deleted, do not process the update
                continue;
            }
            // If the record has been created, update the creation record instead
            let createdRecord = this.getRecord(recordHistory, recordCreationsForRepoInTable);
            if (createdRecord) {
                if (isLocal) {
                    throw new Error(`Remotely created records are being updated locally.
					${this.getRecordInfo(repositoryId, operationHistory, recordHistory)}
					This is not possible if every remote change is only processed once.
					`);
                }
                else {
                    // remotely created record is being updated remotely - normal flow
                    for (const newValue of recordHistory.newValues) {
                        createdRecord.set(newValue.columnIndex, newValue.newValue);
                    }
                }
                // No need to record updates, already taken into account in the create
                continue;
            }
            // record update
            let updatedRecord = this.ensureRecord(recordHistory, updatesForEntityInRepo);
            let synchronizationConflict;
            for (const newValue of recordHistory.newValues) {
                if (isLocal) {
                    const columnIndex = newValue.columnIndex;
                    const recordUpdate = updatedRecord.get(columnIndex);
                    if (recordUpdate) {
                        // remotely updated record value is being updated locally
                        if (!synchronizationConflict) {
                            synchronizationConflict = this.addSyncConflict(moving_walkway_1.SynchronizationConflictType.REMOTE_UPDATE_LOCALLY_UPDATED, repositoryId, {
                                id: recordUpdate.recordHistoryId,
                            }, {
                                id: remoteDeleteRecordHistoryId
                            }, syncConflictMapByRepoId);
                            synchronizationConflict.values = [];
                        }
                        synchronizationConflict.values.push({
                            columnIndex,
                            synchronizationConflict
                        });
                        // no need to update since the value is already there
                        // Remove the update
                        updatedRecord.delete(newValue.columnIndex);
                    }
                }
                else {
                    // remotely updated record value is being updated remotely - normal flow
                    // replace the older update with the newer one
                    updatedRecord.set(newValue.columnIndex, {
                        newValue: newValue.newValue,
                        recordHistoryId: recordHistory.id
                    });
                }
            }
        }
    }
    /*
    NOTE: local deletes of records NOT in incoming changes do not get inputted into
    this processing.
     */
    processDeletion(repositoryId, operationHistory, recordCreations, recordUpdates, recordDeletions, allLocalRecordDeletions) {
        const recordCreationsForRepoInTable = this.getRecordsForRepoInTable(repositoryId, operationHistory, recordCreations);
        const recordUpdatesForRepoInTable = this.getRecordsForRepoInTable(repositoryId, operationHistory, recordUpdates);
        const allLocalRecordDeletesForRepoInTable = this.getRecordsForRepoInTable(repositoryId, operationHistory, allLocalRecordDeletions);
        const deletesForEntityInRepo = this.syncInUtils.ensureRecordMapForRepoInTable(repositoryId, operationHistory, recordDeletions);
        for (const recordHistory of operationHistory.recordHistory) {
            let recordCreationsForActorInRepoInTable = this.getRecordsForActor(recordHistory, recordCreationsForRepoInTable);
            // If a remotely deleted record was also created remotely
            if (recordCreationsForActorInRepoInTable
                && recordCreationsForActorInRepoInTable.get(recordHistory.actorRecordId)) {
                // remote deletions do not cause conflicts for remotely created records
                // Remove the creation of the record
                recordCreationsForActorInRepoInTable.delete(recordHistory.actorRecordId);
                // No need to record a deletion for a record that was also created (remotely)
                continue;
            }
            let recordUpdatesForActorInRepoInTable = this.getRecordsForActor(recordHistory, recordUpdatesForRepoInTable);
            // If a remotely deleted record has been updated (remotely)
            if (recordUpdatesForActorInRepoInTable
                && recordUpdatesForActorInRepoInTable.get(recordHistory.actorRecordId)) {
                // remote deletions do not cause conflicts for remotely updated records
                // Remove record updates for deleted records
                recordUpdatesForActorInRepoInTable.delete(recordHistory.actorRecordId);
            }
            if (this.getRecordHistoryId(recordHistory, allLocalRecordDeletesForRepoInTable)) {
                // If the record has been deleted locally, no need to add another delete operation
                continue;
            }
            // record deletion
            this.utils.ensureChildJsSet(deletesForEntityInRepo, recordHistory.actor.id)
                .add(recordHistory.actorRecordId);
        }
    }
    getRecordsForRepoInTable(repositoryId, operationHistory, recordMapBySchemaTableAndRepository) {
        const recordMapForSchema = recordMapBySchemaTableAndRepository
            .get(operationHistory.schema.index);
        let recordMapForTable;
        if (recordMapForSchema) {
            recordMapForTable = recordMapForSchema.get(operationHistory.entity.index);
        }
        let recordMapForRepoInTable;
        if (recordMapForTable) {
            recordMapForRepoInTable = recordMapForTable.get(repositoryId);
        }
        return recordMapForRepoInTable;
    }
    getRecord(recordHistory, recordMapByActor) {
        let recordsForActor = this.getRecordsForActor(recordHistory, recordMapByActor);
        if (!recordsForActor) {
            return null;
        }
        return recordsForActor.get(recordHistory.actorRecordId);
    }
    hasRecordId(recordHistory, actorRecordIdSetByActor) {
        let actorRecordIdsForActor = this.getRecordsForActor(recordHistory, actorRecordIdSetByActor);
        if (!actorRecordIdsForActor) {
            return false;
        }
        return actorRecordIdsForActor.has(recordHistory.actorRecordId);
    }
    getRecordHistoryId(recordHistory, actorRecordIdSetByActor) {
        let actorRecordIdsForActor = this.getRecordsForActor(recordHistory, actorRecordIdSetByActor);
        if (!actorRecordIdsForActor) {
            return null;
        }
        return actorRecordIdsForActor.get(recordHistory.actorRecordId);
    }
    getRecordsForActor(recordHistory, recordMapByActor) {
        let recordsForActor;
        if (recordMapByActor) {
            recordsForActor = recordMapByActor.get(recordHistory.actor.id);
        }
        return recordsForActor;
    }
    ensureRecordHistoryId(recordHistory, actorRecordIdSetByActor, actorRecordId = recordHistory.actorRecordId) {
        this.utils.ensureChildJsMap(actorRecordIdSetByActor, recordHistory.actor.id)
            .set(actorRecordId, recordHistory.id);
    }
    getRecordInfo(repositoryId, operationHistory, recordHistory) {
        return `
		Schema Index:     ${operationHistory.schema.index}
		Table Index:      ${operationHistory.entity.index}
		Repository ID:    ${repositoryId}
		Actor ID:         ${recordHistory.actor.id}
		Actor Record ID:  ${recordHistory.actorRecordId}
		`;
    }
    addSyncConflict(synchronizationConflictType, repositoryId, overwrittenRecordHistory, overwritingRecordHistory, syncConflictMapByRepoId) {
        const syncConflict = this.createSynchronizationConflict(synchronizationConflictType, repositoryId, overwrittenRecordHistory, overwritingRecordHistory);
        this.utils.ensureChildArray(syncConflictMapByRepoId, repositoryId).push(syncConflict);
        return syncConflict;
    }
    createSynchronizationConflict(synchronizationConflictType, repositoryId, overwrittenRecordHistory, overwritingRecordHistory) {
        return {
            overwrittenRecordHistory,
            overwritingRecordHistory,
            repository: {
                id: repositoryId
            },
            type: synchronizationConflictType
        };
    }
    ensureColumnValueMap(recordHistory, dataMap) {
        return this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(dataMap, recordHistory.actor.id), recordHistory.actorRecordId);
    }
    ensureRecord(recordHistory, recordMapByActor) {
        return this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(recordMapByActor, recordHistory.actor.id), recordHistory.actorRecordId);
    }
};
Stage1SyncedInDataProcessor = __decorate([
    typedi_1.Service(InjectionTokens_1.Stage1SyncedInDataProcessorToken),
    __param(1, Inject_1.Inject(holding_pattern_1.RepositoryTransactionHistoryDaoToken)),
    __param(2, Inject_1.Inject(holding_pattern_1.RepositoryTransactionHistoryDmoToken)),
    __param(3, Inject_1.Inject(InjectionTokens_1.SyncInUtilsToken)),
    __param(4, Inject_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [typeof (_a = typeof holding_pattern_1.IActorDao !== "undefined" && holding_pattern_1.IActorDao) === "function" ? _a : Object, typeof (_b = typeof holding_pattern_1.IRepositoryTransactionHistoryDao !== "undefined" && holding_pattern_1.IRepositoryTransactionHistoryDao) === "function" ? _b : Object, typeof (_c = typeof holding_pattern_1.IRepositoryTransactionHistoryDmo !== "undefined" && holding_pattern_1.IRepositoryTransactionHistoryDmo) === "function" ? _c : Object, Object, typeof (_d = typeof air_control_1.IUtils !== "undefined" && air_control_1.IUtils) === "function" ? _d : Object])
], Stage1SyncedInDataProcessor);
exports.Stage1SyncedInDataProcessor = Stage1SyncedInDataProcessor;
//# sourceMappingURL=Stage1SyncedInDataProcessor.js.map