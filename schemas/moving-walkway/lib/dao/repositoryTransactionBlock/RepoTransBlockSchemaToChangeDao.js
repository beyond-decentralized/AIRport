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
const typedi_1 = require("typedi");
const Service_1 = require("typedi/decorators/Service");
const generated_1 = require("../../generated/generated");
const InjectionTokens_1 = require("../../InjectionTokens");
let RepoTransBlockSchemaToChangeDao = class RepoTransBlockSchemaToChangeDao extends generated_1.BaseRepoTransBlockSchemaToChangeDao {
    constructor(utils) {
        super(utils);
    }
};
RepoTransBlockSchemaToChangeDao = __decorate([
    Service_1.Service(InjectionTokens_1.RepoTransBlockSchemaToChangeDaoToken),
    __param(0, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object])
], RepoTransBlockSchemaToChangeDao);
exports.RepoTransBlockSchemaToChangeDao = RepoTransBlockSchemaToChangeDao;
//# sourceMappingURL=RepoTransBlockSchemaToChangeDao.js.map