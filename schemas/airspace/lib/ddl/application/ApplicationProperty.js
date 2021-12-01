var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbBoolean, DbNumber, DbString, Entity, Id, JoinColumn, ManyToOne, OneToMany, Table } from '@airport/air-control';
import { VersionedApplicationObject } from './VersionedApplicationObject';
let ApplicationProperty = class ApplicationProperty extends VersionedApplicationObject {
    constructor() {
        super(...arguments);
        this.propertyColumns = [];
        this.relation = [];
    }
};
__decorate([
    DbNumber(),
    Id()
], ApplicationProperty.prototype, "id", void 0);
__decorate([
    DbNumber(),
    Column({ name: 'PROPERTY_INDEX', nullable: false })
], ApplicationProperty.prototype, "index", void 0);
__decorate([
    DbString(),
    Column({ name: 'NAME', nullable: false })
], ApplicationProperty.prototype, "name", void 0);
__decorate([
    DbBoolean(),
    Column({ name: 'IS_ID', nullable: false })
], ApplicationProperty.prototype, "isId", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'APPLICATION_ENTITY_ID', referencedColumnName: 'ID', nullable: false })
], ApplicationProperty.prototype, "entity", void 0);
__decorate([
    OneToMany({ mappedBy: 'property' })
], ApplicationProperty.prototype, "propertyColumns", void 0);
__decorate([
    OneToMany({ mappedBy: 'property' })
], ApplicationProperty.prototype, "relation", void 0);
ApplicationProperty = __decorate([
    Entity(),
    Table({
        name: 'APPLICATION_PROPERTIES'
    })
], ApplicationProperty);
export { ApplicationProperty };
//# sourceMappingURL=ApplicationProperty.js.map