"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../../InjectionTokens");
let SchemaUtils = class SchemaUtils {
    getSchemaName(jsonSchema) {
        const domainPrefix = jsonSchema.domain.replace(/\./g, '_');
        const schemaPrefix = jsonSchema.name
            .replace(/@/g, '_')
            .replace(/\//g, '_');
        return `${domainPrefix}__${schemaPrefix}`;
    }
    getSequenceName(prefixedTableName, columnName) {
        return `${prefixedTableName}_columnName_SEQUENCE`;
    }
};
SchemaUtils = __decorate([
    typedi_1.Service(InjectionTokens_1.SchemaUtilsToken)
], SchemaUtils);
exports.SchemaUtils = SchemaUtils;
//# sourceMappingURL=SchemaUtils.js.map