var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, Table } from '@airport/air-control';
/**
 * Represents the client-side terminal.
 */
let Terminal = class Terminal {
};
__decorate([
    Id(),
    GeneratedValue()
], Terminal.prototype, "id", void 0);
__decorate([
    Column({ name: 'NAME', nullable: false })
], Terminal.prototype, "name", void 0);
__decorate([
    DbNumber(),
    Column({ name: 'SECOND_ID', nullable: false })
], Terminal.prototype, "secondId", void 0);
__decorate([
    Column({ name: 'PASSWORD', nullable: false }),
    DbString()
], Terminal.prototype, "password", void 0);
__decorate([
    Column({ name: 'LAST_RECENT_CONNECTION_DATETIME', nullable: false }),
    DbNumber()
], Terminal.prototype, "lastPollConnectionDatetime", void 0);
__decorate([
    Column({ name: 'LAST_ARCHIVE_CONNECTION_DATETIME' }),
    DbNumber()
], Terminal.prototype, "lastSseConnectionDatetime", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'USER_ID', referencedColumnName: 'ID', nullable: false })
], Terminal.prototype, "user", void 0);
__decorate([
    OneToMany()
], Terminal.prototype, "terminalRepositories", void 0);
__decorate([
    OneToMany()
], Terminal.prototype, "sharingMessages", void 0);
Terminal = __decorate([
    Entity(),
    Table({ name: 'AGT_TERMINALS' })
], Terminal);
export { Terminal };
//# sourceMappingURL=Terminal.js.map