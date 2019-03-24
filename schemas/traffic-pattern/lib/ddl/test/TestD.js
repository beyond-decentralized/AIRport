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
// TODO: add support for TS interfaces on non-id based relations
let TestD = class TestD {
};
__decorate([
    air_control_1.Id(),
    air_control_1.Column({ name: 'D_ONE' }),
    __metadata("design:type", Number)
], TestD.prototype, "dOne", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.Column({ name: 'D_TWO' }),
    __metadata("design:type", Number)
], TestD.prototype, "dTwo", void 0);
__decorate([
    air_control_1.Column({ name: 'D_THREE' }),
    __metadata("design:type", Number)
], TestD.prototype, "dThree", void 0);
TestD = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: 'TEST_D' })
], TestD);
exports.TestD = TestD;
//# sourceMappingURL=TestD.js.map