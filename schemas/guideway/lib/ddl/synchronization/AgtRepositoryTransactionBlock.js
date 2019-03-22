"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
let AgtRepositoryTransactionBlock = 
// TODO: partition by add date for efficient dropping of records
class AgtRepositoryTransactionBlock {
};
__decorate([
    air_control_1.Id(),
    air_control_1.GeneratedValue(),
    air_control_1.DbNumber()
], AgtRepositoryTransactionBlock.prototype, "id", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "REPOSITORY_ID", referencedColumnName: 'ID', nullable: false })
], AgtRepositoryTransactionBlock.prototype, "repository", void 0);
__decorate([
    air_control_1.OneToMany(),
    air_control_1.JoinColumn({ name: "REPOSITORY_ID", nullable: false })
], AgtRepositoryTransactionBlock.prototype, "terminalRepositories", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "TERMINAL_ID", referencedColumnName: 'ID', nullable: false })
], AgtRepositoryTransactionBlock.prototype, "terminal", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "ARCHIVING_SERVER_ID", referencedColumnName: "ID" })
], AgtRepositoryTransactionBlock.prototype, "archivingServer", void 0);
__decorate([
    air_control_1.Column({ name: "ARCHIVING_STATUS", nullable: false }),
    air_control_1.DbNumber()
], AgtRepositoryTransactionBlock.prototype, "archivingStatus", void 0);
__decorate([
    air_control_1.Column({ name: "ADD_DATETIME", nullable: false })
], AgtRepositoryTransactionBlock.prototype, "addDatetime", void 0);
__decorate([
    air_control_1.Column({ name: "TM_REPOSITORY_TRANSACTION_BLOCK_ID", nullable: false }),
    air_control_1.DbNumber()
], AgtRepositoryTransactionBlock.prototype, "tmRepositoryTransactionBlockId", void 0);
__decorate([
    air_control_1.Column({ name: "REPOSITORY_TRANSACTION_BLOCK", nullable: false })
], AgtRepositoryTransactionBlock.prototype, "contents", void 0);
__decorate([
    air_control_1.OneToMany()
], AgtRepositoryTransactionBlock.prototype, "syncLogs", void 0);
AgtRepositoryTransactionBlock = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "AGT_REPOSITORY_TRANSACTION_BLOCKS" })
    // TODO: partition by add date for efficient dropping of records
], AgtRepositoryTransactionBlock);
exports.AgtRepositoryTransactionBlock = AgtRepositoryTransactionBlock;
//# sourceMappingURL=AgtRepositoryTransactionBlock.js.map