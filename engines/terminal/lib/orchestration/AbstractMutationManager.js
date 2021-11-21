import { FIELD_UTILS, InsertValues, QUERY_UTILS, SCHEMA_UTILS, } from '@airport/air-control';
import { container } from '@airport/di';
export class AbstractMutationManager {
    getPortableQuery(schemaIndex, tableIndex, query, queryResultType, queryUtils, fieldUtils) {
        return {
            schemaIndex,
            tableIndex,
            jsonQuery: query.toJSON(queryUtils, fieldUtils),
            parameterMap: query.getParameters(),
            queryResultType,
        };
    }
    async doInsertValues(transaction, q, entities, context) {
        const [fieldUtils, queryUtils, schemaUtils,] = await container(this).get(FIELD_UTILS, QUERY_UTILS, SCHEMA_UTILS);
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
                    columnValueLookups[dbColumn.index] = columnValueLookup;
                    const firstPropertyNameChain = propertyNameChains[0];
                    for (let i = 1; i < firstPropertyNameChain.length; i++) {
                        const propertyName = firstPropertyNameChain[i];
                        const nextColumnValueLookup = {
                            name: propertyName,
                            nested: null,
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
                columnValueLookups[dbColumn.index] = columnValueLookup;
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
                return value === undefined ? null : value;
            });
        });
        const rawInsertValues = {
            insertInto: q,
            columns: null,
            values,
        };
        let insertValues = new InsertValues(rawInsertValues, columnIndexes);
        let portableQuery = this.getPortableQuery(dbEntity.schemaVersion.schema.index, dbEntity.index, insertValues, null, queryUtils, fieldUtils);
        return await transaction.insertValues(portableQuery, context);
    }
}
//# sourceMappingURL=AbstractMutationManager.js.map