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
const arrivals_n_departures_1 = require("@airport/arrivals-n-departures");
const holding_pattern_1 = require("@airport/holding-pattern");
// FIXME: SECURITY - ensure that a given RepoTransBlock is processed only once by a given TM
// FIXME: SECURITY - ensure that a given RepoTransBlock is processed only once by a given AGT
/**
 * A block of Repository Transaction Histories.  It's unique and hashable, and hence
 * can be put into a block chain (or, realistically, into a "0-nonce block mesh")
 *
 * Each Repo Trans Hist must be in one and only one Repo Trans Block.  This is easy since
 * a given Repo Trans Block is created from all recent Repo Trans Hists generated for a given
 * repo on a given TM.
 *
 * FIXME: implement 0-nonce block mesh (as part of P2P work):
 *
 * 0-nonce because we don't need computationally intensive "proof of work"
 * one mesh repository
 * mesh consists of per repository chains push a common chain
 * TM has it's own chain that records in what order it was receiving and creating repo trans
 * hists
 * each TM maintains a common chain that represents what a best case scenario chain should look
 * like
 * (sorted by earliest creation time of all repo trans hists on a given block, and additional ids
 * if needed)
 * there can then be a consensus algorithm that would determine when a given common chain is
 * common across the majority of connected nodes.  It can be used to determine sync status
 *
 * There can be another (per repo trans hist) per UTC date chain and another consensus algorithm
 * to determine when a given repo/day is ready to be archived
 *
 * The per-TM chains can also be inspected and compared against known AGT sync timestamps do
 * determine the likelihood of TMs not "excluding" known blocks from their unique chains (and
 * probably used for other purposes as well).
 */
let RepositoryTransactionBlock = class RepositoryTransactionBlock {
};
__decorate([
    air_control_1.Id(),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], RepositoryTransactionBlock.prototype, "id", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "SOURCE_DATABASE_ID", referencedColumnName: "ID" }),
    __metadata("design:type", holding_pattern_1.Database)
], RepositoryTransactionBlock.prototype, "source", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({
        name: "REPOSITORY_ID", referencedColumnName: "ID"
    }),
    __metadata("design:type", holding_pattern_1.Repository)
], RepositoryTransactionBlock.prototype, "repository", void 0);
__decorate([
    air_control_1.Column({ name: "SYNC_OUTCOME_TYPE" }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], RepositoryTransactionBlock.prototype, "syncOutcomeType", void 0);
__decorate([
    air_control_1.DbString(),
    __metadata("design:type", String)
], RepositoryTransactionBlock.prototype, "contents", void 0);
__decorate([
    air_control_1.OneToMany(),
    air_control_1.JoinColumn({
        name: "REPOSITORY_TRANSACTION_HISTORY_BLOCK_ID", referencedColumnName: "ID"
    }),
    __metadata("design:type", Array)
], RepositoryTransactionBlock.prototype, "repositoryTransactionHistory", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: "repositoryTransactionBlock" }),
    __metadata("design:type", Array)
], RepositoryTransactionBlock.prototype, "sharingNodeRepoTransBlocks", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: "repositoryTransactionBlock" }),
    __metadata("design:type", Array)
], RepositoryTransactionBlock.prototype, "sharingMessageRepoTransBlocks", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: "repositoryTransactionBlock" }),
    __metadata("design:type", Array)
], RepositoryTransactionBlock.prototype, "missingRecordRepoTransBlocks", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: "repositoryTransactionBlock" }),
    __metadata("design:type", Array)
], RepositoryTransactionBlock.prototype, "repoTransBlockSchemasToChange", void 0);
RepositoryTransactionBlock = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "REPOSITORY_TRANSACTION_BLOCKS" })
], RepositoryTransactionBlock);
exports.RepositoryTransactionBlock = RepositoryTransactionBlock;
//# sourceMappingURL=RepositoryTransactionBlock.js.map