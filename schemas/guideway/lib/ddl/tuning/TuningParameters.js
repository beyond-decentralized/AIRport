var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbString, Entity, Id, Table } from "@airport/air-control";
let TuningParameters = class TuningParameters {
};
__decorate([
    Id(),
    Column({ name: "SERVER_TYPE" }),
    DbString()
], TuningParameters.prototype, "serverType", void 0);
__decorate([
    Id(),
    Column({ name: "PARAMETER_GROUP" }),
    DbString()
], TuningParameters.prototype, "parameterGroup", void 0);
__decorate([
    Id(),
    Column({ name: "PARAMETER_NAME" }),
    DbString()
], TuningParameters.prototype, "parameterName", void 0);
__decorate([
    Column({ name: "PARAMETER_VALUE", nullable: false }),
    DbString()
], TuningParameters.prototype, "parameterValue", void 0);
TuningParameters = __decorate([
    Entity(),
    Table({ name: "AGT_TUNING_PARAMETERS" })
], TuningParameters);
export { TuningParameters };
//# sourceMappingURL=TuningParameters.js.map