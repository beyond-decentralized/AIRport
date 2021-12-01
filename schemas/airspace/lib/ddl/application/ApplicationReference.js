var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, Entity, Id, JoinColumn, ManyToOne, Table } from '@airport/air-control';
import { VersionedApplicationObject } from './VersionedApplicationObject';
let ApplicationReference = class ApplicationReference extends VersionedApplicationObject {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: 'OWN_APPLICATION_VERSION_ID', referencedColumnName: 'ID', nullable: false })
], ApplicationReference.prototype, "ownApplicationVersion", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: 'REFERENCED_APPLICATION_VERSION_ID', referencedColumnName: 'ID', nullable: false })
], ApplicationReference.prototype, "referencedApplicationVersion", void 0);
__decorate([
    Column({ name: 'APPLICATION_REFERENCE_INDEX', nullable: false }),
    DbNumber()
], ApplicationReference.prototype, "index", void 0);
ApplicationReference = __decorate([
    Entity(),
    Table({
        name: 'APPLICATION_REFERENCES'
    })
], ApplicationReference);
export { ApplicationReference };
//# sourceMappingURL=ApplicationReference.js.map