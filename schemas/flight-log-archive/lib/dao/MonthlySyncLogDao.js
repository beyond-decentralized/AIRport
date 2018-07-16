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
class MonthlySyncLogDao extends baseDaos_1.BaseMonthlySyncLogDao {
    constructor(airportDb, utils) {
        super(utils);
        this.airportDb = airportDb;
    }
    findAllForDatabase(databaseId, synced, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let dsl;
            yield this.airportDb.find.sheet({
                from: [
                    dsl = qSchema_1.Q.MonthlySyncLog
                ],
                select: [
                    dsl.repositoryId,
                    dsl.month
                ],
                where: air_control_1.and(dsl.databaseId.equals(databaseId), dsl.synced.equals(synced))
            }, 1000, (syncSyncLogRows) => {
                callback(syncSyncLogRows);
            });
        });
    }
    updateSyncStatus(databaseId, repositoryIds, synced) {
        return __awaiter(this, void 0, void 0, function* () {
            let dsl;
            yield this.db.updateWhere({
                update: dsl = qSchema_1.Q.MonthlySyncLog,
                set: {
                    synced
                },
                where: air_control_1.and(dsl.databaseId.equals(databaseId), dsl.repositoryId.in(repositoryIds))
            });
        });
    }
}
exports.MonthlySyncLogDao = MonthlySyncLogDao;
//# sourceMappingURL=MonthlySyncLogDao.js.map