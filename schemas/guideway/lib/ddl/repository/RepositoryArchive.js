"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const Archive_1 = require("./Archive");
const Repository_1 = require("./Repository");
let RepositoryArchive = class RepositoryArchive {
};
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "REPOSITORY_ID", referencedColumnName: "ID", nullable: false }),
    __metadata("design:type", Repository_1.Repository)
], RepositoryArchive.prototype, "repository", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "ARCHIVE_ID", referencedColumnName: "ID", nullable: false }),
    __metadata("design:type", Archive_1.Archive)
], RepositoryArchive.prototype, "archive", void 0);
RepositoryArchive = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "REPOSITORY_ARCHIVE" })
], RepositoryArchive);
exports.RepositoryArchive = RepositoryArchive;
//# sourceMappingURL=RepositoryArchive.js.map