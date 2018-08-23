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
const InjectionTokens_1 = require("../InjectionTokens");
let SchemaLocator = class SchemaLocator {
    constructor(terminalStore) {
        this.terminalStore = terminalStore;
    }
    locateExistingSchemaVersionRecord(jsonSchema) {
        const schemaVersionsForDomainName = this.terminalStore
            .getLatestSchemaVersionMapByNames().get(jsonSchema.domain);
        if (!schemaVersionsForDomainName) {
            return null;
        }
        const latestSchemaVersionForSchema = schemaVersionsForDomainName.get(jsonSchema.name);
        const jsonSchemaVersion = jsonSchema.versions[0];
        if (latestSchemaVersionForSchema.integerVersion !== jsonSchemaVersion.integerVersion) {
            throw new Error(`Multiple versions of schemas are not yet supported`);
        }
        return latestSchemaVersionForSchema;
    }
    locateLatestSchemaVersionBySchemaName(schemaName) {
        return this.terminalStore.getLatestSchemaVersionMapBySchemaName()
            .get(schemaName);
    }
};
SchemaLocator = __decorate([
    typedi_1.Inject(InjectionTokens_1.SchemaLocatorToken),
    __param(0, typedi_1.Inject(terminal_map_1.TerminalStoreToken)),
    __metadata("design:paramtypes", [Object])
], SchemaLocator);
exports.SchemaLocator = SchemaLocator;
//# sourceMappingURL=SchemaLocator.js.map