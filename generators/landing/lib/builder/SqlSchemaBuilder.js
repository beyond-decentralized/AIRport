var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { EntityRelationType, QueryType, } from '@airport/ground-control';
let SqlSchemaBuilder = class SqlSchemaBuilder {
    async build(jsonApplication, existingApplicationMap, newJsonApplicationMap, context) {
        await this.createApplication(jsonApplication, context);
        for (const jsonEntity of jsonApplication.versions[jsonApplication.versions.length - 1].entities) {
            await this.buildTable(jsonApplication, jsonEntity, existingApplicationMap, context);
        }
        const relatedJsonApplicationMap = new Map();
        for (const jsonEntity of jsonApplication.versions[jsonApplication.versions.length - 1].entities) {
            await this.buildForeignKeys(jsonApplication, jsonEntity, existingApplicationMap, newJsonApplicationMap, relatedJsonApplicationMap, context);
        }
    }
    async buildTable(jsonApplication, jsonEntity, existingApplicationMap, context) {
        const primaryKeyColumnNames = [];
        const tableColumnsDdl = jsonEntity.columns.map((jsonColumn) => {
            let columnDdl = `${jsonColumn.name} ${this.getColumnSuffix(jsonApplication, jsonEntity, jsonColumn)}`;
            if (this.isPrimaryKeyColumn(jsonEntity, jsonColumn)) {
                primaryKeyColumnNames.push(jsonColumn.name);
            }
            return columnDdl;
        });
        const createTableSuffix = this.getCreateTableSuffix(jsonApplication, jsonEntity);
        const tableName = this.storeDriver.getTableName(jsonApplication, jsonEntity, context);
        let primaryKeySubStatement = ``;
        if (primaryKeyColumnNames.length) {
            primaryKeySubStatement = this.getPrimaryKeyStatement(primaryKeyColumnNames);
        }
        const createTableDdl = `CREATE TABLE ${tableName} (
		${tableColumnsDdl.join(',\n')}${primaryKeySubStatement}
		)${createTableSuffix}`;
        await this.storeDriver.query(QueryType.DDL, createTableDdl, [], context, false);
        let indexNumber = 0;
        if (jsonEntity.tableConfig.columnIndexes) {
            for (const indexConfig of jsonEntity.tableConfig.columnIndexes) {
                const createIndexDdl = this.getIndexSql('idx_' + tableName + '_' + (++indexNumber), tableName, indexConfig.columnList, indexConfig.unique);
                await this.storeDriver.query(QueryType.DDL, createIndexDdl, [], context, false);
            }
        }
        if (jsonEntity.tableConfig.propertyIndexes) {
            for (const indexConfig of jsonEntity.tableConfig.propertyIndexes) {
                const columnNameList = [];
                for (const jsonColumn of jsonEntity.columns) {
                    for (const propertyRef of jsonColumn.propertyRefs) {
                        if (propertyRef.index === indexConfig.propertyIndex) {
                            columnNameList.push(jsonColumn.name);
                            break;
                        }
                    }
                }
                const createIndexDdl = this.getIndexSql('idx_' + tableName + '_' + (++indexNumber), tableName, columnNameList, indexConfig.unique);
                await this.storeDriver.query(QueryType.DDL, createIndexDdl, [], context, false);
            }
        }
        //
    }
    async buildForeignKeys(jsonApplication, jsonEntity, existingApplicationMap, newJsonApplicationMap, relatedJsonApplicationMap, context) {
        if (!jsonEntity.relations || !jsonEntity.relations.length) {
            return;
        }
        const applicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
        const tableName = this.storeDriver.getTableName(jsonApplication, jsonEntity, context);
        let foreignKeyNumber = 0;
        for (const jsonRelation of jsonEntity.relations) {
            if (jsonRelation.relationType !== EntityRelationType.MANY_TO_ONE) {
                continue;
            }
            let relatedJsonApplication;
            let relatedJsonEntity;
            if (jsonRelation.relationTableApplication_Index
                || jsonRelation.relationTableApplication_Index === 0) {
                const referencedApplication = applicationVersion
                    .referencedApplications[jsonRelation.relationTableApplication_Index];
                let relatedFullApplication_Name = this.dbApplicationUtils
                    .getFullApplication_NameFromDomainAndName(referencedApplication.domain, referencedApplication.name);
                relatedJsonApplication = relatedJsonApplicationMap.get(relatedFullApplication_Name);
                if (!relatedJsonApplication) {
                    const relatedApplication = existingApplicationMap.get(relatedFullApplication_Name);
                    if (relatedApplication) {
                        // FIXME: this should be looked up though currentVersion - make sure it's populated
                        // relatedJsonApplication = relatedApplication.currentVersion[0].applicationVersion.jsonApplication
                        relatedJsonApplication = relatedApplication.versions[0].jsonApplication;
                    }
                    else {
                        relatedJsonApplication = newJsonApplicationMap.get(relatedFullApplication_Name);
                    }
                    if (!relatedJsonApplication) {
                        throw new Error(`Could not find related application ${relatedFullApplication_Name}
            in either existing applications or newly installing applications.`);
                    }
                    relatedJsonApplicationMap.set(relatedFullApplication_Name, relatedJsonApplication);
                }
                const relatedApplicationVersion = relatedJsonApplication
                    .versions[relatedJsonApplication.versions.length - 1];
                relatedJsonEntity = relatedApplicationVersion.entities[jsonRelation.relationTableIndex];
            }
            else {
                relatedJsonApplication = jsonApplication;
                relatedJsonEntity = applicationVersion.entities[jsonRelation.relationTableIndex];
            }
            let foreignKeyColumnNames = [];
            for (const jsonColumn of jsonEntity.columns) {
                for (const propertyRef of jsonColumn.propertyRefs) {
                    if (propertyRef.index === jsonRelation.propertyRef.index) {
                        foreignKeyColumnNames.push(jsonColumn.name);
                        break;
                    }
                }
            }
            const referencedTableName = this.storeDriver
                .getTableName(relatedJsonApplication, relatedJsonEntity, context);
            let referencedColumnNames = [];
            for (const relatedIdColumnRef of relatedJsonEntity.idColumnRefs) {
                referencedColumnNames.push(relatedJsonEntity.columns[relatedIdColumnRef.index].name);
            }
            const foreignKeySql = this.getForeignKeySql(tableName, 'fk_' + tableName + '_foreignKeyNumber', foreignKeyColumnNames, referencedTableName, referencedColumnNames);
            if (foreignKeySql) {
                await this.storeDriver.query(QueryType.DDL, foreignKeySql, [], context, false);
            }
        }
    }
    async buildForeignKeysForTable() {
    }
    isPrimaryKeyColumn(jsonEntity, jsonColumn) {
        return jsonColumn.propertyRefs.some((propertyRef) => {
            const jsonProperty = jsonEntity.properties[propertyRef.index];
            if (jsonProperty.isId) {
                return true;
            }
        });
    }
    /*
    protected abstract isForeignKey(
      jsonEntity: JsonApplicationEntity,
      jsonColumn: JsonApplicationColumn
    ): boolean
    */
    getPrimaryKeyStatement(columnNames) {
        return `,
			PRIMARY KEY (
			${columnNames.join(',\n')}
			)`;
    }
};
__decorate([
    Inject()
], SqlSchemaBuilder.prototype, "airportDatabase", void 0);
__decorate([
    Inject()
], SqlSchemaBuilder.prototype, "dbApplicationUtils", void 0);
__decorate([
    Inject()
], SqlSchemaBuilder.prototype, "sequenceDao", void 0);
__decorate([
    Inject()
], SqlSchemaBuilder.prototype, "storeDriver", void 0);
SqlSchemaBuilder = __decorate([
    Injected()
], SqlSchemaBuilder);
export { SqlSchemaBuilder };
//# sourceMappingURL=SqlSchemaBuilder.js.map