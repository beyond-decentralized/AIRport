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
const InjectionTokens_1 = require("./InjectionTokens");
let QueryEntityClassCreator = class QueryEntityClassCreator {
    constructor(airportDatabase, utils, dbSchemaUtils) {
        this.airportDatabase = airportDatabase;
        this.utils = utils;
        this.dbSchemaUtils = dbSchemaUtils;
    }
    createAll(schemas) {
        const schemasToCreate = air_control_1.orderSchemasInOrderOfPrecedence(schemas);
        schemasToCreate.map(dbSchema => this.create(dbSchema));
    }
    create(dbSchema) {
        let qSchema = this.airportDatabase.qSchemaMapByName[dbSchema.name];
        // If the Schema API source has already been loaded
        if (qSchema) {
            qSchema.__dbSchema__ = dbSchema;
            qSchema.__injected__.__dbSchema__ = dbSchema;
            air_control_1.setQSchemaEntities(dbSchema, qSchema.__injected__, this.airportDatabase.qSchemas);
        }
        else {
            qSchema = {
                __constructors__: {},
                __qConstructors__: {},
                __dbSchema__: dbSchema
            };
            this.airportDatabase.qSchemaMapByName[dbSchema.name] = qSchema;
        }
        this.airportDatabase.qSchemas[dbSchema.index] = qSchema;
        air_control_1.setQSchemaEntities(dbSchema, qSchema, this.airportDatabase.qSchemas);
        return qSchema;
    }
};
QueryEntityClassCreator = __decorate([
    typedi_1.Service(InjectionTokens_1.QueryEntityClassCreatorToken),
    __param(0, typedi_1.Inject(air_control_1.AirportDatabaseToken)),
    __param(1, typedi_1.Inject(air_control_1.UtilsToken)),
    __param(2, typedi_1.Inject(ground_control_1.DbSchemaUtilsToken)),
    __metadata("design:paramtypes", [Object, Object, Object])
], QueryEntityClassCreator);
exports.QueryEntityClassCreator = QueryEntityClassCreator;
//# sourceMappingURL=QueryEntityClassCreator.js.map