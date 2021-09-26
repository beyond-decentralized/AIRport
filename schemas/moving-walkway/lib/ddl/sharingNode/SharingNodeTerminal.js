var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DbString } from '@airport/air-control';
import { Column, DbNumber, Id, JoinColumn, ManyToOne } from "@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators";
import { Entity, Table } from "@airport/air-control/lib/impl/core/entity/metadata/EntityDecorators";
let SharingNodeTerminal = class SharingNodeTerminal {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: "SHARING_NODE_ID", referencedColumnName: "ID"
    })
], SharingNodeTerminal.prototype, "sharingNode", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: "TERMINAL_ID", referencedColumnName: "ID"
    })
], SharingNodeTerminal.prototype, "terminal", void 0);
__decorate([
    Column({ name: "AGT_TERMINAL_ID" }),
    DbNumber()
], SharingNodeTerminal.prototype, "agtTerminalId", void 0);
__decorate([
    Column({ name: "TERMINAL_PASSWORD" }),
    DbString()
], SharingNodeTerminal.prototype, "agtTerminalPassword", void 0);
__decorate([
    Column({ name: "TERMINAL_SYNC_STATUS" }),
    DbString()
], SharingNodeTerminal.prototype, "terminalSyncStatus", void 0);
SharingNodeTerminal = __decorate([
    Entity(),
    Table({ name: "SHARING_NODE_TERMINAL" })
], SharingNodeTerminal);
export { SharingNodeTerminal };
//# sourceMappingURL=SharingNodeTerminal.js.map