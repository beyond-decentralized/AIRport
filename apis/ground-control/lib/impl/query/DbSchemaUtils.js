"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSchemaName({ domain, name }) {
    let domainPrefix = '';
    if (domain.name) {
        domain = domain.name;
    }
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
function getTableName(schema, table) {
    let theTableName = table.name;
    if (table.tableConfig && table.tableConfig.name) {
        theTableName = table.tableConfig.name;
    }
    return `${this.getSchemaName(schema)}__${theTableName}`;
}
exports.getTableName = getTableName;
function getSequenceName(prefixedTableName, columnName) {
    return `${prefixedTableName}_${columnName}__SEQUENCE`;
}
exports.getSequenceName = getSequenceName;
//# sourceMappingURL=DbSchemaUtils.js.map