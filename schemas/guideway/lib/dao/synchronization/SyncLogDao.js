"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const InjectionTokens_1 = require("@airport/air-control/lib/InjectionTokens");
const typedi_1 = require("typedi");
const ddl_1 = require("../../ddl/ddl");
const generated_1 = require("../../generated/generated");
const diTokens_1 = require("../../diTokens");
let SyncLogDao = class SyncLogDao extends generated_1.BaseSyncLogDao {
    constructor(airportDb, utils) {
        super(utils);
        this.airportDb = airportDb;
    }
    async insertValues(values) {
        const dbEntity = generated_1.Q.db.currentVersion.entityMapByName.RealtimeSyncLog;
        let sl;
        await this.airportDb.db.insertValues(dbEntity, {
            insertInto: sl = generated_1.Q.SyncLog,
            columns: [
                sl.repositoryTransactionBlock.id,
                // sl.repositoryTransactionBlockAddDatetime,
                sl.sharingMessage.id,
            ],
            values
        });
    }
    async selectSyncedTerminalRepositories(fromDateInclusive, toDateExlusive, repositoryIds) {
        const syncedTerminalRepositories = [];
        const dbSyncStatuses = await this.selectTmSyncStatusForAgtRepositoryIds(fromDateInclusive, toDateExlusive, repositoryIds);
        for (const dbSyncStatus of dbSyncStatuses) {
            if (dbSyncStatus[2] === ddl_1.AgtSharingMessageAcknowledged.ACKNOWLEDGED) {
                syncedTerminalRepositories.push([dbSyncStatus[0], dbSyncStatus[1]]);
            }
        }
        return syncedTerminalRepositories;
    }
    /**
     * This query is input into insert of DailySyncLog records.
     *
     * Cursor consideration:  ORDER BY and Cursor may not work well together.  Cursor is not
     * as big of a need here, since the query is limited by repository ids and is only run
     * by the archival process.
     *
     * @param {AgtAgtRepositoryTransactionBlockAddDatetime} fromDateInclusive
     * @param {AgtAgtRepositoryTransactionBlockAddDatetime} toDateExlusive
     * @param {AgtRepositoryId[]} repositoryIds
     * @returns {Promise<TerminalSyncStatus[]>}
     */
    async selectTmSyncStatusForAgtRepositoryIds(fromDateInclusive, toDateExlusive, repositoryIds) {
        let sl, sm, rtb;
        // AgtRepositoryTransactionBlock Sub-Query
        const smrtb = air_control_1.tree({
            from: [
                sl = generated_1.Q.SyncLog,
                sm = sl.sharingMessage.innerJoin(),
                rtb = sl.repositoryTransactionBlock.innerJoin()
            ],
            select: {
                repositoryTransactionBlockId: rtb.id,
                terminalId: sm.terminal.id,
                repositoryId: rtb.repository.id,
                maxAcked: air_control_1.max(sm.acknowledged),
            },
            where: air_control_1.and(
            // sl.repositoryTransactionBlockAddDatetime.greaterThanOrEquals(fromDateInclusive),
            // sl.repositoryTransactionBlockAddDatetime.lessThan(toDateExlusive),
            rtb.addDatetime.greaterThanOrEquals(fromDateInclusive), rtb.addDatetime.lessThan(toDateExlusive), rtb.repository.id.in(repositoryIds)),
            groupBy: [
                rtb.id,
                sm.terminal.id,
                rtb.repository.id
            ],
            orderBy: [
                rtb.repository.id.asc(),
                sm.terminal.id.asc(),
            ]
        });
        return await this.airportDb.find.sheet({
            from: [
                smrtb
            ],
            select: [
                smrtb.terminalId,
                smrtb.repositoryId,
                air_control_1.min(smrtb.maxAcked)
            ],
            groupBy: [
                smrtb.terminalId,
                smrtb.repositoryId
            ]
        });
    }
};
SyncLogDao = __decorate([
    typedi_1.Service(diTokens_1.SYNC_LOG_DAO),
    __param(0, typedi_1.Inject(air_control_1.AirportDatabaseToken)),
    __param(1, typedi_1.Inject(InjectionTokens_1.UtilsToken))
], SyncLogDao);
exports.SyncLogDao = SyncLogDao;
//# sourceMappingURL=SyncLogDao.js.map