"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
let ApplicationPackage = class ApplicationPackage {
};
__decorate([
    air_control_1.Id(),
    air_control_1.GeneratedValue()
], ApplicationPackage.prototype, "id", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "APPLICATION_ID", referencedColumnName: "ID" })
], ApplicationPackage.prototype, "application", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "PACKAGE_ID", referencedColumnName: "ID" })
], ApplicationPackage.prototype, "package", void 0);
ApplicationPackage = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "APPLICATION_PACKAGES" })
], ApplicationPackage);
exports.ApplicationPackage = ApplicationPackage;
//# sourceMappingURL=ApplicationPackage.js.map