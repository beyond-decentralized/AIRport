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
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
const typedi_1 = require("typedi");
const Inject_1 = require("typedi/decorators/Inject");
const generated_1 = require("../../generated/generated");
const InjectionTokens_1 = require("../../InjectionTokens");
let RepositoryTransactionHistoryDao = class RepositoryTransactionHistoryDao extends generated_1.BaseRepositoryTransactionHistoryDao {
    constructor(airportDb, operationHistoryDmo, recordHistoryDmo, utils) {
        super(utils);
        this.airportDb = airportDb;
        this.operationHistoryDmo = operationHistoryDmo;
        this.recordHistoryDmo = recordHistoryDmo;
    }
    getSelectClauseWithRecordHistory() {
        const id = air_control_1.Y;
        return {
            id,
            actor: {
                id
            },
            repository: {
                id
            },
            operationHistory: Object.assign({}, this.operationHistoryDmo.getAllFieldsSelect(), { schemaVersion: {
                    id: air_control_1.Y
                }, entity: {
                    index: air_control_1.Y
                }, recordHistory: Object.assign({}, this.recordHistoryDmo.getAllFieldsSelect()) }),
        };
    }
    findWhere(whereClauseFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            let rth, r, oh, rh;
            const id = air_control_1.Y;
            return yield this.db.find.tree({
                select: this.getSelectClauseWithRecordHistory(),
                from: [
                    rth = generated_1.Q.RepositoryTransactionHistory,
                    oh = rth.operationHistory.innerJoin(),
                    rh = oh.recordHistory.innerJoin(),
                ],
                where: whereClauseFunction(rth, r, oh, rh)
            });
        });
    }
    findWhereIdsIn(idsInClause) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findWhere((rth) => rth.id.in(idsInClause));
        });
    }
    findWithActorAndRepositoryWhere(whereClauseFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            let rth, a, r;
            return yield this.db.find.graph({
                select: Object.assign({}, this.db.dmo.getAllFieldsSelect(), { actor: {
                        user: {},
                        database: {},
                    }, repository: {
                        orderedId: air_control_1.Y,
                        randomId: air_control_1.Y,
                        actor: {}
                    }, transactionHistory: {
                        id: air_control_1.Y
                    } }),
                from: [
                    rth = generated_1.Q.RepositoryTransactionHistory,
                    a = rth.actor.innerJoin(),
                    r = rth.repository.innerJoin(),
                ],
                where: whereClauseFunction(rth, a, r)
            });
        });
    }
    findWithActorAndRepositoryWherIdsIn(idsInClause) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findWithActorAndRepositoryWhere((rth) => rth.id.in(idsInClause));
        });
    }
    findAllLocalChangesForRecordIds(changedRecordIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const repoTransHistoryMapByRepositoryId = new Map();
            const trafficPatternQSchema = this.airportDb.qSchemaMapByName['@airport/traffic-pattern'];
            const rth = generated_1.Q.RepositoryTransactionHistory;
            const th = rth.transactionHistory.innerJoin();
            const oh = rth.operationHistory.leftJoin();
            const rh = oh.recordHistory.leftJoin();
            const nv = rh.newValues.leftJoin();
            let id = air_control_1.Y;
            const repositoryEquals = [];
            for (const [repositoryId, idsForRepository] of changedRecordIds) {
                const recordMapForRepository = idsForRepository.ids;
                const schemaEquals = [];
                for (const [schemaVersionId, recordMapForSchema] of recordMapForRepository) {
                    const entityEquals = [];
                    for (const [entityIndex, recordMapForEntity] of recordMapForSchema) {
                        const actorEquals = [];
                        for (const [actorId, recordsForActor] of recordMapForEntity) {
                            actorEquals.push(air_control_1.and(rh.actor.id.equals(actorId), rh.actorRecordId.in(Array.from(recordsForActor))));
                        }
                        entityEquals.push(air_control_1.and(oh.entity.index.equals(entityIndex), air_control_1.or(...actorEquals)));
                    }
                    const sv = trafficPatternQSchema.SchemaVersion;
                    schemaEquals.push(air_control_1.and(oh.schemaVersion.id.in(air_control_1.field({
                        from: [
                            sv
                        ],
                        select: sv.id,
                        where: sv.id.equals(schemaVersionId)
                    })), air_control_1.or(...entityEquals)));
                }
                repositoryEquals.push(air_control_1.and(rth.repository.id.equals(repositoryId), rth.saveTimestamp.greaterThanOrEquals(idsForRepository.firstChangeTime), air_control_1.or(...schemaEquals)));
            }
            const repoTransHistories = yield this.db.find.tree({
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
                        schema: {
                            index: air_control_1.Y
                        },
                        entity: {
                            index: air_control_1.Y
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
                this.utils.ensureChildArray(repoTransHistoryMapByRepositoryId, repoTransHistory.repository.id)
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
        });
    }
    findExistingRecordIdMap(recordIdMap) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingRecordIdMap = new Map();
            const rth = generated_1.Q.RepositoryTransactionHistory, oh = rth.operationHistory.innerJoin(), rh = oh.recordHistory.innerJoin();
            const idsFragments = [];
            for (const [repositoryId, recordIdMapForRepository] of recordIdMap) {
                let schemaFragments = [];
                for (const [schemaVersionId, recordIdMapForSchemaInRepository] of recordIdMapForRepository) {
                    let tableFragments = [];
                    for (const [tableIndex, recordIdMapForTableInRepository] of recordIdMapForSchemaInRepository) {
                        let actorIdsFragments = [];
                        for (const [actorId, recordIdSetForActor] of recordIdMapForTableInRepository) {
                            actorIdsFragments.push(air_control_1.and(rh.actor.id.equals(actorId), rh.actorRecordId.in(Array.from(recordIdSetForActor))));
                        }
                        tableFragments.push(air_control_1.and(oh.entity.index.equals(tableIndex), air_control_1.or(...actorIdsFragments)));
                    }
                    schemaFragments.push(air_control_1.and(oh.schemaVersion.id.equals(schemaVersionId), air_control_1.or(...tableFragments)));
                }
                idsFragments.push(air_control_1.and(rth.repository.id.equals(repositoryId), oh.changeType.equals(ground_control_1.ChangeType.INSERT_VALUES), air_control_1.or(...schemaFragments)));
            }
            const records = yield this.airportDb.find.sheet({
                from: [
                    rth,
                    oh,
                    rh
                ],
                select: air_control_1.distinct([
                    rth.repository.id,
                    oh.schemaVersion.id,
                    oh.entity.index,
                    rh.actor.id,
                    rh.actorRecordId
                ]),
                where: air_control_1.or(...idsFragments)
            });
            for (const record of records) {
                this.utils.ensureChildJsSet(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(existingRecordIdMap, record[0]), record[1]), record[2]), record[3]).add(record[4]);
            }
            return existingRecordIdMap;
        });
    }
};
RepositoryTransactionHistoryDao = __decorate([
    typedi_1.Service(InjectionTokens_1.RepositoryTransactionHistoryDaoToken),
    __param(0, Inject_1.Inject(air_control_1.AirportDatabaseToken)),
    __param(1, Inject_1.Inject(InjectionTokens_1.OperationHistoryDmoToken)),
    __param(2, Inject_1.Inject(InjectionTokens_1.RecordHistoryDmoToken)),
    __param(3, Inject_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], RepositoryTransactionHistoryDao);
exports.RepositoryTransactionHistoryDao = RepositoryTransactionHistoryDao;
//# sourceMappingURL=RepositoryTransactionHistoryDao.js.map