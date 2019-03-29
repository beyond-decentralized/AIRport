"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
class AbstractMutationManager {
    constructor() {
        di_1.DI.get((dataStore, utils) => {
            this.dataStore = dataStore;
            this.utils = utils;
        }, ground_control_1.STORE_DRIVER, air_control_1.UTILS);
    }
    getPortableQuery(schemaIndex, tableIndex, query, queryResultType) {
        return {
            schemaIndex,
            tableIndex,
            jsonQuery: query.toJSON(),
            parameterMap: query.getParameters(),
            queryResultType,
            values: query.values
        };
    }
    async doInsertValues(q, entities) {
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
                this.utils.Schema.forEachColumnTypeOfRelation(dbRelation, (dbColumn, propertyNameChains) => {
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
        let portableQuery = this.getPortableQuery(dbEntity.schema.index, dbEntity.index, insertValues, null);
        return await this.dataStore.insertValues(portableQuery);
    }
}
exports.AbstractMutationManager = AbstractMutationManager;
//# sourceMappingURL=AbstractMutationManager.js.map