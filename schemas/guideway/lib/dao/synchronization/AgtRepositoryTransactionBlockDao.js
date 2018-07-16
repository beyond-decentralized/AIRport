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
const arrivals_n_departures_1 = require("@airport/arrivals-n-departures");
const typedi_1 = require("typedi");
const ddl_1 = require("../../ddl/ddl");
const generated_1 = require("../../generated/generated");
const InjectionTokens_1 = require("../../InjectionTokens");
let AgtRepositoryTransactionBlockDao = class AgtRepositoryTransactionBlockDao extends generated_1.BaseAgtRepositoryTransactionBlockDao {
    constructor(airportDb, utils) {
        super(utils);
        this.airportDb = airportDb;
    }
    findExistingDataIdMap(terminalIds, tmTransactionLogIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingDataIdMap = new Map();
            if (terminalIds instanceof Set) {
                terminalIds = Array.from(terminalIds);
            }
            if (tmTransactionLogIds instanceof Set) {
                tmTransactionLogIds = Array.from(tmTransactionLogIds);
            }
            let rtb;
            const records = yield this.airportDb.db.find.sheet({
                from: [
                    rtb = generated_1.Q.AgtRepositoryTransactionBlock
                ],
                select: [
                    rtb.id,
                    rtb.terminal.id,
                    rtb.tmRepositoryTransactionBlockId,
                    rtb.addDatetime
                ],
                where: air_control_1.and(rtb.terminal.id.in(terminalIds), rtb.tmRepositoryTransactionBlockId.in(tmTransactionLogIds))
            });
            for (const record of records) {
                this.utils.ensureChildJsMap(existingDataIdMap, record[1]).set(record[2], [record[0], record[2]]);
            }
            return existingDataIdMap;
        });
    }
    insertValues(
    // values must be sorted by TerminalId [1]
    values) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbEntity = generated_1.Q.db.currentVersion.entityMapByName.RealtimeAgtRepositoryTransactionBlock;
            let rtb;
            return yield this.airportDb.db
                .insertValuesGenerateIds(dbEntity, {
                insertInto: rtb = generated_1.Q.AgtRepositoryTransactionBlock,
                columns: [
                    rtb.repository.id,
                    rtb.terminal.id,
                    rtb.archivingStatus,
                    rtb.addDatetime,
                    rtb.tmRepositoryTransactionBlockId,
                    rtb.contents
                ],
                values
            });
        });
    }
    getAllAgtRepositoryTransactionBlocksToSend(terminalIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const rtbToSendMapByTerminalId = new Map();
            let rtb, tr, sl, sm;
            // TODO: once CockroachDb supports optimized (non-nested loop) correlated
            // query, test against NOT EXISTS and see which is faster
            const rtbsToSend = yield this.airportDb.find.tree({
                from: [
                    rtb = generated_1.Q.AgtRepositoryTransactionBlock,
                    tr = rtb.terminalRepositories.innerJoin()
                ],
                select: {
                    contentType: arrivals_n_departures_1.MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK,
                    agtAgtRepositoryTransactionBlockId: rtb.id,
                    terminalId: tr.terminal.id,
                    // agtRepositoryId: sr.repository.id,
                    // addDatetime: sr.addDatetime,
                    repositoryTransactionBlock: rtb.contents
                },
                where: air_control_1.and(
                // TODO: Need the fromDate to limit the number of partitions used in the query
                // sr.addDatetime.greaterThanOrEquals(fromDateInclusive),
                tr.terminal.id.in(terminalIds), rtb.id.notIn([{
                        from: [
                            sm = generated_1.Q.AgtSharingMessage,
                            sl = sm.syncLogs.innerJoin()
                        ],
                        select: sl.repositoryTransactionBlock.id,
                        where: air_control_1.and(
                        // TODO: Need the fromDate to limit the number of partitions used in the query
                        // sl.repositoryTransactionBlockAddDatetime.greaterThanOrEquals(fromDateInclusive),
                        sm.terminal.id.in(terminalIds), sm.acknowledged.equals(ddl_1.AgtSharingMessageAcknowledged.ACKNOWLEDGED))
                    }]))
            });
            for (const rtbToSend of rtbsToSend) {
                const terminalIdToSendTo = rtbToSend.terminalId;
                let rbsForTerminalId = rtbToSendMapByTerminalId.get(terminalIdToSendTo);
                if (!rbsForTerminalId) {
                    rbsForTerminalId = [];
                    rtbToSendMapByTerminalId.set(terminalIdToSendTo, rbsForTerminalId);
                }
                rbsForTerminalId.push(rtbToSend);
            }
            return rtbToSendMapByTerminalId;
        });
    }
    getAllUnreadChangesNotExists(fromDateInclusive, terminalIds, isRealtime, cursorSize, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let sr, r, dr, sl, dsl;
            // TODO: verify correctness of NOT EXISTS
            // TODO: test performance on CockroachDb vs TiDB for NOT EXISTS vs
            // NOT IN vs EXCEPT
            yield this.airportDb.find.sheet({
                from: [
                    sr = generated_1.Q.AgtRepositoryTransactionBlock,
                    r = sr.repository.innerJoin(),
                    dr = r.terminalRepositories.innerJoin()
                ],
                select: [
                    dr.terminal.id,
                    r.id,
                    sr.addDatetime,
                    sr.contents
                ],
                where: air_control_1.and(
                // Need the fromDate to limit the number of partitions used in the query
                sr.addDatetime.greaterThanOrEquals(fromDateInclusive), dr.terminal.id.in(terminalIds), air_control_1.not(air_control_1.exists({
                    from: [
                        dsl = generated_1.Q.AgtSharingMessage,
                        sl = dsl.syncLogs.innerJoin()
                    ],
                    select: [
                        dsl.id
                    ],
                    where: air_control_1.and(
                    // Need the fromDate to limit the number of partitions used in the query
                    // sl.repositoryTransactionBlockAddDatetime.greaterThanOrEquals(fromDateInclusive),
                    sl.repositoryTransactionBlock.id.equals(sr.id), dsl.acknowledged.equals(ddl_1.AgtSharingMessageAcknowledged.ACKNOWLEDGED))
                })))
            }, cursorSize, (batchData) => {
                callback(batchData);
            });
        });
    }
    reserveToArchive(fromDateInclusive, toDateExclusive, serverId, archivingStatus, numRepositoriesToReserve) {
        return __awaiter(this, void 0, void 0, function* () {
            let rtb, rtb2;
            return yield this.db.updateWhere({
                update: rtb = generated_1.Q.AgtRepositoryTransactionBlock,
                set: {
                    archivingServer: {
                        id: serverId
                    },
                    archivingStatus: ddl_1.ArchivingStatus.ARCHIVING_IN_PROGRESS,
                },
                where: air_control_1.and(rtb.addDatetime.greaterThanOrEquals(fromDateInclusive), rtb.addDatetime.lessThan(toDateExclusive), 
                // sr.archivingStatus.equals(archivingStatus),
                rtb.repository.id.in({
                    from: [
                        rtb2 = generated_1.Q.AgtRepositoryTransactionBlock
                    ],
                    select: {
                        repositoryId: air_control_1.distinct(rtb2.repository.id)
                    },
                    where: rtb2.archivingStatus.equals(archivingStatus),
                    limit: numRepositoriesToReserve
                }))
            });
        });
    }
    getAgtRepositoryTransactionBlocksToArchive(fromDateInclusive, toDateExclusive, serverId) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = [];
            const repositoryTransactionBlockIds = [];
            let rtb;
            const rtbsToArchive = yield this.airportDb.find.sheet({
                from: [
                    rtb = generated_1.Q.AgtRepositoryTransactionBlock,
                ],
                select: [
                    rtb.repository.id,
                    rtb.addDatetime,
                    rtb.id,
                    rtb.archivingStatus,
                    rtb.contents,
                ],
                where: air_control_1.and(rtb.addDatetime.greaterThanOrEquals(fromDateInclusive), rtb.addDatetime.lessThan(toDateExclusive), rtb.archivingServer.id.equals(serverId), rtb.archivingStatus.equals(ddl_1.ArchivingStatus.ARCHIVING_IN_PROGRESS)),
                orderBy: [
                    rtb.repository.id.asc(),
                    rtb.addDatetime.asc()
                ]
            });
            let lastAgtRepositoryId = rtbsToArchive[0][0];
            let currentRepositoryRtbs = [];
            for (const rtbToArchive of rtbsToArchive) {
                const currentAgtRepositoryId = rtbToArchive[0];
                if (lastAgtRepositoryId !== currentAgtRepositoryId) {
                    results.push([lastAgtRepositoryId, currentRepositoryRtbs]);
                    currentRepositoryRtbs = [];
                    lastAgtRepositoryId = currentAgtRepositoryId;
                }
                repositoryTransactionBlockIds.push(rtbToArchive[2]);
                currentRepositoryRtbs.push(rtbToArchive.slice(1));
            }
            if (currentRepositoryRtbs.length) {
                results.push([lastAgtRepositoryId, currentRepositoryRtbs]);
            }
            return [results, repositoryTransactionBlockIds];
        });
    }
    getAllStuckChangesToArchive(toDateExclusive, cursorSize, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let rtb;
            yield this.airportDb.find.sheet({
                from: [
                    rtb = generated_1.Q.AgtRepositoryTransactionBlock,
                ],
                select: [
                    rtb.id,
                    rtb.repository.id,
                    rtb.addDatetime,
                    rtb.contents
                ],
                where: air_control_1.and(rtb.addDatetime.lessThan(toDateExclusive), rtb.archivingStatus.equals(ddl_1.ArchivingStatus.ARCHIVING_IN_PROGRESS)),
                orderBy: [
                    rtb.repository.id.asc(),
                    rtb.addDatetime.asc()
                ]
            });
        });
    }
    markAllChangesAsArchived(fromDateInclusive, toDateExclusive, repositoryIds) {
        return __awaiter(this, void 0, void 0, function* () {
            let rtb;
            yield this.db.updateWhere({
                update: rtb = generated_1.Q.AgtRepositoryTransactionBlock,
                set: {
                    archivingStatus: ddl_1.ArchivingStatus.ARCHIVING_COMPLETE,
                },
                where: air_control_1.and(rtb.addDatetime.greaterThanOrEquals(fromDateInclusive), rtb.addDatetime.lessThan(toDateExclusive), rtb.archivingStatus.equals(ddl_1.ArchivingStatus.ARCHIVING_IN_PROGRESS), rtb.repository.id.in(repositoryIds))
            });
        });
    }
    markChangesAsArchived(repositoryTransactionBlockIds) {
        return __awaiter(this, void 0, void 0, function* () {
            let rtb;
            yield this.db.updateWhere({
                update: rtb = generated_1.Q.AgtRepositoryTransactionBlock,
                set: {
                    archivingStatus: ddl_1.ArchivingStatus.ARCHIVING_COMPLETE,
                },
                where: rtb.id.in(repositoryTransactionBlockIds)
            });
        });
    }
    deleteByIds(repositoryTransactionBlockIds) {
        return __awaiter(this, void 0, void 0, function* () {
            let rtb;
            return yield this.db.deleteWhere({
                deleteFrom: rtb = generated_1.Q.AgtRepositoryTransactionBlock,
                where: rtb.id.in(repositoryTransactionBlockIds)
            });
        });
    }
};
AgtRepositoryTransactionBlockDao = __decorate([
    typedi_1.Service(InjectionTokens_1.AgtRepositoryTransactionBlockDaoToken),
    __param(0, typedi_1.Inject(air_control_1.AirportDatabaseToken)),
    __param(1, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object])
], AgtRepositoryTransactionBlockDao);
exports.AgtRepositoryTransactionBlockDao = AgtRepositoryTransactionBlockDao;
//# sourceMappingURL=AgtRepositoryTransactionBlockDao.js.map