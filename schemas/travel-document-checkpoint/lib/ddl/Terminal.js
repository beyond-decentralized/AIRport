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
const User_1 = require("./User");
let Terminal = class Terminal {
    constructor() {
        this.isLocal = false;
    }
};
__decorate([
    air_control_1.Id(),
    air_control_1.GeneratedValue(),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], Terminal.prototype, "id", void 0);
__decorate([
    air_control_1.Column({ name: 'SECOND_ID' }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], Terminal.prototype, "secondId", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'OWNER_USER_ID', referencedColumnName: 'ID' }),
    __metadata("design:type", User_1.User)
], Terminal.prototype, "owner", void 0);
__decorate([
    air_control_1.Column({ name: 'IS_LOCAL' }),
    air_control_1.DbBoolean(),
    __metadata("design:type", Boolean)
], Terminal.prototype, "isLocal", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'terminal' }),
    __metadata("design:type", Array)
], Terminal.prototype, "terminalAgts", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'terminal' }),
    __metadata("design:type", Array)
], Terminal.prototype, "userTerminal", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'terminal' }),
    __metadata("design:type", Array)
], Terminal.prototype, "userTerminalAgt", void 0);
Terminal = __decorate([
    air_control_1.Entity()
], Terminal);
exports.Terminal = Terminal;
//# sourceMappingURL=Terminal.js.map