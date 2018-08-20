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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
let RealSequenceGenerator = class RealSequenceGenerator {
    constructor(storeDriver, utils) {
        this.storeDriver = storeDriver;
        this.utils = utils;
    }
    async init(domain) {
    }
    async generateSequenceNumbers(dbColumns, numSequencesNeeded) {
        const sequenceSql = this.storeDriver.getSequenceSql(sequenceName);
        this.storeDriver.findNative('');
        const dbEntity = dbColumn.propertyColumns[0].property.entity;
        return null;
    }
};
RealSequenceGenerator = __decorate([
    typedi_1.Service(InjectionTokens_1.SequenceGeneratorToken),
    __param(0, typedi_1.Inject(ground_control_1.StoreDriverToken)),
    __param(1, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object])
], RealSequenceGenerator);
exports.RealSequenceGenerator = RealSequenceGenerator;
//# sourceMappingURL=RealSequenceGenerator.js.map