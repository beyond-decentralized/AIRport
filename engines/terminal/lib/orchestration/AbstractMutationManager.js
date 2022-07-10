var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { InsertValues, } from '@airport/tarmaq-query';
import { Inject, Injected } from '@airport/direction-indicator';
let AbstractMutationManager = class AbstractMutationManager {
    getPortableQuery(applicationIndex, tableIndex, query, queryResultType) {
        return {
            applicationIndex,
            tableIndex,
            jsonQuery: query.toJSON(this.queryUtils, this.fieldUtils, this.relationManager),
            parameterMap: query.getParameters(),
            queryResultType,
        };
    }
    async doInsertValues(transaction, q, entities, context) {
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
                this.applicationUtils.forEachColumnTypeOfRelation(dbRelation, (dbColumn, propertyNameChains) => {
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
        let portableQuery = this.getPortableQuery(dbEntity.applicationVersion.application.index, dbEntity.index, insertValues, null);
        return await transaction.insertValues(portableQuery, context);
    }
};
__decorate([
    Inject()
], AbstractMutationManager.prototype, "applicationUtils", void 0);
__decorate([
    Inject()
], AbstractMutationManager.prototype, "fieldUtils", void 0);
__decorate([
    Inject()
], AbstractMutationManager.prototype, "queryUtils", void 0);
__decorate([
    Inject()
], AbstractMutationManager.prototype, "relationManager", void 0);
AbstractMutationManager = __decorate([
    Injected()
], AbstractMutationManager);
export { AbstractMutationManager };
//# sourceMappingURL=AbstractMutationManager.js.map