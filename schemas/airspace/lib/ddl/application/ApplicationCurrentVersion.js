var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Id, JoinColumn, ManyToOne, Table } from "@airport/air-traffic-control";
let ApplicationCurrentVersion = class ApplicationCurrentVersion {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: 'APPLICATION_INDEX', referencedColumnName: 'APPLICATION_INDEX', nullable: false })
], ApplicationCurrentVersion.prototype, "application", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: 'APPLICATION_VERSION_ID', referencedColumnName: 'ID', nullable: false })
], ApplicationCurrentVersion.prototype, "applicationVersion", void 0);
ApplicationCurrentVersion = __decorate([
    Entity(),
    Table({
        name: 'APPLICATION_CURRENT_VERSIONS'
    })
], ApplicationCurrentVersion);
export { ApplicationCurrentVersion };
//# sourceMappingURL=ApplicationCurrentVersion.js.map