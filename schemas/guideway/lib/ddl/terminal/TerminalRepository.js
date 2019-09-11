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
 * Records all Repositories that a given terminal subscribes too.
 */
let TerminalRepository = class TerminalRepository {
};
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "TERMINAL_ID", referencedColumnName: 'ID' })
], TerminalRepository.prototype, "terminal", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "REPOSITORY_ID", referencedColumnName: 'ID' })
], TerminalRepository.prototype, "repository", void 0);
__decorate([
    air_control_1.Column({ name: 'PERMISSION', nullable: false }),
    air_control_1.DbNumber()
], TerminalRepository.prototype, "permission", void 0);
TerminalRepository = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "AGT_TERMINAL_REPOSITORIES" })
], TerminalRepository);
exports.TerminalRepository = TerminalRepository;
//# sourceMappingURL=terminalrepository.js.map