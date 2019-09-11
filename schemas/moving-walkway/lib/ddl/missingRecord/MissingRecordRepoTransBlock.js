"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
let MissingRecordRepoTransBlock = class MissingRecordRepoTransBlock {
};
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "MISSING_RECORD_ID", referencedColumnName: "ID" })
], MissingRecordRepoTransBlock.prototype, "missingRecord", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "REPOSITORY_TRANSACTION_BLOCK_ID", referencedColumnName: "ID" })
], MissingRecordRepoTransBlock.prototype, "repositoryTransactionBlock", void 0);
MissingRecordRepoTransBlock = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "MISSING_RECORD_REPO_TRANS_BLOCKS" })
], MissingRecordRepoTransBlock);
exports.MissingRecordRepoTransBlock = MissingRecordRepoTransBlock;
//# sourceMappingURL=missingrecordrepotransblock.js.map