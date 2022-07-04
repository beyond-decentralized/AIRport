var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, Entity, Id, JoinColumn, ManyToOne, Table } from '@airport/air-traffic-control';
import { VersionedApplicationObject } from './VersionedApplicationObject';
let ApplicationRelationColumn = class ApplicationRelationColumn extends VersionedApplicationObject {
};
__decorate([
    Id(),
    Column({ name: 'APPLICATION_RELATION_COLUMN_LID' })
], ApplicationRelationColumn.prototype, "_localId", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'MANY_APPLICATION_COLUMN_LID',
        referencedColumnName: 'APPLICATION_COLUMN_LID',
        nullable: false
    })
], ApplicationRelationColumn.prototype, "manyColumn", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'ONE_APPLICATION_COLUMN_LID',
        referencedColumnName: 'APPLICATION_COLUMN_LID', nullable: false
    })
], ApplicationRelationColumn.prototype, "oneColumn", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'MANY_APPLICATION_RELATION_LID',
        referencedColumnName: 'APPLICATION_RELATION_LID'
    })
], ApplicationRelationColumn.prototype, "manyRelation", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'ONE_APPLICATION_RELATION_LID',
        referencedColumnName: 'APPLICATION_RELATION_LID'
    })
], ApplicationRelationColumn.prototype, "oneRelation", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'PARENT_RELATION_LID',
        referencedColumnName: 'APPLICATION_RELATION_LID'
    })
], ApplicationRelationColumn.prototype, "parentRelation", void 0);
ApplicationRelationColumn = __decorate([
    Entity(),
    Table({
        name: 'APPLICATION_RELATION_COLUMNS'
    })
], ApplicationRelationColumn);
export { ApplicationRelationColumn };
//# sourceMappingURL=ApplicationRelationColumn.js.map