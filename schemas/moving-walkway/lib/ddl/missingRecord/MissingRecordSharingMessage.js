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
let MissingRecordSharingMessage = class MissingRecordSharingMessage {
};
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "MISSING_RECORD_ID", referencedColumnName: "ID" }),
    __metadata("design:type", Object)
], MissingRecordSharingMessage.prototype, "missingRecord", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "SHARING_MESSAGE_ID", referencedColumnName: "ID" }),
    __metadata("design:type", Object)
], MissingRecordSharingMessage.prototype, "sharingMessage", void 0);
MissingRecordSharingMessage = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "MISSING_RECORD_SHARING_MESSAGE" })
], MissingRecordSharingMessage);
exports.MissingRecordSharingMessage = MissingRecordSharingMessage;
//# sourceMappingURL=MissingRecordSharingMessage.js.map