var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, Entity, Id, OneToMany, Table } from '@airport/air-control';
let Server = class Server {
};
__decorate([
    Id()
], Server.prototype, "id", void 0);
__decorate([
    Column({ name: 'SERVER_TYPE', nullable: false }),
    DbNumber()
], Server.prototype, "serverType", void 0);
__decorate([
    OneToMany()
], Server.prototype, "serverSyncLogs", void 0);
Server = __decorate([
    Entity(),
    Table({ name: "AGT_SERVERS" })
], Server);
export { Server };
//# sourceMappingURL=Server.js.map