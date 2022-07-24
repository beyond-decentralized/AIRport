var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ALL_FIELDS, AND, OR, Y } from '@airport/tarmaq-query';
import { ensureChildArray, TransactionType } from '@airport/ground-control';
import { BaseRepositoryTransactionHistoryDao, Q, } from '../../generated/generated';
import { Injected } from '@airport/direction-indicator';
let RepositoryTransactionHistoryDao = class RepositoryTransactionHistoryDao extends BaseRepositoryTransactionHistoryDao {
    /*
    async clearContentsWhereIdsIn(
        repositoryTransactionBlockIds: TmRepositoryTransactionBlockId[]
    ): Promise<void> {
        const rtb: QRepositoryTransactionBlock = Q.QRepositoryTransactionBlock
        await this.db.updateWhere({
            UPDATE: rtb,
            SET: {
                contents: null
            },
            WHERE: rtb._localId.IN(repositoryTransactionBlockIds)
        })
    }
    */
    async findWhereGUIDsIn(GUIDs) {
        let rth;
        return await this.db.find.tree({
            SELECT: {
                GUID: Y
            },
            FROM: [
                rth = Q.RepositoryTransactionHistory
            ],
            WHERE: rth.GUID.IN(GUIDs)
        });
    }
    async findAllLocalChangesForRecordIds(changedRecordIds) {
        const repositoryTransactionHistoryMapByRepositoryId = new Map();
        const rth = Q.RepositoryTransactionHistory;
        const th = rth.transactionHistory.innerJoin();
        const oh = rth.operationHistory.leftJoin();
        const ae = oh.entity.leftJoin();
        const av = ae.applicationVersion.leftJoin();
        const rh = oh.recordHistory.leftJoin();
        const nv = rh.newValues.leftJoin();
        let _localId = Y;
        const repositoryEquals = [];
        for (const [repositoryId, idsForRepository] of changedRecordIds) {
            const recordMapForRepository = idsForRepository.actorRecordIdsByLocalIds;
            const entityEquals = [];
            for (const [entityId, recordMapForEntity] of recordMapForRepository) {
                const actorEquals = [];
                for (const [actorId, recordsForActor] of recordMapForEntity) {
                    actorEquals.push(AND(oh.actor._localId.equals(actorId), rh._actorRecordId.IN(Array.from(recordsForActor))));
                }
                entityEquals.push(AND(oh.entity._localId.equals(entityId), OR(...actorEquals)));
            }
            repositoryEquals.push(AND(rth.repository._localId.equals(repositoryId), rth.saveTimestamp.greaterThanOrEquals(idsForRepository.firstChangeTime), OR(...entityEquals)));
        }
        const repoTransHistories = await this.db.find.tree({
            SELECT: {
                ...ALL_FIELDS,
                operationHistory: {
                    orderNumber: Y,
                    changeType: Y,
                    entity: {
                        _localId,
                        // index: Y,
                        applicationVersion: {
                            _localId: Y,
                            // integerVersion: Y,
                            // application: {
                            // 	index: Y
                            // }
                        }
                    },
                    recordHistory: {
                        _localId,
                        newValues: {
                            columnIndex: Y,
                            newValue: Y
                        }
                    }
                }
            },
            FROM: [
                rth,
                th,
                oh,
                ae,
                av,
                rh,
                nv
            ],
            WHERE: AND(th.transactionType.equals(TransactionType.LOCAL), OR(...repositoryEquals)),
            // ORDER_BY: [
            // 	rth.repository._localId.asc()
            // ]
        });
        for (const repoTransHistory of repoTransHistories) {
            ensureChildArray(repositoryTransactionHistoryMapByRepositoryId, repoTransHistory.repository._localId)
                .push(repoTransHistory);
            repoTransHistory.operationHistory.sort((rth1, rth2) => {
                if (rth1.orderNumber < rth2.orderNumber) {
                    return -1;
                }
                if (rth1.orderNumber > rth2.orderNumber) {
                    return 1;
                }
                return 0;
            });
        }
        return repositoryTransactionHistoryMapByRepositoryId;
    }
    async updateSyncTimestamp(repositoryTransactionHistory) {
        let rth;
        await this.db.updateWhere({
            UPDATE: rth = Q.RepositoryTransactionHistory,
            SET: {
                syncTimestamp: repositoryTransactionHistory.syncTimestamp
            },
            WHERE: rth._localId.equals(repositoryTransactionHistory._localId)
        });
    }
};
RepositoryTransactionHistoryDao = __decorate([
    Injected()
], RepositoryTransactionHistoryDao);
export { RepositoryTransactionHistoryDao };
//# sourceMappingURL=RepositoryTransactionHistoryDao.js.map