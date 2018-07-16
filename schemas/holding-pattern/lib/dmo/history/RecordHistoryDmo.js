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
const typedi_1 = require("typedi");
const ddl_1 = require("../../ddl/ddl");
const generated_1 = require("../../generated/generated");
const InjectionTokens_1 = require("../../InjectionTokens");
let RecordHistoryDmo = class RecordHistoryDmo extends generated_1.BaseRecordHistoryDmo {
    constructor(recordHistoryNewValueDmo, recordHistoryOldValueDmo) {
        super();
        this.recordHistoryNewValueDmo = recordHistoryNewValueDmo;
        this.recordHistoryOldValueDmo = recordHistoryOldValueDmo;
    }
    getNewRecord(actorRecordId) {
        const recordHistory = new ddl_1.RecordHistory();
        recordHistory.actorRecordId = actorRecordId;
        return recordHistory;
    }
    addNewValue(recordHistory, dbColumn, newValue) {
        const recordHistoryNewValue = this.recordHistoryNewValueDmo.getNewRecord(recordHistory, dbColumn, newValue);
        recordHistory.newValues.push(recordHistoryNewValue);
        recordHistory.operationHistory.repositoryTransactionHistory
            .transactionHistory.allRecordHistoryNewValues.push(recordHistoryNewValue);
        return recordHistoryNewValue;
    }
    addOldValue(recordHistory, dbColumn, oldValue) {
        const recordHistoryOldValue = this.recordHistoryOldValueDmo.getNewRecord(recordHistory, dbColumn, oldValue);
        recordHistory.oldValues.push(recordHistoryOldValue);
        recordHistory.operationHistory.repositoryTransactionHistory
            .transactionHistory.allRecordHistoryOldValues.push(recordHistoryOldValue);
        return recordHistoryOldValue;
    }
};
RecordHistoryDmo = __decorate([
    typedi_1.Service(InjectionTokens_1.RecordHistoryDmoToken),
    __param(0, typedi_1.Inject(_ => InjectionTokens_1.RecordHistoryNewValueDmoToken)),
    __param(1, typedi_1.Inject(_ => InjectionTokens_1.RecordHistoryOldValueDmoToken)),
    __metadata("design:paramtypes", [Object, Object])
], RecordHistoryDmo);
exports.RecordHistoryDmo = RecordHistoryDmo;
//# sourceMappingURL=RecordHistoryDmo.js.map