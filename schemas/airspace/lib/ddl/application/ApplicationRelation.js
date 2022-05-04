var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, DbString, Entity, Id, JoinColumn, Json, ManyToOne, OneToMany, Table } from '@airport/air-traffic-control';
import { VersionedApplicationObject } from './VersionedApplicationObject';
let ApplicationRelation = class ApplicationRelation extends VersionedApplicationObject {
    constructor() {
        super(...arguments);
        this.manyRelationColumns = [];
        this.oneRelationColumns = [];
    }
};
__decorate([
    DbNumber(),
    Id()
], ApplicationRelation.prototype, "id", void 0);
__decorate([
    DbNumber(),
    Column({ name: 'RELATION_INDEX', nullable: false })
], ApplicationRelation.prototype, "index", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'APPLICATION_PROPERTY_ID', referencedColumnName: 'ID', nullable: false })
], ApplicationRelation.prototype, "property", void 0);
__decorate([
    Json(),
    Column({ name: 'FOREIGN_KEY' })
], ApplicationRelation.prototype, "foreignKey", void 0);
__decorate([
    Json(),
    Column({ name: 'MANY_TO_ONE_ELEMENTS' })
], ApplicationRelation.prototype, "manyToOneElems", void 0);
__decorate([
    Json(),
    Column({ name: 'ONE_TO_MANY_ELEMENTS' })
], ApplicationRelation.prototype, "oneToManyElems", void 0);
__decorate([
    DbString(),
    Column({ name: 'RELATION_TYPE', nullable: false })
], ApplicationRelation.prototype, "relationType", void 0);
__decorate([
    Column({ name: 'IS_ID', nullable: false })
], ApplicationRelation.prototype, "isId", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'APPLICATION_TABLE_ID', referencedColumnName: 'ID', nullable: false })
], ApplicationRelation.prototype, "entity", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'RELATION_APPLICATION_TABLE_ID', referencedColumnName: 'ID', nullable: false })
], ApplicationRelation.prototype, "relationEntity", void 0);
__decorate([
    OneToMany({ mappedBy: 'manyRelation' })
], ApplicationRelation.prototype, "manyRelationColumns", void 0);
__decorate([
    OneToMany({ mappedBy: 'oneRelation' })
], ApplicationRelation.prototype, "oneRelationColumns", void 0);
ApplicationRelation = __decorate([
    Entity(),
    Table({
        name: 'APPLICATION_RELATIONS'
    })
], ApplicationRelation);
export { ApplicationRelation };
//# sourceMappingURL=ApplicationRelation.js.map