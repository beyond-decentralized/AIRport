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
const typedi_1 = require("typedi");
const diTokens_1 = require("../diTokens");
let QueryManager = class QueryManager {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }
    async find(portableQuery, cachedSqlQueryId) {
        return await this.dataStore.find(portableQuery, cachedSqlQueryId);
    }
    async findOne(portableQuery, cachedSqlQueryId) {
        return await this.dataStore.findOne(portableQuery, cachedSqlQueryId);
    }
    search(portableQuery, cachedSqlQueryId) {
        return this.dataStore.search(portableQuery, cachedSqlQueryId);
    }
    searchOne(portableQuery, cachedSqlQueryId) {
        return this.dataStore.searchOne(portableQuery, cachedSqlQueryId);
    }
};
QueryManager = __decorate([
    typedi_1.Service(diTokens_1.QUERY_MANAGER),
    __param(0, typedi_1.Inject(_ => diTokens_1.STORE_DRIVER))
], QueryManager);
exports.QueryManager = QueryManager;
//# sourceMappingURL=QueryManager.js.map