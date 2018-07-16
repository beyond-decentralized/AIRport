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
let SharingNodeDao = class SharingNodeDao extends generated_1.BaseSharingNodeDao {
    constructor(utils) {
        super(utils);
    }
    findAllGroupedBySyncFrequency( //
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            const allBySyncFrequency = new Map();
            let sn;
            const sharingNodes = yield this.db.find.tree({
                select: Object.assign({}, this.db.dmo.getAllFieldsSelect()),
                from: [
                    sn = generated_1.Q.SharingNode
                ],
                orderBy: [
                    sn.syncFrequency.asc()
                ]
            });
            let lastSyncFrequency;
            let currentSyncFrequencyNodes = [];
            if (sharingNodes.length) {
                lastSyncFrequency = sharingNodes[0].syncFrequency;
            }
            for (const sharingNode of sharingNodes) {
                if (sharingNode.syncFrequency != lastSyncFrequency) {
                    allBySyncFrequency.set(lastSyncFrequency, currentSyncFrequencyNodes);
                    lastSyncFrequency = sharingNode.syncFrequency;
                    currentSyncFrequencyNodes = [];
                }
                currentSyncFrequencyNodes.push(sharingNode);
            }
            if (lastSyncFrequency) {
                allBySyncFrequency.set(lastSyncFrequency, currentSyncFrequencyNodes);
            }
            return allBySyncFrequency;
        });
    }
    updateIsActive(sharingNodeIds, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            let sn;
            yield this.db.updateWhere({
                update: sn = generated_1.Q.SharingNode,
                set: {
                    isActive: isActive
                },
                where: sn.id.in(sharingNodeIds)
            });
        });
    }
};
SharingNodeDao = __decorate([
    typedi_1.Service(InjectionTokens_1.SharingNodeDaoToken),
    __param(0, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object])
], SharingNodeDao);
exports.SharingNodeDao = SharingNodeDao;
//# sourceMappingURL=SharingNodeDao.js.map