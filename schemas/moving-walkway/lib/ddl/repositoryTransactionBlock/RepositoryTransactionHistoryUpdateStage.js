"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
let RepositoryTransactionHistoryUpdateStage = class RepositoryTransactionHistoryUpdateStage {
};
__decorate([
    air_control_1.Id(),
    air_control_1.Column({ name: "REPOSITORY_TRANSACTION_HISTORY_ID" })
], RepositoryTransactionHistoryUpdateStage.prototype, "repositoryTransactionHistoryId", void 0);
__decorate([
    air_control_1.Column({ name: "BLOCK_ID" })
], RepositoryTransactionHistoryUpdateStage.prototype, "blockId", void 0);
RepositoryTransactionHistoryUpdateStage = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "REPOSITORY_TRANSACTION_HISTORY_UPDATE_STAGE" })
], RepositoryTransactionHistoryUpdateStage);
exports.RepositoryTransactionHistoryUpdateStage = RepositoryTransactionHistoryUpdateStage;
//# sourceMappingURL=RepositoryTransactionHistoryUpdateStage.js.map