"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const InjectionTokens_1 = require("../../InjectionTokens");
class DbSchemaUtils {
    getSchemaName(jsonSchema) {
        return this.getSchemaNameFromDomainAndJsonSchemaNames(jsonSchema.domain, jsonSchema.name);
    }
    getSchemaNameFromDomainAndJsonSchemaNames(domainName, jsonSchemaName) {
        const domainPrefix = domainName.replace(/\./g, '_');
        const schemaPrefix = jsonSchemaName
            .replace(/@/g, '_')
            .replace(/\//g, '_')
            .replace(/-/g, '_');
        return `${domainPrefix}__${schemaPrefix}`;
    }
    getSequenceName(prefixedTableName, columnName) {
        return `${prefixedTableName}_${columnName}__SEQUENCE`;
    }
}
exports.DbSchemaUtils = DbSchemaUtils;
di_1.DI.set(InjectionTokens_1.DB_SCHEMA_UTILS, DbSchemaUtils);
//# sourceMappingURL=DbSchemaUtils.js.map