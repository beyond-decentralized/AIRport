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
const __1 = require("../..");
const AgtSharingMessageAcknowledged_1 = require("./AgtSharingMessageAcknowledged");
/**
 * A AgtSharingMessage record is created everytime the AGT sends a group of sync records
 * to Terminals.  Eventually, when Terminals respond with an ACK of receipt a corresponding
 * group of sync records the state of these records is updated.
 */
let AgtSharingMessage = class AgtSharingMessage {
};
__decorate([
    air_control_1.Id(),
    air_control_1.DbNumber(),
    air_control_1.GeneratedValue(),
    __metadata("design:type", Number)
], AgtSharingMessage.prototype, "id", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "SYNCED_TERMINAL_ID", referencedColumnName: 'ID', nullable: false }),
    __metadata("design:type", __1.Terminal)
], AgtSharingMessage.prototype, "terminal", void 0);
__decorate([
    air_control_1.Column({ name: "TM_SHARING_MESSAGE_ID", nullable: false }),
    __metadata("design:type", Number)
], AgtSharingMessage.prototype, "tmSharingMessageId", void 0);
__decorate([
    air_control_1.OneToMany(),
    __metadata("design:type", Array)
], AgtSharingMessage.prototype, "syncLogs", void 0);
__decorate([
    air_control_1.Column({ name: 'ACKNOWLEDGED', nullable: false }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], AgtSharingMessage.prototype, "acknowledged", void 0);
AgtSharingMessage = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "AGT_SHARING_MESSAGES" })
], AgtSharingMessage);
exports.AgtSharingMessage = AgtSharingMessage;
//# sourceMappingURL=AgtSharingMessage.js.map