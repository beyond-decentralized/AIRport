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
let OperationHistoryDmo = class OperationHistoryDmo extends generated_1.BaseOperationHistoryDmo {
    constructor(recordHistoryDmo) {
        super();
        this.recordHistoryDmo = recordHistoryDmo;
    }
    getNewRecord(entityChangeType, dbEntity, repositoryTransactionHistory) {
        let operationHistory = new ddl_1.OperationHistory();
        operationHistory.repositoryTransactionHistory = repositoryTransactionHistory;
        operationHistory.changeType = entityChangeType;
        operationHistory.orderNumber = ++repositoryTransactionHistory.transactionHistory.numberOfOperations;
        operationHistory.entity = dbEntity;
        operationHistory.schemaVersion = dbEntity.schemaVersion;
        return operationHistory;
    }
    sort(ew1, ew2) {
        let startId1 = ew1.orderNumber;
        let startId2 = ew2.orderNumber;
        if (startId1 > startId2) {
            return 1;
        }
        if (startId2 > startId1) {
            return -1;
        }
        return 0;
    }
    startRecordHistory(operationHistory, actorRecordId) {
        const recordHistory = this.recordHistoryDmo.getNewRecord(actorRecordId);
        operationHistory.recordHistory.push(recordHistory);
        operationHistory.repositoryTransactionHistory
            .transactionHistory.allRecordHistory.push(recordHistory);
        return recordHistory;
    }
};
OperationHistoryDmo = __decorate([
    typedi_1.Service(InjectionTokens_1.OperationHistoryDmoToken),
    __param(0, typedi_1.Inject(InjectionTokens_1.RecordHistoryDmoToken)),
    __metadata("design:paramtypes", [Object])
], OperationHistoryDmo);
exports.OperationHistoryDmo = OperationHistoryDmo;
//# sourceMappingURL=OperationHistoryDmo.js.map