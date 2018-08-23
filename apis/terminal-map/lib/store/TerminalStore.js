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
const rxjs_1 = require("rxjs");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
const Selector_1 = require("./Selector");
let TerminalStore = class TerminalStore {
    constructor(utils) {
        this.utils = utils;
        this.state = new rxjs_1.BehaviorSubject({
            terminal: null,
            nodesBySyncFrequency: new Map(),
            domains: []
        });
        this.getTerminalState = Selector_1.createRootSelector(this.state);
        this.getDomains = Selector_1.createSelector(this.getTerminalState, terminal => terminal.domains);
        this.getNodesBySyncFrequency = Selector_1.createSelector(this.getTerminalState, terminal => terminal.nodesBySyncFrequency);
        this.getLatestSchemaVersionMapByNames = Selector_1.createSelector(this.getDomains, domains => {
            const latestSchemaVersionMapByNames = new Map();
            for (const domain of domains) {
                const mapForDomain = this.utils.ensureChildJsMap(latestSchemaVersionMapByNames, domain.name);
                for (const schema of domain.schemas) {
                    mapForDomain.set(schema.name, schema.currentVersion);
                }
            }
            return latestSchemaVersionMapByNames;
        });
        this.getLatestSchemaVersionMapBySchemaName = Selector_1.createSelector(this.getLatestSchemaVersionMapByNames, (latestSchemaVersionMapByNames) => {
            const latestSchemaVersionMapBySchemaName = new Map();
            for (const schemaVersionsForDomainName of latestSchemaVersionMapByNames.values()) {
                for (const schemaVersion of schemaVersionsForDomainName.values()) {
                    latestSchemaVersionMapBySchemaName.set(schemaVersion.schema.name, schemaVersion);
                }
            }
            return latestSchemaVersionMapBySchemaName;
        });
        this.getLatestSchemaVersionsByIndexes = Selector_1.createSelector(this.getDomains, domains => {
            const latestSchemaVersionsByNames = [];
            for (const domain of domains) {
                for (const schema of domain.schemas) {
                    latestSchemaVersionsByNames[schema.index] = schema.currentVersion;
                }
            }
            return latestSchemaVersionsByNames;
        });
    }
    tearDown() {
    }
};
TerminalStore = __decorate([
    typedi_1.Service(InjectionTokens_1.TerminalStoreToken),
    __param(0, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object])
], TerminalStore);
exports.TerminalStore = TerminalStore;
//# sourceMappingURL=TerminalStore.js.map