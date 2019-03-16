"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("./InjectionTokens");
let QueryFacade = class QueryFacade {
    constructor(connector) {
        this.connector = connector;
    }
    async find(dbEntity, query, queryResultType, cacheForUpdate = air_control_1.UpdateCacheType.NONE) {
        const result = await this.connector.find(this.getPortableQuery(dbEntity, query, queryResultType));
        if (cacheForUpdate !== air_control_1.UpdateCacheType.NONE) {
            this.databaseFacade.cacheForUpdate(cacheForUpdate, dbEntity, ...result);
        }
        return result;
    }
    async findOne(dbEntity, query, queryResultType, cacheForUpdate = air_control_1.UpdateCacheType.NONE) {
        const result = await this.connector.findOne(this.getPortableQuery(dbEntity, query, queryResultType));
        if (cacheForUpdate !== air_control_1.UpdateCacheType.NONE) {
            this.databaseFacade.cacheForUpdate(cacheForUpdate, dbEntity, result);
        }
        return result;
    }
    search(dbEntity, query, queryResultType, cacheForUpdate = air_control_1.UpdateCacheType.NONE) {
        return this.connector.search(this.getPortableQuery(dbEntity, query, queryResultType));
    }
    searchOne(dbEntity, query, queryResultType, cacheForUpdate = air_control_1.UpdateCacheType.NONE) {
        return this.connector.searchOne(this.getPortableQuery(dbEntity, query, queryResultType));
    }
    getPortableQuery(dbEntity, query, queryResultType, cacheForUpdate = false) {
        return {
            jsonQuery: query.toJSON(),
            parameterMap: query.getParameters(),
            queryResultType,
            schemaIndex: dbEntity.schemaVersion.schema.index,
            tableIndex: dbEntity.index,
            values: query.values
        };
    }
};
QueryFacade = __decorate([
    typedi_1.Service(InjectionTokens_1.QueryFacadeToken),
    __param(0, typedi_1.Inject(ground_control_1.TransactionalConnectorToken))
], QueryFacade);
exports.QueryFacade = QueryFacade;
//# sourceMappingURL=QueryFacade.js.map