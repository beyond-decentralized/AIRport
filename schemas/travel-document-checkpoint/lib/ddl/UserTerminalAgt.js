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
 * User needs some sort of password that can be used to verify that
 * a given user is indeed making changes (instead of another one).
 *
 * The password should be AGT specific and Terminal specific
 * to reduce security risks.
 *
 * The password is generated as soon as a user is verified with
 * a terminal and then subsequently registered with an AGT (on
 * the next transaction)
 *
 * Registration is made using an already known to AGT Terminal
 * Id and password, to verify that is indeed coming from the
 * specified terminal.
 *
 * FIXME: additional credentials are needed for User-Agt registration
 * see of OpenConnect can provide something verifiable with the
 * provider
 */
let UserTerminalAgt = class UserTerminalAgt {
};
__decorate([
    air_control_1.Id(),
    air_control_1.DbNumber(),
    air_control_1.GeneratedValue()
], UserTerminalAgt.prototype, "id", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.Column({ name: 'AGT_ID' }),
    air_control_1.DbNumber(),
    air_control_1.GeneratedValue()
], UserTerminalAgt.prototype, "agtId", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'USER_ID', referencedColumnName: 'ID' })
], UserTerminalAgt.prototype, "user", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'TERMINAL_ID', referencedColumnName: 'ID' })
], UserTerminalAgt.prototype, "terminal", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'AGT_ID', referencedColumnName: 'ID' })
], UserTerminalAgt.prototype, "agt", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumns([
        { name: 'AGT_ID' },
        { name: 'TERMINAL_ID' }
    ])
], UserTerminalAgt.prototype, "terminalAgt", void 0);
UserTerminalAgt = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: 'USER_TERMINAL_AGT' })
], UserTerminalAgt);
exports.UserTerminalAgt = UserTerminalAgt;
//# sourceMappingURL=UserTerminalAgt.js.map