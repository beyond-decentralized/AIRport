"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class RepositoryTransactionHistoryDao extends generated_1.BaseRepositoryTransactionHistoryDao {
    getSelectClauseWithRecordHistory(operHistoryDuo, recHistoryDuo) {
        const id = air_control_1.Y;
        return {
            id,
            actor: {
                id
            },
            repository: {
                id
            },
            operationHistory: {
                ...operHistoryDuo.select.fields,
                entity: {
                    id: air_control_1.Y
                },
                recordHistory: {
                    ...recHistoryDuo.select.fields
                }
            },
        };
    }
    async findWhere(whereClauseFunction) {
        const [operHistoryDuo, recHistoryDuo] = await di_1.DI.get(diTokens_1.OPER_HISTORY_DUO, diTokens_1.REC_HISTORY_DUO);
        let rth, r, oh, rh;
        const id = air_control_1.Y;
        return await this.db.find.tree({
            select: this.getSelectClauseWithRecordHistory(operHistoryDuo, recHistoryDuo),
            from: [
                rth = generated_1.Q.RepositoryTransactionHistory,
                oh = rth.operationHistory.innerJoin(),
                rh = oh.recordHistory.innerJoin(),
            ],
            where: whereClauseFunction(rth, r, oh, rh)
        });
    }
    async findWhereIdsIn(idsInClause) {
        return await this.findWhere((rth) => rth.id.in(idsInClause));
    }
    async findWithActorAndRepositoryWhere(whereClauseFunction) {
        let rth, a, r;
        return await this.db.find.graph({
            select: {
                ...this.db.duo.select.fields,
                actor: {
                    randomId: air_control_1.Y,
                    user: {}
                },
                repository: {
                    orderedId: air_control_1.Y,
                    randomId: air_control_1.Y,
                    ownerActor: {}
                },
                transactionHistory: {
                    id: air_control_1.Y
                }
            },
            from: [
                rth = generated_1.Q.RepositoryTransactionHistory,
                a = rth.actor.innerJoin(),
                r = rth.repository.innerJoin(),
            ],
            where: whereClauseFunction(rth, a, r)
        });
    }
    async findWithActorAndRepositoryWherIdsIn(idsInClause) {
        return await this.findWithActorAndRepositoryWhere((rth) => rth.id.in(idsInClause));
    }
    async findAllLocalChangesForRecordIds(changedRecordIds) {
        const repoTransHistoryMapByRepositoryId = new Map();
        /*
                const trafficPatternQSchema = this.airDb.QM[
                    getSchemaName('npmjs.org','@airport/traffic-pattern')
                    ]
        */
        const rth = generated_1.Q.RepositoryTransactionHistory;
        const th = rth.transactionHistory.innerJoin();
        const oh = rth.operationHistory.leftJoin();
        const rh = oh.recordHistory.leftJoin();
        const nv = rh.newValues.leftJoin();
        let id = air_control_1.Y;
        const repositoryEquals = [];
        for (const [repositoryId, idsForRepository] of changedRecordIds) {
            const recordMapForRepository = idsForRepository.ids;
            const entityEquals = [];
            for (const [entityId, recordMapForEntity] of recordMapForRepository) {
                const actorEquals = [];
                for (const [actorId, recordsForActor] of recordMapForEntity) {
                    actorEquals.push(air_control_1.and(rh.actor.id.equals(actorId), rh.actorRecordId.in(Array.from(recordsForActor))));
                }
                entityEquals.push(air_control_1.and(oh.entity.id.equals(entityId), air_control_1.or(...actorEquals)));
            }
            repositoryEquals.push(air_control_1.and(rth.repository.id.equals(repositoryId), rth.saveTimestamp.greaterThanOrEquals(idsForRepository.firstChangeTime), air_control_1.or(...entityEquals)));
        }
        const repoTransHistories = await this.db.find.tree({
            select: {
                actor: {
                    id
                },
                repository: {
                    id
                },
                saveTimestamp: air_control_1.Y,
                operationHistory: {
                    orderNumber: air_control_1.Y,
                    changeType: air_control_1.Y,
                    entity: {
                        index: air_control_1.Y,
                        schemaVersion: {
                            integerVersion: air_control_1.Y,
                            schema: {
                                index: air_control_1.Y
                            }
                        }
                    },
                    recordHistory: {
                        newValues: {
                            columnIndex: air_control_1.Y,
                            newValue: air_control_1.Y
                        }
                    }
                }
            },
            from: [
                th,
                rth,
                oh,
                rh,
                nv
            ],
            where: air_control_1.and(th.transactionType.equals(ground_control_1.TransactionType.LOCAL), air_control_1.or(...repositoryEquals)),
            orderBy: [
                rth.repository.id.asc(),
                oh.orderNumber.desc()
            ]
        });
        for (const repoTransHistory of repoTransHistories) {
            ground_control_1.ensureChildArray(repoTransHistoryMapByRepositoryId, repoTransHistory.repository.id)
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
    async findExistingRecordIdMap(recordIdMap) {
        const existingRecordIdMap = new Map();
        const rth = generated_1.Q.RepositoryTransactionHistory, oh = rth.operationHistory.innerJoin(), rh = oh.recordHistory.innerJoin();
        const idsFragments = [];
        for (const [repositoryId, recordIdMapForRepository] of recordIdMap) {
            let tableFragments = [];
            for (const [entityId, recordIdMapForTableInRepository] of recordIdMapForRepository) {
                let actorIdsFragments = [];
                for (const [actorId, recordIdSetForActor] of recordIdMapForTableInRepository) {
                    actorIdsFragments.push(air_control_1.and(rh.actor.id.equals(actorId), rh.actorRecordId.in(Array.from(recordIdSetForActor))));
                }
                tableFragments.push(air_control_1.and(oh.entity.id.equals(entityId), air_control_1.or(...actorIdsFragments)));
            }
            idsFragments.push(air_control_1.and(rth.repository.id.equals(repositoryId), oh.changeType.equals(ground_control_1.ChangeType.INSERT_VALUES), air_control_1.or(...tableFragments)));
        }
        const airDb = await di_1.DI.get(air_control_1.AIR_DB);
        const records = await airDb.find.sheet({
            from: [
                rth,
                oh,
                rh
            ],
            select: air_control_1.distinct([
                rth.repository.id,
                oh.entity.id,
                rh.actor.id,
                rh.actorRecordId
            ]),
            where: air_control_1.or(...idsFragments)
        });
        for (const record of records) {
            ground_control_1.ensureChildJsSet(ground_control_1.ensureChildJsMap(ground_control_1.ensureChildJsMap(existingRecordIdMap, record[0]), record[1]), record[2]).add(record[3]);
        }
        return existingRecordIdMap;
    }
    async setBlockIdWhereId(getSetClause) {
        const rth = this.db.from;
        return await this.db.updateWhere({
            update: rth,
            set: {
                blockId: getSetClause(rth.id)
            }
        });
    }
}
exports.RepositoryTransactionHistoryDao = RepositoryTransactionHistoryDao;
di_1.DI.set(diTokens_1.REPO_TRANS_HISTORY_DAO, RepositoryTransactionHistoryDao);
//# sourceMappingURL=RepositoryTransactionHistoryDao.js.map