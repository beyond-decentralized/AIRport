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
let TuningParameters = class TuningParameters {
};
__decorate([
    air_control_1.Id(),
    air_control_1.Column({ name: "SERVER_TYPE" }),
    air_control_1.DbString(),
    __metadata("design:type", String)
], TuningParameters.prototype, "serverType", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.Column({ name: "PARAMETER_GROUP" }),
    air_control_1.DbString(),
    __metadata("design:type", String)
], TuningParameters.prototype, "parameterGroup", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.Column({ name: "PARAMETER_NAME" }),
    air_control_1.DbString(),
    __metadata("design:type", String)
], TuningParameters.prototype, "parameterName", void 0);
__decorate([
    air_control_1.Column({ name: "PARAMETER_VALUE", nullable: false }),
    air_control_1.DbString(),
    __metadata("design:type", String)
], TuningParameters.prototype, "parameterValue", void 0);
TuningParameters = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "AGT_TUNING_PARAMETERS" })
], TuningParameters);
exports.TuningParameters = TuningParameters;
//# sourceMappingURL=TuningParameters.js.map