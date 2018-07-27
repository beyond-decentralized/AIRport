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
const moving_walkway_1 = require("@airport/moving-walkway");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../../../InjectionTokens");
let MissingRecordCreator = class MissingRecordCreator {
    constructor(missingRecordDao) {
        this.missingRecordDao = missingRecordDao;
    }
};
MissingRecordCreator = __decorate([
    typedi_1.Inject(InjectionTokens_1.MissingRecordCreatorToken),
    __param(0, typedi_1.Inject(moving_walkway_1.MissingRecordDaoToken)),
    __metadata("design:paramtypes", [Object])
], MissingRecordCreator);
exports.MissingRecordCreator = MissingRecordCreator;
//# sourceMappingURL=MissingRecordCreator.js.map