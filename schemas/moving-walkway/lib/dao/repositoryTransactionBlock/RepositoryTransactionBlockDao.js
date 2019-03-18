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
const typedi_1 = require("typedi");
const generated_1 = require("../../generated/generated");
const InjectionTokens_1 = require("../../InjectionTokens");
let RepositoryTransactionBlockDao = class RepositoryTransactionBlockDao extends generated_1.BaseRepositoryTransactionBlockDao {
    constructor(utils, dmo) {
        super(utils);
        this.dmo = dmo;
    }
    async updateFromResponseStage( //
    ) {
        let rtb;
        // let rtbrs1: QRepoTransBlockResponseStage;
        let rtbrs2;
        return await this.db.updateWhere({
            update: rtb = generated_1.Q.RepositoryTransactionBlock,
            set: {
                // agtSyncRecordId: field({
                // 	from: [
                // 		rtbrs1 = Q.RepoTransBlockResponseStage
                // 	],
                // 	select: rtbrs1.agtSyncRecordId,
                // 	where: rtbrs1.id.equals(rtb.id)
                // }),
                syncOutcomeType: air_control_1.field({
                    from: [
                        rtbrs2 = generated_1.Q.RepoTransBlockResponseStage
                    ],
                    select: rtbrs2.syncOutcomeType,
                    where: rtbrs2.id.equals(rtb.id)
                })
            }
        });
    }
    async findWithMissingRecordIdsAndNoMissingRecordsWithStatus(missingRecordIds, status) {
        let rtb, mrrtb, mr;
        return await this.db.find.tree({
            select: air_control_1.distinct({}),
            from: [
                rtb = generated_1.Q.RepositoryTransactionBlock,
                mrrtb = rtb.missingRecordRepoTransBlocks.innerJoin(),
                mr = mrrtb.missingRecord.innerJoin()
            ],
            where: air_control_1.and(mr.id.in(missingRecordIds), air_control_1.not(mr.status.equals(status)))
        });
    }
    async clearContentsWhereIdsIn(repositoryTransactionBlockIds) {
        const rtb = generated_1.Q.QRepositoryTransactionBlock;
        await this.db.updateWhere({
            update: rtb,
            set: {
                contents: null
            },
            where: rtb.id.in(repositoryTransactionBlockIds)
        });
    }
};
RepositoryTransactionBlockDao = __decorate([
    typedi_1.Service(InjectionTokens_1.RepositoryTransactionBlockDaoToken),
    __param(0, typedi_1.Inject(air_control_1.UtilsToken)),
    __param(1, typedi_1.Inject(InjectionTokens_1.RepositoryTransactionBlockDmoToken))
], RepositoryTransactionBlockDao);
exports.RepositoryTransactionBlockDao = RepositoryTransactionBlockDao;
//# sourceMappingURL=RepositoryTransactionBlockDao.js.map