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
const User_1 = require("../User");
const SecurityQuestion_1 = require("./SecurityQuestion");
let SecurityAnswer = class SecurityAnswer {
};
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "USER_ID", referencedColumnName: "ID" }),
    __metadata("design:type", User_1.User)
], SecurityAnswer.prototype, "user", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "SECURITY_QUESTION_ID", referencedColumnName: "ID" }),
    __metadata("design:type", SecurityQuestion_1.SecurityQuestion)
], SecurityAnswer.prototype, "securityQuestion", void 0);
SecurityAnswer = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "AGT_SECURITY_ANSWERS" })
], SecurityAnswer);
exports.SecurityAnswer = SecurityAnswer;
//# sourceMappingURL=SecurityAnswer.js.map