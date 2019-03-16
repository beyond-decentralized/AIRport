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
const InjectionTokens_1 = require("@airport/takeoff/lib/InjectionTokens");
const typedi_1 = require("typedi");
const InjectionTokens_2 = require("./InjectionTokens");
let SchemaInitializer = class SchemaInitializer {
    constructor(queryObjectInitializer, schemaBuilder, schemaChecker, schemaLocator, schemaRecorder) {
        this.queryObjectInitializer = queryObjectInitializer;
        this.schemaBuilder = schemaBuilder;
        this.schemaChecker = schemaChecker;
        this.schemaLocator = schemaLocator;
        this.schemaRecorder = schemaRecorder;
    }
    async initialize(jsonSchemas) {
        const jsonSchemasToInstall = [];
        for (const jsonSchema of jsonSchemas) {
            await this.schemaChecker.check(jsonSchema);
            const existingSchema = this.schemaLocator.locateExistingSchemaVersionRecord(jsonSchema);
            if (existingSchema) {
                // Nothing needs to be done, we already have this schema version
                continue;
            }
            jsonSchemasToInstall.push(jsonSchema);
        }
        const schemaReferenceCheckResults = await this.schemaChecker
            .checkDependencies(jsonSchemasToInstall);
        if (schemaReferenceCheckResults.neededDependencies.length
            || schemaReferenceCheckResults.schemasInNeedOfAdditionalDependencies.length) {
            throw new Error(`Installing schemas with external dependencies
			is not currently supported.`);
        }
        for (const jsonSchema of schemaReferenceCheckResults.schemasWithValidDependencies) {
            await this.schemaBuilder.build(jsonSchema);
        }
        const ddlObjects = await this.schemaRecorder.record(schemaReferenceCheckResults.schemasWithValidDependencies);
        this.queryObjectInitializer.generateQObjectsAndPopulateStore(ddlObjects);
    }
};
SchemaInitializer = __decorate([
    typedi_1.Service(InjectionTokens_2.SchemaInitializerToken),
    __param(0, typedi_1.Inject(InjectionTokens_1.QueryObjectInitializerToken)),
    __param(1, typedi_1.Inject(InjectionTokens_2.SchemaBuilderToken)),
    __param(2, typedi_1.Inject(InjectionTokens_2.SchemaCheckerToken)),
    __param(3, typedi_1.Inject(InjectionTokens_2.SchemaLocatorToken)),
    __param(4, typedi_1.Inject(InjectionTokens_2.SchemaRecorderToken))
], SchemaInitializer);
exports.SchemaInitializer = SchemaInitializer;
//# sourceMappingURL=SchemaInitializer.js.map