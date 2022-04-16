import { ALL_FIELDS, and, or, Y } from '@airport/air-control';
import { DI } from '@airport/di';
import { ensureChildArray, TransactionType } from '@airport/ground-control';
import { REPOSITORY_TRANSACTION_HISTORY_DAO, } from '../../tokens';
import { BaseRepositoryTransactionHistoryDao, Q } from '../../generated/generated';
export class RepositoryTransactionHistoryDao extends BaseRepositoryTransactionHistoryDao {
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
        const repoTransHistoryMapByRepositoryId = new Map();
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
            ensureChildArray(repoTransHistoryMapByRepositoryId, repoTransHistory.repository.id)
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
        return repoTransHistoryMapByRepositoryId;
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
}
DI.set(REPOSITORY_TRANSACTION_HISTORY_DAO, RepositoryTransactionHistoryDao);
//# sourceMappingURL=RepositoryTransactionHistoryDao.js.map