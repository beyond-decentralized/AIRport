"use strict";
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
const baseDaos_1 = require("../generated/baseDaos");
const qSchema_1 = require("../generated/qSchema");
class DailySyncLogDao extends baseDaos_1.BaseDailySyncLogDao {
    constructor(airportDb, utils) {
        super(utils);
        this.airportDb = airportDb;
    }
    insertValues(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbEntity = qSchema_1.Q.db.currentVersion.entityMapByName.RealtimeSyncLog;
            let dsl;
            yield this.airportDb.db.insertValues(dbEntity, {
                insertInto: dsl = qSchema_1.Q.DailySyncLog,
                columns: [
                    dsl.databaseId,
                    dsl.repositoryId,
                    // dsl.synced,
                    dsl.date
                ],
                values
            });
        });
    }
    findAllForDatabase(databaseId, synced, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let dsl;
            yield this.airportDb.find.sheet({
                from: [
                    dsl = qSchema_1.Q.DailySyncLog
                ],
                select: [
                    dsl.repositoryId,
                    dsl.date
                ],
                where: // and(
                dsl.databaseId.equals(databaseId),
            }, 1000, (syncSyncLogRows) => {
                callback(syncSyncLogRows);
            });
        });
    }
    updateSyncStatus(databaseId, repositoryIds, synced) {
        return __awaiter(this, void 0, void 0, function* () {
            let dsl;
            yield this.db.updateWhere({
                update: dsl = qSchema_1.Q.DailySyncLog,
                set: {
                    synced
                },
                where: air_control_1.and(dsl.databaseId.equals(databaseId), dsl.repositoryId.in(repositoryIds))
            });
        });
    }
    findMonthlyResults(databaseIds, fromDateInclusive, toDateExclusive) {
        return __awaiter(this, void 0, void 0, function* () {
            let dsl;
            return yield this.airportDb.find.sheet({
                from: [
                    dsl = qSchema_1.Q.DailySyncLog
                ],
                select: air_control_1.distinct([
                    dsl.databaseId,
                    dsl.repositoryId,
                ]),
                where: air_control_1.and(dsl.databaseId.in(databaseIds), dsl.date.greaterThanOrEquals(fromDateInclusive), dsl.date.lessThan(toDateExclusive)),
                orderBy: [
                    dsl.databaseId.asc(),
                    dsl.repositoryId.asc()
                ]
            });
        });
    }
}
exports.DailySyncLogDao = DailySyncLogDao;
//# sourceMappingURL=DailySyncLogDao.js.map