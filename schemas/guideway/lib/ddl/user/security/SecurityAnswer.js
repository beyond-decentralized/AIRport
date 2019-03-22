"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
let SecurityAnswer = class SecurityAnswer {
};
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "USER_ID", referencedColumnName: "ID", nullable: false })
], SecurityAnswer.prototype, "user", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "SECURITY_QUESTION_ID", referencedColumnName: "ID", nullable: false })
], SecurityAnswer.prototype, "securityQuestion", void 0);
__decorate([
    air_control_1.Column({ name: 'ANSWER', nullable: false })
], SecurityAnswer.prototype, "answer", void 0);
SecurityAnswer = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "AGT_SECURITY_ANSWERS" })
], SecurityAnswer);
exports.SecurityAnswer = SecurityAnswer;
//# sourceMappingURL=SecurityAnswer.js.map