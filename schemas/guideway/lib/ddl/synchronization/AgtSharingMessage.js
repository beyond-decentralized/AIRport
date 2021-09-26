var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, Table } from "@airport/air-control";
/**
 * A AgtSharingMessage record is created everytime the AGT sends a group of sync records
 * to Terminals.  Eventually, when Terminals respond with an ACK of receipt a corresponding
 * group of sync records the state of these records is updated.
 */
let AgtSharingMessage = class AgtSharingMessage {
};
__decorate([
    Id(),
    DbNumber(),
    GeneratedValue()
], AgtSharingMessage.prototype, "id", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: "SYNCED_TERMINAL_ID", referencedColumnName: 'ID', nullable: false })
], AgtSharingMessage.prototype, "terminal", void 0);
__decorate([
    Column({ name: "TM_SHARING_MESSAGE_ID", nullable: false }),
    DbNumber()
], AgtSharingMessage.prototype, "tmSharingMessageId", void 0);
__decorate([
    OneToMany()
], AgtSharingMessage.prototype, "syncLogs", void 0);
__decorate([
    Column({ name: 'ACKNOWLEDGED', nullable: false }),
    DbString()
], AgtSharingMessage.prototype, "acknowledged", void 0);
AgtSharingMessage = __decorate([
    Entity(),
    Table({ name: "AGT_SHARING_MESSAGES" })
], AgtSharingMessage);
export { AgtSharingMessage };
//# sourceMappingURL=AgtSharingMessage.js.map