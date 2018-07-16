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
const InjectionTokens_1 = require("@airport/air-control/lib/InjectionTokens");
const typedi_1 = require("typedi");
const ddl_1 = require("../../ddl/ddl");
const generated_1 = require("../../generated/generated");
const InjectionTokens_2 = require("../../InjectionTokens");
let AgtSharingMessageDao = class AgtSharingMessageDao extends generated_1.BaseAgtSharingMessageDao {
    constructor(airportDb, utils) {
        super(utils);
        this.airportDb = airportDb;
    }
    insertValues(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const sharingMessageIdsByTerminalId = new Map();
            const dbEntity = generated_1.Q.db.currentVersion.entityMapByName.AgtSharingMessage;
            let asm;
            const sharingMessageIds = yield this.airportDb.db.insertValuesGenerateIds(dbEntity, {
                insertInto: asm = generated_1.Q.AgtSharingMessage,
                columns: [
                    asm.terminal.id,
                    asm.tmSharingMessageId,
                    asm.acknowledged,
                ],
                values
            });
            for (let i = 0; i < sharingMessageIds.length; i++) {
                const insertedRecord = values[i];
                sharingMessageIdsByTerminalId.set(insertedRecord[0], sharingMessageIds[i]);
            }
            return sharingMessageIdsByTerminalId;
        });
    }
    findNotSyncedByIdIn(agtSharingMessageIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultMapByTerminalId = new Map();
            let asm;
            const dbSyncLogs = yield this.airportDb.db.find.sheet({
                from: [
                    asm = generated_1.Q.AgtSharingMessage
                ],
                select: [
                    asm.terminal.id,
                    asm.id
                ],
                where: air_control_1.and(asm.id.in(agtSharingMessageIds), asm.acknowledged.equals(ddl_1.AgtSharingMessageAcknowledged.NOT_ACKNOWLEDGED))
            });
            for (const dbSyncLog of dbSyncLogs) {
                const terminalId = dbSyncLog[0];
                let syncLogMapForTerminal = resultMapByTerminalId.get(terminalId);
                if (!syncLogMapForTerminal) {
                    syncLogMapForTerminal = new Set();
                    resultMapByTerminalId.set(terminalId, syncLogMapForTerminal);
                }
                syncLogMapForTerminal.add(dbSyncLog[1]);
            }
            return resultMapByTerminalId;
        });
    }
    updateToAcked(agtSharingMessageIds) {
        return __awaiter(this, void 0, void 0, function* () {
            let asm;
            // TODO: verify the query works as required
            yield this.db.updateWhere({
                update: asm = generated_1.Q.AgtSharingMessage,
                set: {
                    acknowledged: ddl_1.AgtSharingMessageAcknowledged.ACKNOWLEDGED
                },
                where: asm.id.in(agtSharingMessageIds)
            });
        });
    }
    findIdMapByTerminalIdAndTmSharingMessageId(terminalIds, tmSharingMessageIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const idMapByTerminalIdAndTmSharingMessageId = new Map();
            let asm;
            const sharingMessages = yield this.airportDb.db.find.sheet({
                from: [
                    asm = generated_1.Q.AgtSharingMessage
                ],
                select: [
                    asm.terminal.id,
                    asm.tmSharingMessageId,
                    asm.id,
                ],
                where: air_control_1.and(asm.terminal.id.in(terminalIds), asm.tmSharingMessageId.in(tmSharingMessageIds))
            });
            for (const sharingMessage of sharingMessages) {
                this.utils.ensureChildJsMap(idMapByTerminalIdAndTmSharingMessageId, sharingMessage[0])
                    .set(sharingMessage[1], sharingMessage[2]);
            }
            return idMapByTerminalIdAndTmSharingMessageId;
        });
    }
    /**
     * AgtSharingMessage records are eventually aggregated into DailyAgtSharingMessage records,
     * which represent sync status of a given repository for all records of a given repository
     * on a given day.
     *
     * Terminals always sync to their Shard, and the Shard has all of the records needed by
     * all terminals in that shard.  This is because during sync record creation the Shards
     * owning the repository create those records in all Shards that have terminals pointing
     * to those repositories.  Hence, deleting TerminalSLs never has to cross shard boundaries
     *
     * Deleting AgtSharingMessage records can be done in two ways.  First, it can be done
     * on the bases of TerminalSLs not having any SyncLogs tied to them, this operation would still
     * have to make queries to other nodes to find out which TerminalSL ids are not present.  This
     * is not desired given that SyncLogs will be split be repository ids.
     *
     * A different version of this query is to delete TerminalSLs at the same time as SyncLogs,
     * using foreign key constraints.  This query would provide the repository ids and should
     * be quite a bit faster, given that it should go to targeted nodes for deletion of child
     * SyncLog records.  Additional state management is not required for this version, since
     * the query can also provide explicit SyncLogIds to be deleted as well (in theory).
     *
     * The second option can also only delete only TerminalSLs and leave SyncLogs alone, since they
     * can just be dropped with the daily partition.
     *
     * Both ways can take in TerminalIds, which makes it easy to split the query if the
     * AgtSharingMessage is split between nodes by terminal ids.
     *
     * TODO: inspect query plan
     *
     */
    deleteForAgtRepositoryIdsOnDate(fromDateInclusive, toDateExclusive, terminalIds, repositoryIds) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
AgtSharingMessageDao = __decorate([
    typedi_1.Service(InjectionTokens_2.AgtSharingMessageDaoToken),
    __param(0, typedi_1.Inject(air_control_1.AirportDatabaseToken)),
    __param(1, typedi_1.Inject(InjectionTokens_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object])
], AgtSharingMessageDao);
exports.AgtSharingMessageDao = AgtSharingMessageDao;
//# sourceMappingURL=AgtSharingMessageDao.js.map