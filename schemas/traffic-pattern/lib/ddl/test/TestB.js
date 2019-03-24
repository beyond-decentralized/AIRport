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
const TestA_1 = require("./TestA");
// TODO: add support for TS interfaces on non-id based relations
let TestB = class TestB {
};
__decorate([
    air_control_1.Id(),
    __metadata("design:type", Number)
], TestB.prototype, "idBOne", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumns([
        { name: 'B_A_TWO', referencedColumnName: 'A_TWO' },
        { name: 'B_A_THREE', referencedColumnName: 'A_THREE' },
    ]),
    __metadata("design:type", TestA_1.TestA)
], TestB.prototype, "bToA", void 0);
__decorate([
    air_control_1.Column({ name: 'B_FOUR' }),
    __metadata("design:type", Number)
], TestB.prototype, "bFour", void 0);
TestB = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: 'TEST_B' })
], TestB);
exports.TestB = TestB;
//# sourceMappingURL=TestB.js.map