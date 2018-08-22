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
const InjectionTokens_1 = require("../InjectionTokens");
let SchemaChecker = class SchemaChecker {
    constructor(utils) {
        this.utils = utils;
    }
    async check(jsonSchema) {
        if (!jsonSchema) {
            throw new Error(`Json Schema not provided`);
        }
        if (!(jsonSchema.versions instanceof Array)) {
            throw new Error('schema.versions is not an array');
        }
        if (jsonSchema.versions.length !== 1) {
            // FIXME: add support for schema versioning
            throw new Error('Currently only 1 version of schema is supported');
        }
        await this.checkDomain(jsonSchema);
    }
    async checkDomain(jsonSchema) {
        // TODO: implement domain checking
    }
    async checkDependencies(jsonSchemas) {
        const referencedSchemaMap = new Map();
        const referencedSchemaMapBySchema = new Map();
        for (const jsonSchema of jsonSchemas) {
            const lastJsonSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const referencedSchemaMapForSchema = this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(referencedSchemaMapBySchema, jsonSchema.domain), jsonSchema.name);
            for (const jsonReferencedSchema of lastJsonSchemaVersion.referencedSchemas) {
                this.utils.ensureChildJsMap(referencedSchemaMap, jsonReferencedSchema.domain).set(jsonReferencedSchema.name, jsonReferencedSchema);
                this.utils.ensureChildJsMap(referencedSchemaMapForSchema, jsonReferencedSchema.domain).set(jsonReferencedSchema.name, jsonReferencedSchema);
            }
        }
        for (const jsonSchema of jsonSchemas) {
            for (const [domainName, referenceMapForSchemasOfDomain] of referencedSchemaMapBySchema) {
                for (const [schemaName, schemasReferencedByAGivenSchema] of referenceMapForSchemasOfDomain) {
                }
            }
            const referencedSchemaMapForSchema = referencedSchemaMapBySchema.get(jsonSchema.domain).get(jsonSchema.name);
        }
    }
};
SchemaChecker = __decorate([
    typedi_1.Service(InjectionTokens_1.SchemaCheckerToken),
    __param(0, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object])
], SchemaChecker);
exports.SchemaChecker = SchemaChecker;
//# sourceMappingURL=SchemaChecker.js.map