"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
let Application = class Application {
    constructor() {
        this.actorApplications = [];
        this.repositoryApplications = [];
    }
};
__decorate([
    air_control_1.DbNumber(),
    air_control_1.GeneratedValue(),
    air_control_1.Id()
], Application.prototype, "id", void 0);
__decorate([
    air_control_1.DbString()
], Application.prototype, "host", void 0);
__decorate([
    air_control_1.Column({ name: 'PORT', nullable: false }),
    air_control_1.DbNumber()
], Application.prototype, "port", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: ground_control_1.CascadeType.ALL, mappedBy: 'application' })
], Application.prototype, "actorApplications", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: ground_control_1.CascadeType.ALL, mappedBy: 'application' })
], Application.prototype, "repositoryApplications", void 0);
Application = __decorate([
    air_control_1.Entity()
], Application);
exports.Application = Application;
//# sourceMappingURL=Application.js.map