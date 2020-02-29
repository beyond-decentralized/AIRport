var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, JoinColumn, ManyToOne, Table } from '@airport/air-control';
let MissingRecordRepoTransBlock = class MissingRecordRepoTransBlock {
};
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'MISSING_RECORD_ID', referencedColumnName: 'ID' })
], MissingRecordRepoTransBlock.prototype, "missingRecord", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'REPOSITORY_TRANSACTION_BLOCK_ID', referencedColumnName: 'ID' })
], MissingRecordRepoTransBlock.prototype, "repositoryTransactionBlock", void 0);
MissingRecordRepoTransBlock = __decorate([
    Entity(),
    Table({ name: 'MISSING_RECORD_REPO_TRANS_BLOCKS' })
], MissingRecordRepoTransBlock);
export { MissingRecordRepoTransBlock };
//# sourceMappingURL=MissingRecordRepoTransBlock.js.map