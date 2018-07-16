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
let Application = class Application {
    constructor() {
        this.actorApplications = [];
        this.repositoryApplications = [];
    }
};
__decorate([
    air_control_1.DbNumber(),
    air_control_1.GeneratedValue(),
    air_control_1.Id(),
    __metadata("design:type", Number)
], Application.prototype, "id", void 0);
__decorate([
    air_control_1.DbString(),
    __metadata("design:type", String)
], Application.prototype, "host", void 0);
__decorate([
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], Application.prototype, "port", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: air_control_1.CascadeType.ALL, mappedBy: 'application' }),
    __metadata("design:type", Array)
], Application.prototype, "actorApplications", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: air_control_1.CascadeType.ALL, mappedBy: 'application' }),
    __metadata("design:type", Array)
], Application.prototype, "repositoryApplications", void 0);
Application = __decorate([
    air_control_1.Entity()
], Application);
exports.Application = Application;
//# sourceMappingURL=Application.js.map