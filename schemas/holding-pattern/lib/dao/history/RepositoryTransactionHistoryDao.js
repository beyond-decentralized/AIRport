var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ALL_FIELDS, and, or, Y } from '@airport/air-control';
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
            update: rtb,
            set: {
                contents: null
            },
            where: rtb.id.in(repositoryTransactionBlockIds)
        })
    }
    */
    async findWhereUuIdsIn(uuIds) {
        let rth;
        return await this.db.find.tree({
            select: {
                uuId: Y
            },
            from: [
                rth = Q.RepositoryTransactionHistory
            ],
            where: rth.uuId.in(uuIds)
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
        let id = Y;
        const repositoryEquals = [];
        for (const [repositoryId, idsForRepository] of changedRecordIds) {
            const recordMapForRepository = idsForRepository.ids;
            const entityEquals = [];
            for (const [entityId, recordMapForEntity] of recordMapForRepository) {
                const actorEquals = [];
                for (const [actorId, recordsForActor] of recordMapForEntity) {
                    actorEquals.push(and(oh.actor.id.equals(actorId), rh.actorRecordId.in(Array.from(recordsForActor))));
                }
                entityEquals.push(and(oh.entity.id.equals(entityId), or(...actorEquals)));
            }
            repositoryEquals.push(and(rth.repository.id.equals(repositoryId), rth.saveTimestamp.greaterThanOrEquals(idsForRepository.firstChangeTime), or(...entityEquals)));
        }
        const repoTransHistories = await this.db.find.tree({
            select: {
                ...ALL_FIELDS,
                operationHistory: {
                    orderNumber: Y,
                    changeType: Y,
                    entity: {
                        id,
                        // index: Y,
                        applicationVersion: {
                            id: Y,
                            // integerVersion: Y,
                            // application: {
                            // 	index: Y
                            // }
                        }
                    },
                    recordHistory: {
                        id,
                        newValues: {
                            columnIndex: Y,
                            newValue: Y
                        }
                    }
                }
            },
            from: [
                rth,
                th,
                oh,
                ae,
                av,
                rh,
                nv
            ],
            where: and(th.transactionType.equals(TransactionType.LOCAL), or(...repositoryEquals)),
            // orderBy: [
            // 	rth.repository.id.asc()
            // ]
        });
        for (const repoTransHistory of repoTransHistories) {
            ensureChildArray(repositoryTransactionHistoryMapByRepositoryId, repoTransHistory.repository.id)
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
            update: rth = Q.RepositoryTransactionHistory,
            set: {
                syncTimestamp: repositoryTransactionHistory.syncTimestamp
            },
            where: rth.id.equals(repositoryTransactionHistory.id)
        });
    }
};
RepositoryTransactionHistoryDao = __decorate([
    Injected()
], RepositoryTransactionHistoryDao);
export { RepositoryTransactionHistoryDao };
//# sourceMappingURL=RepositoryTransactionHistoryDao.js.map