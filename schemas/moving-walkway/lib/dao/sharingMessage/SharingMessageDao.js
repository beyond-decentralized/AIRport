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
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const typedi_1 = require("typedi");
const Inject_1 = require("typedi/decorators/Inject");
const generated_1 = require("../../generated/generated");
const InjectionTokens_1 = require("../../InjectionTokens");
let SharingMessageDao = class SharingMessageDao extends generated_1.BaseSharingMessageDao {
    constructor(airportDb, repositoryTransactionHistoryDao, recordHistoryNewValueDao, recordHistoryOldValueDao, utils) {
        super(utils);
        this.airportDb = airportDb;
        this.repositoryTransactionHistoryDao = repositoryTransactionHistoryDao;
        this.recordHistoryNewValueDao = recordHistoryNewValueDao;
        this.recordHistoryOldValueDao = recordHistoryOldValueDao;
    }
    /*
    async updateSyncStatusByAgtSharingMessageIds(
        messageSyncStatus: MessageSyncStatus,
        agtDatabaseSyncLogIds: AgtSharingMessageId[]
    ): Promise<void> {
        let sm: QSharingMessage;
        await this.db.updateWhere({
            update: sm = Q.SharingMessage,
            set: {
                messageSyncStatus
            },
            where: sm.agtDatabaseSyncLogId.in(agtDatabaseSyncLogIds)
        });
    }
*/
    /*
        async updateFromResponseStage( //
        ): Promise<number> {
            let sm: QSharingMessage;
            let smrs1: QSharingMessageResponseStage;
            let smrs2: QSharingMessageResponseStage;
            return await this.db.updateWhere({
                update: sm = Q.SharingMessage,
                set: {
                    agtDatabaseSyncLogId: field({
                        from: [
                            smrs1 = Q.SharingMessageResponseStage
                        ],
                        select: smrs1.agtDatabaseSyncLogId,
                        where: smrs1.id.equals(sm.id)
                    }),
                    syncStatus: SyncStatus.SYNCHRONIZED,
                    syncTimestamp: field({
                        from: [
                            smrs2 = Q.SharingMessageResponseStage
                        ],
                        select: smrs2.syncTimestamp,
                        where: smrs2.id.equals(sm.id)
                    })
                }
            });
        }*/
    async findAllSyncedSharingMessageIdsForSharingNodes(sharingNodeIds) {
        const sharingMessageIdsBySharingNodeId = new Map();
        let sm;
        const data = await this.airportDb.find.sheet({
            from: [
                sm = generated_1.Q.SharingMessage
            ],
            select: [
                sm.sharingNode.id,
                sm.id
            ],
            where: sm.sharingNode.id.in(sharingNodeIds)
        });
        for (const record of data) {
            this.utils.ensureChildArray(sharingMessageIdsBySharingNodeId, record[0])
                .push(record[1]);
        }
        return sharingMessageIdsBySharingNodeId;
    }
};
SharingMessageDao = __decorate([
    typedi_1.Service(InjectionTokens_1.SharingMessageDaoToken),
    __param(0, Inject_1.Inject(air_control_1.AirportDatabaseToken)),
    __param(1, Inject_1.Inject(holding_pattern_1.RepositoryTransactionHistoryDaoToken)),
    __param(2, Inject_1.Inject(holding_pattern_1.RecordHistoryNewValueDaoToken)),
    __param(3, Inject_1.Inject(holding_pattern_1.RecordHistoryOldValueDaoToken)),
    __param(4, Inject_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], SharingMessageDao);
exports.SharingMessageDao = SharingMessageDao;
//# sourceMappingURL=SharingMessageDao.js.map