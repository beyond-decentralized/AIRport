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
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const Terminal_1 = require("../terminal/Terminal");
const Repository_1 = require("../repository/Repository");
let AgtRepositoryTransactionBlock = 
// TODO: partition by add date for efficient dropping of records
class AgtRepositoryTransactionBlock {
};
__decorate([
    air_control_1.Id(),
    air_control_1.GeneratedValue(),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], AgtRepositoryTransactionBlock.prototype, "id", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "REPOSITORY_ID", referencedColumnName: 'ID' }),
    __metadata("design:type", Repository_1.Repository)
], AgtRepositoryTransactionBlock.prototype, "repository", void 0);
__decorate([
    air_control_1.OneToMany(),
    air_control_1.JoinColumn({ name: "REPOSITORY_ID" }),
    __metadata("design:type", Array)
], AgtRepositoryTransactionBlock.prototype, "terminalRepositories", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "TERMINAL_ID", referencedColumnName: 'ID' }),
    __metadata("design:type", Terminal_1.Terminal)
], AgtRepositoryTransactionBlock.prototype, "terminal", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "ARCHIVING_SERVER_ID", referencedColumnName: "ID" }),
    __metadata("design:type", Object)
], AgtRepositoryTransactionBlock.prototype, "archivingServer", void 0);
__decorate([
    air_control_1.Column({ name: "ARCHIVING_STATUS" }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], AgtRepositoryTransactionBlock.prototype, "archivingStatus", void 0);
__decorate([
    air_control_1.Column({ name: "ADD_DATETIME" }),
    __metadata("design:type", Number)
], AgtRepositoryTransactionBlock.prototype, "addDatetime", void 0);
__decorate([
    air_control_1.Column({ name: "TM_REPOSITORY_TRANSACTION_BLOCK_ID" }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], AgtRepositoryTransactionBlock.prototype, "tmRepositoryTransactionBlockId", void 0);
__decorate([
    air_control_1.Column({ name: "REPOSITORY_TRANSACTION_BLOCK" }),
    __metadata("design:type", String)
], AgtRepositoryTransactionBlock.prototype, "contents", void 0);
__decorate([
    air_control_1.OneToMany(),
    __metadata("design:type", Array)
], AgtRepositoryTransactionBlock.prototype, "syncLogs", void 0);
AgtRepositoryTransactionBlock = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "AGT_REPOSITORY_TRANSACTION_BLOCKS" })
    // TODO: partition by add date for efficient dropping of records
], AgtRepositoryTransactionBlock);
exports.AgtRepositoryTransactionBlock = AgtRepositoryTransactionBlock;
//# sourceMappingURL=AgtRepositoryTransactionBlock.js.map