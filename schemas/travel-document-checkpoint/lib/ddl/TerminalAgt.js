"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
let TerminalAgt = class TerminalAgt {
};
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'TERMINAL_ID', referencedColumnName: 'ID' })
], TerminalAgt.prototype, "terminal", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'AGT_ID', referencedColumnName: 'ID' })
], TerminalAgt.prototype, "agt", void 0);
__decorate([
    air_control_1.DbString()
], TerminalAgt.prototype, "password", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'terminalAgt' })
], TerminalAgt.prototype, "userTerminalAgts", void 0);
TerminalAgt = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: 'TERMINAL_AGTS' })
], TerminalAgt);
exports.TerminalAgt = TerminalAgt;
//# sourceMappingURL=TerminalAgt.js.map