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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
const typedi_1 = require("typedi");
const schema_1 = require("./generated/schema");
const InjectionTokens_1 = require("./InjectionTokens");
__export(require("./dao/dao"));
__export(require("./ddl/ddl"));
__export(require("./generated/generated"));
__export(require("./InjectionTokens"));
let AtAirport_TrafficPattern_QSchema = class AtAirport_TrafficPattern_QSchema {
    constructor(dao, dmo, airportDatabase, dbSchemaUtils) {
        this.dao = dao;
        this.dmo = dmo;
        const schemaName = dbSchemaUtils.getSchemaName(schema_1.SCHEMA);
        const existingQSchema = airportDatabase.qSchemaMapByName[schemaName];
        if (existingQSchema) {
            existingQSchema.dao = dao;
            existingQSchema.dmo = dao;
        }
        else {
            airportDatabase.qSchemaMapByName[schemaName] = this;
        }
    }
};
AtAirport_TrafficPattern_QSchema = __decorate([
    typedi_1.Service(InjectionTokens_1.AtAirport_TrafficPattern_QSchemaToken),
    __param(0, typedi_1.Inject(InjectionTokens_1.AtAirport_TrafficPattern_DaosToken)),
    __param(1, typedi_1.Inject(InjectionTokens_1.AtAirport_TrafficPattern_DmosToken)),
    __param(2, typedi_1.Inject(air_control_1.AirportDatabaseToken)),
    __param(3, typedi_1.Inject(ground_control_1.DbSchemaUtilsToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], AtAirport_TrafficPattern_QSchema);
exports.AtAirport_TrafficPattern_QSchema = AtAirport_TrafficPattern_QSchema;
//# sourceMappingURL=index.js.map