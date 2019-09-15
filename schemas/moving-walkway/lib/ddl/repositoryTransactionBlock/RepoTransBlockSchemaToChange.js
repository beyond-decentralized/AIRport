"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ColumnDecorators_1 = require("@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators");
const EntityDecorators_1 = require("@airport/air-control/lib/impl/core/entity/metadata/EntityDecorators");
let RepoTransBlockSchemaToChange = class RepoTransBlockSchemaToChange {
};
__decorate([
    ColumnDecorators_1.Id(),
    ColumnDecorators_1.ManyToOne(),
    ColumnDecorators_1.JoinColumn({
        name: "SHARING_MESSAGE_ID", referencedColumnName: "ID"
    })
], RepoTransBlockSchemaToChange.prototype, "repositoryTransactionBlock", void 0);
__decorate([
    ColumnDecorators_1.DbNumber()
], RepoTransBlockSchemaToChange.prototype, "status", void 0);
__decorate([
    ColumnDecorators_1.Id(),
    ColumnDecorators_1.ManyToOne(),
    ColumnDecorators_1.JoinColumn({
        name: "SCHEMA_INDEX"
    })
], RepoTransBlockSchemaToChange.prototype, "schema", void 0);
RepoTransBlockSchemaToChange = __decorate([
    EntityDecorators_1.Entity(),
    EntityDecorators_1.Table({ name: "REPO_TRANS_BLOCK_SCHEMAS_TO_CHANGE" })
], RepoTransBlockSchemaToChange);
exports.RepoTransBlockSchemaToChange = RepoTransBlockSchemaToChange;
//# sourceMappingURL=RepoTransBlockSchemaToChange.js.map