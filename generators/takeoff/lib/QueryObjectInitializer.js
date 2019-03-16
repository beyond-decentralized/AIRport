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
const terminal_map_1 = require("@airport/terminal-map");
const typedi_1 = require("typedi");
const DdlObjectLinker_1 = require("./DdlObjectLinker");
const DdlObjectRetriever_1 = require("./DdlObjectRetriever");
const InjectionTokens_1 = require("./InjectionTokens");
let QueryObjectInitializer = class QueryObjectInitializer {
    constructor(ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator, terminalStore) {
        this.ddlObjectLinker = ddlObjectLinker;
        this.ddlObjectRetriever = ddlObjectRetriever;
        this.queryEntityClassCreator = queryEntityClassCreator;
        this.terminalStore = terminalStore;
    }
    async initialize() {
        const ddlObjects = await this.ddlObjectRetriever.retrieveDdlObjects();
        this.generateQObjectsAndPopulateStore(ddlObjects);
    }
    generateQObjectsAndPopulateStore(ddlObjects) {
        this.ddlObjectLinker.link(ddlObjects);
        this.queryEntityClassCreator.createAll(ddlObjects.schemas);
        this.terminalStore.state.next({
            ...this.terminalStore.getTerminalState(),
            domains: ddlObjects.domains,
            schemas: ddlObjects.schemas
        });
    }
};
QueryObjectInitializer = __decorate([
    typedi_1.Service(InjectionTokens_1.QueryObjectInitializerToken),
    __param(0, typedi_1.Inject(InjectionTokens_1.DdlObjectLinkerToken)),
    __param(1, typedi_1.Inject(InjectionTokens_1.DdlObjectRetrieverToken)),
    __param(2, typedi_1.Inject(InjectionTokens_1.QueryEntityClassCreatorToken)),
    __param(3, typedi_1.Inject(terminal_map_1.TerminalStoreToken)),
    __metadata("design:paramtypes", [DdlObjectLinker_1.DdlObjectLinker,
        DdlObjectRetriever_1.DdlObjectRetriever, Object, Object])
], QueryObjectInitializer);
exports.QueryObjectInitializer = QueryObjectInitializer;
//# sourceMappingURL=QueryObjectInitializer.js.map