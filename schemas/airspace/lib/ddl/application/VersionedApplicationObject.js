var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { JoinColumn, ManyToOne, MappedSuperclass } from '@airport/air-traffic-control';
let VersionedApplicationObject = class VersionedApplicationObject {
};
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'DEPRECATED_SINCE_APPLICATION_VERSION_LID',
        referencedColumnName: 'APPLICATION_VERSION_LID'
    })
], VersionedApplicationObject.prototype, "deprecatedSinceVersion", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'REMOVED_IN_APPLICATION_VERSION_LID',
        referencedColumnName: 'APPLICATION_VERSION_LID'
    })
], VersionedApplicationObject.prototype, "removedInVersion", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'SINCE_APPLICATION_VERSION_LID',
        referencedColumnName: 'APPLICATION_VERSION_LID', nullable: false
    })
], VersionedApplicationObject.prototype, "sinceVersion", void 0);
VersionedApplicationObject = __decorate([
    MappedSuperclass()
], VersionedApplicationObject);
export { VersionedApplicationObject };
//# sourceMappingURL=VersionedApplicationObject.js.map