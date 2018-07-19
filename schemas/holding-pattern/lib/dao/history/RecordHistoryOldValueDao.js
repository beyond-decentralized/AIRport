"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const generated_1 = require("../../generated/generated");
const index_1 = require("../../index");
const InjectionTokens_1 = require("../../InjectionTokens");
let RecordHistoryOldValueDao = class RecordHistoryOldValueDao extends generated_1.BaseRecordHistoryOldValueDao {
    async findByRecordHistoryIdIn(recordHistoryIds) {
        let rhov;
        return await this.db.find.tree({
            select: {},
            from: [
                rhov = index_1.Q.RecordHistoryOldValue
            ],
            where: rhov.recordHistory.id.in(recordHistoryIds)
        });
    }
};
RecordHistoryOldValueDao = __decorate([
    typedi_1.Service(InjectionTokens_1.RecordHistoryOldValueDaoToken)
], RecordHistoryOldValueDao);
exports.RecordHistoryOldValueDao = RecordHistoryOldValueDao;
//# sourceMappingURL=RecordHistoryOldValueDao.js.map