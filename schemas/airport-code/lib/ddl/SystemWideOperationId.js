"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
/**
 * No actual records are inserted into this table, only used for the sequence
 */
let SystemWideOperationId = class SystemWideOperationId {
};
__decorate([
    air_control_1.Id(),
    air_control_1.Column({ name: 'ID', nullable: false }),
    air_control_1.DbNumber()
], SystemWideOperationId.prototype, "id", void 0);
SystemWideOperationId = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: 'SYSTEM_WIDE_OPERATION_IDS' })
], SystemWideOperationId);
exports.SystemWideOperationId = SystemWideOperationId;
//# sourceMappingURL=systemwideoperationid.js.map