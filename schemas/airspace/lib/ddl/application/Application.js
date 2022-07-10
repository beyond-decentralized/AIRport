var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, DbString, Entity, Id, JoinColumn, ManyToOne, OneToMany, Table } from '@airport/tarmaq-entity';
let Application = class Application {
    constructor() {
        this.versions = [];
        this.currentVersion = [];
    }
};
__decorate([
    Id(),
    DbNumber(),
    Column({ name: 'APPLICATION_INDEX', nullable: false })
], Application.prototype, "index", void 0);
__decorate([
    Column({ name: 'SCOPE', nullable: false }),
    DbString()
], Application.prototype, "scope", void 0);
__decorate([
    Column({ name: 'APPLICATION_NAME', nullable: false }),
    DbString()
], Application.prototype, "name", void 0);
__decorate([
    Column({ name: 'FULL_APPLICATION_NAME', nullable: false }),
    DbString()
], Application.prototype, "fullName", void 0);
__decorate([
    Column({ name: 'STATUS', nullable: false }),
    DbString()
], Application.prototype, "status", void 0);
__decorate([
    Column({ name: 'SIGNATURE', nullable: false }),
    DbString()
], Application.prototype, "signature", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'DOMAIN_LID', referencedColumnName: 'DOMAIN_LID', nullable: false })
], Application.prototype, "domain", void 0);
__decorate([
    OneToMany({ mappedBy: 'application' })
], Application.prototype, "versions", void 0);
__decorate([
    OneToMany({ mappedBy: 'application' })
], Application.prototype, "currentVersion", void 0);
Application = __decorate([
    Entity(),
    Table({
        name: 'APPLICATIONS'
    })
], Application);
export { Application };
//# sourceMappingURL=Application.js.map