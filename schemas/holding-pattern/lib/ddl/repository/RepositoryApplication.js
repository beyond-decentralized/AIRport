"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
/**
 * Created by Papa on 12/18/2016.
 */
/**
 * A record of device+datatabase that adds to a repository
 */
let RepositoryApplication = class RepositoryApplication {
};
__decorate([
    air_control_1.Column({ name: "ID" }),
    air_control_1.GeneratedValue(),
    air_control_1.Id()
], RepositoryApplication.prototype, "id", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "APPLICATION_ID", referencedColumnName: "ID",
        nullable: false })
], RepositoryApplication.prototype, "application", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "REPOSITORY_ID", referencedColumnName: "ID",
        nullable: false })
], RepositoryApplication.prototype, "repository", void 0);
RepositoryApplication = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "REPOSITORY_APPLICATION" })
], RepositoryApplication);
exports.RepositoryApplication = RepositoryApplication;
//# sourceMappingURL=RepositoryApplication.js.map