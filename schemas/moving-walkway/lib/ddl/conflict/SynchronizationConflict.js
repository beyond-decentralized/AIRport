"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
let SynchronizationConflict = class SynchronizationConflict {
};
__decorate([
    air_control_1.GeneratedValue(),
    air_control_1.Id(),
    air_control_1.DbNumber()
], SynchronizationConflict.prototype, "id", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "REPOSITORY_ID", referencedColumnName: "ID" })
], SynchronizationConflict.prototype, "repository", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "OVERWRITTEN_RECORD_HISTORY_ID", referencedColumnName: "ID" })
], SynchronizationConflict.prototype, "overwrittenRecordHistory", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "OVERWRITING_RECORD_HISTORY_ID", referencedColumnName: "ID" })
], SynchronizationConflict.prototype, "overwritingRecordHistory", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: ground_control_1.CascadeType.ALL, mappedBy: "SYNCHRONIZATION_CONFLICT_ID" })
], SynchronizationConflict.prototype, "values", void 0);
__decorate([
    air_control_1.DbNumber()
], SynchronizationConflict.prototype, "type", void 0);
SynchronizationConflict = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "SYNCHRONIZATION_CONFLICT" })
], SynchronizationConflict);
exports.SynchronizationConflict = SynchronizationConflict;
//# sourceMappingURL=SynchronizationConflict.js.map