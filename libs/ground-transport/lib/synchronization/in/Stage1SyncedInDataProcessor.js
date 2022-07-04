var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { getSysWideOpIds } from '@airport/check-in';
import { ChangeType, ensureChildArray, ensureChildJsMap, ensureChildJsSet } from '@airport/ground-control';
import { SynchronizationConflict_Type } from '@airport/moving-walkway';
let Stage1SyncedInDataProcessor = class Stage1SyncedInDataProcessor {
    /**
     * In stage one:
     *
     *  1)  Unique create/update/delete statement datastructures are generated
     *  2)  Synchronization conflict datastructure is generated
     *
     * @param {Map<repositoryLocalId, ISyncRepoTransHistory[]>} repositoryTransactionHistoryMapByrepositoryLocalId
     * @param {Map<Actor_LocalId, IActor>} actorMayById
     * @returns {Promise<void>}
     */
    async performStage1DataProcessing(repositoryTransactionHistoryMapByrepositoryLocalId, actorMayById, context) {
        await this.populateSystemWideOperationIds(repositoryTransactionHistoryMapByrepositoryLocalId);
        const changedRecordIds = new Map();
        // query for all local operations on records in a repository (since the earliest
        // received change time).  Get the
        // changes by repository _localIds or by the actual tables and records in those tables
        // that will be updated or deleted.
        for (const [repositoryLocalId, repoTransHistoriesForRepo] of repositoryTransactionHistoryMapByrepositoryLocalId) {
            const changedRecordsForRepo = {
                actorRecordIdsByLocalIds: new Map(),
                firstChangeTime: new Date().getTime() + 10000000000
            };
            changedRecordIds.set(repositoryLocalId, changedRecordsForRepo);
            for (const repoTransHistory of repoTransHistoriesForRepo) {
                // determine the earliest change time of incoming history records
                const saveMillis = repoTransHistory.saveTimestamp;
                if (saveMillis
                    < changedRecordsForRepo.firstChangeTime) {
                    changedRecordsForRepo.firstChangeTime = repoTransHistory.saveTimestamp;
                }
                for (const operationHistory of repoTransHistory.operationHistory) {
                    // Collect the Actor related localIds
                    const idsForEntity = ensureChildJsMap(changedRecordsForRepo.actorRecordIdsByLocalIds, operationHistory.entity._localId);
                    for (const recordHistory of operationHistory.recordHistory) {
                        // Collect the Actor related localIds
                        ensureChildJsSet(idsForEntity, recordHistory.actor._localId)
                            .add(recordHistory._actorRecordId);
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
        const allRemoteRecordDeletions = this.getDeletedRecordIdsAndPopulateAllHistoryMap(allRepoTransHistoryMapByRepoId, repositoryTransactionHistoryMapByrepositoryLocalId);
        // find local history for the matching repositories and corresponding time period
        const localRepoTransHistoryMapByrepositoryLocalId = await this.repositoryTransactionHistoryDao
            .findAllLocalChangesForRecordIds(changedRecordIds);
        const allLocalRecordDeletions = this.getDeletedRecordIdsAndPopulateAllHistoryMap(allRepoTransHistoryMapByRepoId, localRepoTransHistoryMapByrepositoryLocalId, true);
        // Find all actors that modified the locally recorded history, which are not already
        // in the actorMapById collect actors not already in cache
        const newlyFoundActorSet = new Set();
        for (const [repositoryLocalId, repositoryTransactionHistoriesForRepository] of localRepoTransHistoryMapByrepositoryLocalId) {
            for (const repositoryTransactionHistory of repositoryTransactionHistoriesForRepository) {
                for (const operationHistory of repositoryTransactionHistory.operationHistory) {
                    const actorId = operationHistory.actor._localId;
                    if (actorMayById.get(actorId) === undefined) {
                        newlyFoundActorSet.add(actorId);
                    }
                }
            }
        }
        if (newlyFoundActorSet.size) {
            // cache remaining actors
            const newActors = await this.actorDao.findWithDetailsAndGlobalIdsByIds(Array.from(newlyFoundActorSet));
            for (const newActor of newActors) {
                actorMayById.set(newActor._localId, newActor);
            }
        }
        // sort all repository histories in processing order
        for (const [repositoryLocalId, repoTransHistoriesForRepository] of allRepoTransHistoryMapByRepoId) {
            this.repositoryTransactionHistoryDuo
                .sortRepoTransHistories(repoTransHistoriesForRepository, actorMayById);
        }
        const recordCreations = new Map();
        const recordUpdates = new Map();
        const recordDeletions = new Map();
        const syncConflictMapByRepoId = new Map();
        // FIXME: add code to ensure that remote records coming in are performed only
        // by the actors that claim the operation AND that the records created are
        // created only by the actors that perform the operation (actorIds match)
        for (const [repositoryLocalId, repoTransHistoriesForRepo] of allRepoTransHistoryMapByRepoId) {
            for (const repoTransHistory of repoTransHistoriesForRepo) {
                for (const operationHistory of repoTransHistory.operationHistory) {
                    switch (operationHistory.changeType) {
                        case ChangeType.INSERT_VALUES:
                            this.processCreation(repositoryLocalId, operationHistory, repoTransHistory.isLocal, recordCreations, recordUpdates, recordDeletions, allRemoteRecordDeletions, allLocalRecordDeletions, syncConflictMapByRepoId);
                            break;
                        case ChangeType.UPDATE_ROWS:
                            this.processUpdate(repositoryLocalId, operationHistory, repoTransHistory.isLocal, recordCreations, recordUpdates, allRemoteRecordDeletions, allLocalRecordDeletions, syncConflictMapByRepoId);
                            break;
                        case ChangeType.DELETE_ROWS:
                            this.processDeletion(repositoryLocalId, operationHistory, recordCreations, recordUpdates, recordDeletions, allLocalRecordDeletions);
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
    }
    async populateSystemWideOperationIds(repositoryTransactionHistoryMapByrepositoryLocalId) {
        let numSystemWideOperationIds = 0;
        for (const [_, repoTransHistoriesForRepo] of repositoryTransactionHistoryMapByrepositoryLocalId) {
            for (const repositoryTransactionHistory of repoTransHistoriesForRepo) {
                numSystemWideOperationIds += repositoryTransactionHistory
                    .operationHistory.length;
            }
        }
        const systemWideOperationIds = await getSysWideOpIds(numSystemWideOperationIds, this.airportDatabase, this.sequenceGenerator);
        let i = 0;
        for (const [_, repoTransHistoriesForRepo] of repositoryTransactionHistoryMapByrepositoryLocalId) {
            for (const repositoryTransactionHistory of repoTransHistoriesForRepo) {
                for (const operationHistory of repositoryTransactionHistory.operationHistory) {
                    operationHistory.systemWideOperationId = systemWideOperationIds[i];
                    i++;
                }
            }
        }
    }
    ensureRecordHistoryLocalId(recordHistory, actorRecordLocalIdSetByActor, _actorRecordId = recordHistory._actorRecordId) {
        ensureChildJsMap(actorRecordLocalIdSetByActor, recordHistory.actor._localId)
            .set(_actorRecordId, recordHistory._localId);
    }
    getDeletedRecordIdsAndPopulateAllHistoryMap(allRepoTransHistoryMapByRepoId, repositoryTransactionHistoryMapByRepoId, isLocal = false) {
        const recordDeletions = new Map();
        for (const [repositoryLocalId, repoTransHistories] of repositoryTransactionHistoryMapByRepoId) {
            this.mergeArraysInMap(allRepoTransHistoryMapByRepoId, repositoryLocalId, repoTransHistories);
            for (const repoTransHistory of repoTransHistories) {
                repoTransHistory.isLocal = isLocal;
                for (const operationHistory of repoTransHistory.operationHistory) {
                    switch (operationHistory.changeType) {
                        case ChangeType.DELETE_ROWS:
                            for (const recordHistory of operationHistory.recordHistory) {
                                this.ensureRecordHistoryLocalId(recordHistory, this.syncInUtils
                                    .ensureRecordMapForRepoInTable(repositoryLocalId, operationHistory, recordDeletions));
                            }
                            break;
                    }
                }
            }
        }
        return recordDeletions;
    }
    mergeArraysInMap(map, key, array) {
        let targetArray = map.get(key);
        if (!targetArray) {
            targetArray = array;
        }
        else {
            targetArray = targetArray.concat(array);
        }
        map.set(key, targetArray);
    }
    /*
    NOTE: local creates are not inputted into this processing.
     */
    processCreation(repositoryLocalId, operationHistory, isLocal, recordCreations, recordUpdates, recordDeletions, allRemoteRecordDeletions, allLocalRecordDeletions, syncConflictMapByRepoId) {
        const recordUpdatesForRepoInTable = this.getRecordsForRepoInTable(repositoryLocalId, operationHistory, recordUpdates);
        const recordDeletesForRepoInTable = this.getRecordsForRepoInTable(repositoryLocalId, operationHistory, recordDeletions);
        const allRemoteRecordDeletesForRepoInTable = this.getRecordsForRepoInTable(repositoryLocalId, operationHistory, allRemoteRecordDeletions);
        const allLocalRecordDeletesForRepoInTable = this.getRecordsForRepoInTable(repositoryLocalId, operationHistory, allLocalRecordDeletions);
        const insertsForEntityInRepo = this.syncInUtils.ensureRecordMapForRepoInTable(repositoryLocalId, operationHistory, recordCreations);
        for (const recordHistory of operationHistory.recordHistory) {
            if (this.getRecord(recordHistory, insertsForEntityInRepo)) {
                throw new Error(`A record is being created more than once.
					${this.getRecordInfo(repositoryLocalId, operationHistory, recordHistory)}
					This is not possible if every remote change is only processed once.
					`);
            }
            if (isLocal) {
                throw new Error(`Remotely mutated record is being created locally.
					${this.getRecordInfo(repositoryLocalId, operationHistory, recordHistory)}
					This is not possible if changes are never sent to originating TMs.
					`);
            }
            if (this.hasRecordId(recordHistory, recordDeletesForRepoInTable)) {
                throw new Error(`
				Remotely created record is being deleted remotely before it's been created.
					${this.getRecordInfo(repositoryLocalId, operationHistory, recordHistory)}
					This is not possible if all server clocks are synced.
					`);
            }
            if (this.getRecordHistoryLocalId(recordHistory, allLocalRecordDeletesForRepoInTable)) {
                throw new Error(`Remotely created record is being deleted locally.
					${this.getRecordInfo(repositoryLocalId, operationHistory, recordHistory)}
					This is not possible if every remote change is only processed once.
					`);
            }
            const remoteDeleteRecordHistoryLocalId = this.getRecordHistoryLocalId(recordHistory, allRemoteRecordDeletesForRepoInTable);
            if (remoteDeleteRecordHistoryLocalId) {
                // remotely created record has been remotely deleted
                this.addSyncConflict(SynchronizationConflict_Type.REMOTE_CREATE_REMOTELY_DELETED, repositoryLocalId, recordHistory, {
                    _localId: remoteDeleteRecordHistoryLocalId
                }, syncConflictMapByRepoId);
                // If the record has been deleted, do not process the create
                continue;
            }
            const createdRecord = this.ensureColumnValueMap(recordHistory, insertsForEntityInRepo);
            if (this.getRecord(recordHistory, recordUpdatesForRepoInTable)) {
                throw new Error(`Remotely created record is being updated BEFORE it is created.
					${this.getRecordInfo(repositoryLocalId, operationHistory, recordHistory)}
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
    processUpdate(repositoryLocalId, operationHistory, isLocal, recordCreations, recordUpdates, allRemoteRecordDeletions, allLocalRecordDeletions, syncConflictMapByRepoId) {
        const recordCreationsForRepoInTable = this.getRecordsForRepoInTable(repositoryLocalId, operationHistory, recordCreations);
        const allRemoteRecordDeletesForRepoInTable = this.getRecordsForRepoInTable(repositoryLocalId, operationHistory, allRemoteRecordDeletions);
        const allLocalRecordDeletesForRepoInTable = this.getRecordsForRepoInTable(repositoryLocalId, operationHistory, allLocalRecordDeletions);
        const updatesForEntityInRepo = this.syncInUtils.ensureRecordMapForRepoInTable(repositoryLocalId, operationHistory, recordUpdates);
        for (const recordHistory of operationHistory.recordHistory) {
            const localDeleteRecordHistoryLocalId = this.getRecordHistoryLocalId(recordHistory, allLocalRecordDeletesForRepoInTable);
            if (localDeleteRecordHistoryLocalId) {
                if (!isLocal) {
                    // A remote update to a record has been locally deleted
                    this.addSyncConflict(SynchronizationConflict_Type.REMOTE_UPDATE_LOCALLY_DELETED, repositoryLocalId, recordHistory, {
                        _localId: localDeleteRecordHistoryLocalId
                    }, syncConflictMapByRepoId);
                }
                // else {a local update to a record has been locally deleted - nothing to do}
                // If the record has been deleted, do not process the update
                continue;
            }
            const remoteDeleteRecordHistoryLocalId = this.getRecordHistoryLocalId(recordHistory, allRemoteRecordDeletesForRepoInTable);
            if (remoteDeleteRecordHistoryLocalId) {
                if (isLocal) {
                    // A local update for a record that has been deleted remotely
                    this.addSyncConflict(SynchronizationConflict_Type.LOCAL_UPDATE_REMOTELY_DELETED, repositoryLocalId, recordHistory, {
                        _localId: remoteDeleteRecordHistoryLocalId
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
					${this.getRecordInfo(repositoryLocalId, operationHistory, recordHistory)}
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
                            synchronizationConflict = this.addSyncConflict(SynchronizationConflict_Type.REMOTE_UPDATE_LOCALLY_UPDATED, repositoryLocalId, {
                                _localId: recordUpdate.recordHistoryLocalId,
                            }, {
                                _localId: remoteDeleteRecordHistoryLocalId
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
                        recordHistoryLocalId: recordHistory._localId
                    });
                }
            }
        }
    }
    /*
    NOTE: local deletes of records NOT in incoming changes do not get inputted into
    this processing.
     */
    processDeletion(repositoryLocalId, operationHistory, recordCreations, recordUpdates, recordDeletions, allLocalRecordDeletions) {
        const recordCreationsForRepoInTable = this.getRecordsForRepoInTable(repositoryLocalId, operationHistory, recordCreations);
        const recordUpdatesForRepoInTable = this.getRecordsForRepoInTable(repositoryLocalId, operationHistory, recordUpdates);
        const allLocalRecordDeletesForRepoInTable = this.getRecordsForRepoInTable(repositoryLocalId, operationHistory, allLocalRecordDeletions);
        const deletesForEntityInRepo = this.syncInUtils.ensureRecordMapForRepoInTable(repositoryLocalId, operationHistory, recordDeletions);
        for (const recordHistory of operationHistory.recordHistory) {
            let recordCreationsForActorInRepoInTable = this.getRecordsForActor(recordHistory, recordCreationsForRepoInTable);
            // If a remotely deleted record was also created remotely
            if (recordCreationsForActorInRepoInTable
                && recordCreationsForActorInRepoInTable.get(recordHistory._actorRecordId)) {
                // remote deletions do not cause conflicts for remotely created records
                // Remove the creation of the record
                recordCreationsForActorInRepoInTable.delete(recordHistory._actorRecordId);
                // No need to record a deletion for a record that was also created (remotely)
                continue;
            }
            let recordUpdatesForActorInRepoInTable = this.getRecordsForActor(recordHistory, recordUpdatesForRepoInTable);
            // If a remotely deleted record has been updated (remotely)
            if (recordUpdatesForActorInRepoInTable
                && recordUpdatesForActorInRepoInTable.get(recordHistory._actorRecordId)) {
                // remote deletions do not cause conflicts for remotely updated records
                // Remove record updates for deleted records
                recordUpdatesForActorInRepoInTable.delete(recordHistory._actorRecordId);
            }
            if (this.getRecordHistoryLocalId(recordHistory, allLocalRecordDeletesForRepoInTable)) {
                // If the record has been deleted locally, no need to add another delete operation
                continue;
            }
            // record deletion
            ensureChildJsSet(deletesForEntityInRepo, recordHistory.actor._localId)
                .add(recordHistory._actorRecordId);
        }
    }
    getRecordsForRepoInTable(repositoryLocalId, operationHistory, recordMapByApplicationTableAndRepository) {
        const recordMapForApplication = recordMapByApplicationTableAndRepository
            .get(operationHistory.entity.applicationVersion._localId);
        let recordMapForTable;
        if (recordMapForApplication) {
            recordMapForTable = recordMapForApplication.get(operationHistory.entity._localId);
        }
        let recordMapForRepoInTable;
        if (recordMapForTable) {
            recordMapForRepoInTable = recordMapForTable.get(repositoryLocalId);
        }
        return recordMapForRepoInTable;
    }
    getRecord(recordHistory, recordMapByActor) {
        let recordsForActor = this.getRecordsForActor(recordHistory, recordMapByActor);
        if (!recordsForActor) {
            return null;
        }
        return recordsForActor.get(recordHistory._actorRecordId);
    }
    hasRecordId(recordHistory, actorRecordLocalIdSetByActor) {
        let actorRecordIdsForActor = this.getRecordsForActor(recordHistory, actorRecordLocalIdSetByActor);
        if (!actorRecordIdsForActor) {
            return false;
        }
        return actorRecordIdsForActor.has(recordHistory._actorRecordId);
    }
    getRecordHistoryLocalId(recordHistory, actorRecordLocalIdSetByActor) {
        let actorRecordIdsForActor = this.getRecordsForActor(recordHistory, actorRecordLocalIdSetByActor);
        if (!actorRecordIdsForActor) {
            return null;
        }
        return actorRecordIdsForActor.get(recordHistory._actorRecordId);
    }
    getRecordsForActor(recordHistory, recordMapByActor) {
        let recordsForActor;
        if (recordMapByActor) {
            recordsForActor = recordMapByActor.get(recordHistory.actor._localId);
        }
        return recordsForActor;
    }
    getRecordInfo(repositoryLocalId, operationHistory, recordHistory) {
        return `
		Application Version ID: ${operationHistory.entity.applicationVersion._localId}
		Entity ID:         ${operationHistory.entity._localId}
		Repository ID:     ${repositoryLocalId}
		Actor ID:          ${recordHistory.actor._localId}
		Actor Record ID:   ${recordHistory._actorRecordId}
		`;
    }
    addSyncConflict(synchronizationConflictType, repositoryLocalId, overwrittenRecordHistory, overwritingRecordHistory, syncConflictMapByRepoId) {
        const syncConflict = this.createSynchronizationConflict(synchronizationConflictType, repositoryLocalId, overwrittenRecordHistory, overwritingRecordHistory);
        ensureChildArray(syncConflictMapByRepoId, repositoryLocalId).push(syncConflict);
        return syncConflict;
    }
    createSynchronizationConflict(synchronizationConflictType, repositoryLocalId, overwrittenRecordHistory, overwritingRecordHistory) {
        return {
            _localId: null,
            overwrittenRecordHistory,
            overwritingRecordHistory,
            repository: {
                _localId: repositoryLocalId
            },
            type: synchronizationConflictType
        };
    }
    ensureColumnValueMap(recordHistory, dataMap) {
        return ensureChildJsMap(ensureChildJsMap(dataMap, recordHistory.actor._localId), recordHistory._actorRecordId);
    }
    ensureRecord(recordHistory, recordMapByActor) {
        return ensureChildJsMap(ensureChildJsMap(recordMapByActor, recordHistory.actor._localId), recordHistory._actorRecordId);
    }
};
__decorate([
    Inject()
], Stage1SyncedInDataProcessor.prototype, "actorDao", void 0);
__decorate([
    Inject()
], Stage1SyncedInDataProcessor.prototype, "airportDatabase", void 0);
__decorate([
    Inject()
], Stage1SyncedInDataProcessor.prototype, "repositoryTransactionHistoryDao", void 0);
__decorate([
    Inject()
], Stage1SyncedInDataProcessor.prototype, "repositoryTransactionHistoryDuo", void 0);
__decorate([
    Inject()
], Stage1SyncedInDataProcessor.prototype, "sequenceGenerator", void 0);
__decorate([
    Inject()
], Stage1SyncedInDataProcessor.prototype, "syncInUtils", void 0);
Stage1SyncedInDataProcessor = __decorate([
    Injected()
], Stage1SyncedInDataProcessor);
export { Stage1SyncedInDataProcessor };
//# sourceMappingURL=Stage1SyncedInDataProcessor.js.map