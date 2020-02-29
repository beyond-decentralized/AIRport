var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DbBoolean, Entity, Id, JoinColumn, ManyToOne, Table } from "@airport/air-control";
let SynchronizationConflictPendingNotification = class SynchronizationConflictPendingNotification {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: "SYNC_CONFLICT_ID", referencedColumnName: "ID" })
], SynchronizationConflictPendingNotification.prototype, "synchronizationConflict", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: "ACTOR_ID", referencedColumnName: "ID" })
], SynchronizationConflictPendingNotification.prototype, "actor", void 0);
__decorate([
    DbBoolean()
], SynchronizationConflictPendingNotification.prototype, "acknowledged", void 0);
SynchronizationConflictPendingNotification = __decorate([
    Entity(),
    Table({ name: "SYNC_CONFLICT_PENDING_NOTIFICATION" })
], SynchronizationConflictPendingNotification);
export { SynchronizationConflictPendingNotification };
//# sourceMappingURL=SynchronizationConflictPendingNotification.js.map