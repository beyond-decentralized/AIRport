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
const __1 = require("../..");
const generated_1 = require("../../generated/generated");
let RepositoryTransactionHistoryUpdateStageDao = class RepositoryTransactionHistoryUpdateStageDao extends __1.BaseRepositoryTransactionHistoryUpdateStageDao {
    constructor(airportDb, utils) {
        super(utils);
        this.airportDb = airportDb;
    }
    insertValues(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbEntity = generated_1.Q.db.currentVersion.entityMapByName.RepositoryTransactionHistoryUpdateStage;
            let rthus;
            return yield this.airportDb.db.insertValues(dbEntity, {
                insertInto: rthus = generated_1.Q.RepositoryTransactionHistoryUpdateStage,
                columns: [
                    rthus.repositoryTransactionHistoryId,
                    rthus.blockId
                ],
                values
            });
        });
    }
    updateRepositoryTransactionHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            const schemaName = '@airport/holding-pattern';
            const dbEntity = this.airportDb.schemaMapByName[schemaName]
                .currentVersion.entityMapByName['RepositoryTransactionHistory'];
            const rth = this.airportDb.qSchemaMapByName[schemaName].RepositoryTransactionHistory;
            let rthus;
            return yield this.airportDb.db.updateWhere(dbEntity, {
                update: rth,
                set: {
                    blockId: air_control_1.field({
                        from: [
                            rthus = generated_1.Q.RepositoryTransactionHistoryUpdateStage
                        ],
                        select: rthus.blockId,
                        where: rthus.repositoryTransactionHistoryId.equals(rth.id)
                    })
                }
            });
        });
    }
    delete( //
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.deleteWhere({
                deleteFrom: generated_1.Q.RepositoryTransactionHistoryUpdateStage
            });
        });
    }
};
RepositoryTransactionHistoryUpdateStageDao = __decorate([
    typedi_1.Service(__1.RepositoryTransactionHistoryUpdateStageDaoToken),
    __param(0, typedi_1.Inject(InjectionTokens_1.AirportDatabaseToken)),
    __param(1, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object])
], RepositoryTransactionHistoryUpdateStageDao);
exports.RepositoryTransactionHistoryUpdateStageDao = RepositoryTransactionHistoryUpdateStageDao;
//# sourceMappingURL=RepositoryTransactionHistoryUpdateStageDao.js.map