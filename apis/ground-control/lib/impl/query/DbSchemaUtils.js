"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../../diTokens");
class DbSchemaUtils {
    getSchemaName(jsonSchema) {
        return getSchemaName(jsonSchema);
    }
    getSequenceName(prefixedTableName, columnName) {
        return `${prefixedTableName}_${columnName}__SEQUENCE`;
    }
}
exports.DbSchemaUtils = DbSchemaUtils;
function getSchemaName({ domain, name }) {
    let domainPrefix = '';
    if (domain != 'npmjs.org') {
        domainPrefix = domain
            .replace(/\./g, '_')
            .replace(/-/g, '_');
    }
    const schemaPrefix = name
        .replace(/@/g, '_')
        .replace(/\//g, '__')
        .replace(/-/g, '_');
    return `${domainPrefix}__${schemaPrefix}`;
}
exports.getSchemaName = getSchemaName;
di_1.DI.set(diTokens_1.DB_SCHEMA_UTILS, DbSchemaUtils);
//# sourceMappingURL=DbSchemaUtils.js.map