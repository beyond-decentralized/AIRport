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
const ground_control_1 = require("@airport/ground-control");
const Terminal_1 = require("./Terminal");
let Actor = class Actor {
    constructor() {
        this.actorApplications = [];
    }
};
__decorate([
    air_control_1.Id(),
    air_control_1.GeneratedValue(),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], Actor.prototype, "id", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "USER_ID", referencedColumnName: "ID" }),
    __metadata("design:type", Object)
], Actor.prototype, "user", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "TERMINAL_ID", referencedColumnName: "ID" }),
    __metadata("design:type", Terminal_1.Terminal)
], Actor.prototype, "terminal", void 0);
__decorate([
    air_control_1.Column({ name: "RANDOM_ID" }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], Actor.prototype, "randomId", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: ground_control_1.CascadeType.ALL, mappedBy: 'actor' }),
    __metadata("design:type", Array)
], Actor.prototype, "actorApplications", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: ground_control_1.CascadeType.ALL, mappedBy: "ACTOR_ID" }),
    __metadata("design:type", Array)
], Actor.prototype, "repositoryActor", void 0);
Actor = __decorate([
    air_control_1.Entity()
], Actor);
exports.Actor = Actor;
//# sourceMappingURL=Actor.js.map