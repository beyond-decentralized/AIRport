var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DbString, Id, JoinColumn, ManyToOne } from "@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators";
import { Entity, Table } from "@airport/air-control/lib/impl/core/entity/metadata/EntityDecorators";
let RepoTransBlockSchemaToChange = class RepoTransBlockSchemaToChange {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: "SHARING_MESSAGE_ID", referencedColumnName: "ID"
    })
], RepoTransBlockSchemaToChange.prototype, "repositoryTransactionBlock", void 0);
__decorate([
    DbString()
], RepoTransBlockSchemaToChange.prototype, "status", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: "SCHEMA_INDEX"
    })
], RepoTransBlockSchemaToChange.prototype, "schema", void 0);
RepoTransBlockSchemaToChange = __decorate([
    Entity(),
    Table({ name: "REPO_TRANS_BLOCK_SCHEMAS_TO_CHANGE" })
], RepoTransBlockSchemaToChange);
export { RepoTransBlockSchemaToChange };
//# sourceMappingURL=RepoTransBlockSchemaToChange.js.map