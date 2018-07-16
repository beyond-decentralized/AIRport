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
const SynchronizationConflict_1 = require("./SynchronizationConflict");
let SynchronizationConflictPendingNotification = class SynchronizationConflictPendingNotification {
};
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "SYNC_CONFLICT_ID", referencedColumnName: "ID" }),
    __metadata("design:type", SynchronizationConflict_1.SynchronizationConflict)
], SynchronizationConflictPendingNotification.prototype, "synchronizationConflict", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "ACTOR_ID", referencedColumnName: "ID" }),
    __metadata("design:type", Object)
], SynchronizationConflictPendingNotification.prototype, "actor", void 0);
__decorate([
    air_control_1.DbBoolean(),
    __metadata("design:type", Boolean)
], SynchronizationConflictPendingNotification.prototype, "acknowledged", void 0);
SynchronizationConflictPendingNotification = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "SYNC_CONFLICT_PENDING_NOTIFICATION" })
], SynchronizationConflictPendingNotification);
exports.SynchronizationConflictPendingNotification = SynchronizationConflictPendingNotification;
//# sourceMappingURL=SynchronizationConflictPendingNotification.js.map