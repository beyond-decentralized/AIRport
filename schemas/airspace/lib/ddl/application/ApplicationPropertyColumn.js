var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Id, JoinColumn, ManyToOne, Table } from '@airport/air-traffic-control';
import { VersionedApplicationObject } from './VersionedApplicationObject';
/**
 * Many-to-Many between Columns and properties
 */
let ApplicationPropertyColumn = class ApplicationPropertyColumn extends VersionedApplicationObject {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: 'APPLICATION_COLUMN_LID',
        referencedColumnName: 'APPLICATION_COLUMN_LID', nullable: false
    })
], ApplicationPropertyColumn.prototype, "column", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: 'APPLICATION_PROPERTY_LID',
        referencedColumnName: 'APPLICATION_PROPERTY_LID', nullable: false
    })
], ApplicationPropertyColumn.prototype, "property", void 0);
ApplicationPropertyColumn = __decorate([
    Entity()
    // TODO: rename table name to APPLICATION_PROPERTY_COLUMNS
    ,
    Table({
        name: 'APPLICATION_PROPERTY_COLUMNS'
    })
], ApplicationPropertyColumn);
export { ApplicationPropertyColumn };
//# sourceMappingURL=ApplicationPropertyColumn.js.map