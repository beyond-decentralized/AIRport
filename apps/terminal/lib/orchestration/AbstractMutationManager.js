"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
class AbstractMutationManager {
    getPortableQuery(schemaIndex, tableIndex, query, queryResultType, queryUtils, fieldUtils) {
        return {
            schemaIndex,
            tableIndex,
            jsonQuery: query.toJSON(queryUtils, fieldUtils),
            parameterMap: query.getParameters(),
            queryResultType
        };
    }
    async doInsertValues(q, entities) {
        const [fieldUtils, queryUtils, schemaUtils, storeDriver] = await di_1.container(this).get(air_control_1.FIELD_UTILS, air_control_1.QUERY_UTILS, air_control_1.SCHEMA_UTILS, ground_control_1.STORE_DRIVER);
        const dbEntity = q.__driver__.dbEntity;
        const columnIndexes = [];
        const columnValueLookups = [];
        for (const dbProperty of dbEntity.properties) {
            let columnValueLookup = {
                name: dbProperty.name,
                nested: null,
            };
            if (dbProperty.relation && dbProperty.relation.length) {
                const dbRelation = dbProperty.relation[0];
                schemaUtils.forEachColumnTypeOfRelation(dbRelation, (dbColumn, propertyNameChains) => {
                    if (columnIndexes[dbColumn.index]) {
                        return;
                    }
                    columnIndexes[dbColumn.index] = dbColumn.index;
                    columnValueLookups[dbColumn.index](columnValueLookup);
                    const firstPropertyNameChain = propertyNameChains[0];
                    for (let i = 1; i < firstPropertyNameChain.length; i++) {
                        const propertyName = firstPropertyNameChain[i];
                        const nextColumnValueLookup = {
                            name: propertyName,
                            nested: null
                        };
                        columnValueLookup.nested = nextColumnValueLookup;
                        columnValueLookup = nextColumnValueLookup;
                    }
                });
            }
            else {
                const dbColumn = dbProperty.propertyColumns[0].column;
                if (columnIndexes[dbColumn.index]) {
                    continue;
                }
                columnIndexes[dbColumn.index] = dbColumn.index;
                columnValueLookups[dbColumn.index](columnValueLookup);
            }
        }
        const values = entities.map(entity => {
            return columnValueLookups.map(lookup => {
                let value = entity[lookup.name];
                while (lookup.nested) {
                    if (!(value instanceof Object)) {
                        break;
                    }
                    lookup = lookup.nested;
                    value = value[lookup.name];
                }
                return value;
            });
        });
        const rawInsertValues = {
            insertInto: q,
            columns: null,
            values,
        };
        let insertValues = new air_control_1.InsertValues(rawInsertValues, columnIndexes);
        let portableQuery = this.getPortableQuery(dbEntity.schemaVersion.schema.index, dbEntity.index, insertValues, null, queryUtils, fieldUtils);
        return await storeDriver.insertValues(portableQuery);
    }
}
exports.AbstractMutationManager = AbstractMutationManager;
//# sourceMappingURL=AbstractMutationManager.js.map