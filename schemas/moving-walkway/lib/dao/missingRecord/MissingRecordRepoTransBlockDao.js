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
const typedi_1 = require("typedi");
const generated_1 = require("../../generated/generated");
const InjectionTokens_1 = require("../../InjectionTokens");
let MissingRecordRepoTransBlockDao = class MissingRecordRepoTransBlockDao extends generated_1.BaseMissingRecordRepoTransBlockDao {
    constructor(utils) {
        super(utils);
    }
    deleteWhereMissingRecordIdsIn(missingRecordIds) {
        return __awaiter(this, void 0, void 0, function* () {
            let mrrtb;
            yield this.db.deleteWhere({
                deleteFrom: mrrtb = generated_1.Q.MissingRecordSharingMessage,
                where: mrrtb.missingRecord.id.in(missingRecordIds)
            });
        });
    }
};
MissingRecordRepoTransBlockDao = __decorate([
    typedi_1.Service(InjectionTokens_1.MissingRecordRepoTransBlockDaoToken),
    __param(0, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object])
], MissingRecordRepoTransBlockDao);
exports.MissingRecordRepoTransBlockDao = MissingRecordRepoTransBlockDao;
//# sourceMappingURL=MissingRecordRepoTransBlockDao.js.map