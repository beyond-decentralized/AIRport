import { container } from '@airport/di';
import { EntityRelationType, getApplicationNameFromDomainAndName, QueryType, STORE_DRIVER, } from '@airport/ground-control';
export class SqlApplicationBuilder {
    async build(jsonApplication, existingApplicationMap, newJsonApplicationMap, context) {
        const storeDriver = await container(this).get(STORE_DRIVER);
        await this.createApplication(jsonApplication, storeDriver, context);
        for (const jsonEntity of jsonApplication.versions[jsonApplication.versions.length - 1].entities) {
            await this.buildTable(jsonApplication, jsonEntity, existingApplicationMap, storeDriver, context);
        }
        const relatedJsonApplicationMap = new Map();
        for (const jsonEntity of jsonApplication.versions[jsonApplication.versions.length - 1].entities) {
            await this.buildForeignKeys(jsonApplication, jsonEntity, existingApplicationMap, newJsonApplicationMap, relatedJsonApplicationMap, storeDriver, context);
        }
    }
    async buildTable(jsonApplication, jsonEntity, existingApplicationMap, storeDriver, context) {
        const primaryKeyColumnNames = [];
        const tableColumnsDdl = jsonEntity.columns.map((jsonColumn) => {
            let columnDdl = `${jsonColumn.name} ${this.getColumnSuffix(jsonApplication, jsonEntity, jsonColumn)}`;
            if (this.isPrimaryKeyColumn(jsonEntity, jsonColumn)) {
                primaryKeyColumnNames.push(jsonColumn.name);
            }
            return columnDdl;
        });
        const createTableSuffix = this.getCreateTableSuffix(jsonApplication, jsonEntity);
        const tableName = storeDriver.getTableName(jsonApplication, jsonEntity, context);
        let primaryKeySubStatement = ``;
        if (primaryKeyColumnNames.length) {
            primaryKeySubStatement = this.getPrimaryKeyStatement(primaryKeyColumnNames);
        }
        const createTableDdl = `CREATE TABLE ${tableName} (
		${tableColumnsDdl.join(',\n')}${primaryKeySubStatement}
		)${createTableSuffix}`;
        await storeDriver.query(QueryType.DDL, createTableDdl, [], context, false);
        let indexNumber = 0;
        if (jsonEntity.tableConfig.columnIndexes) {
            for (const indexConfig of jsonEntity.tableConfig.columnIndexes) {
                const createIndexDdl = this.getIndexSql('idx_' + tableName + '_' + (++indexNumber), tableName, indexConfig.columnList, indexConfig.unique);
                await storeDriver.query(QueryType.DDL, createIndexDdl, [], context, false);
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
                await storeDriver.query(QueryType.DDL, createIndexDdl, [], context, false);
            }
        }
        //
    }
    async buildForeignKeys(jsonApplication, jsonEntity, existingApplicationMap, newJsonApplicationMap, relatedJsonApplicationMap, storeDriver, context) {
        if (!jsonEntity.relations || !jsonEntity.relations.length) {
            return;
        }
        const applicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
        const tableName = storeDriver.getTableName(jsonApplication, jsonEntity, context);
        let foreignKeyNumber = 0;
        for (const jsonRelation of jsonEntity.relations) {
            if (jsonRelation.relationType !== EntityRelationType.MANY_TO_ONE) {
                continue;
            }
            let relatedJsonApplication;
            let relatedJsonEntity;
            if (jsonRelation.relationTableApplicationIndex
                || jsonRelation.relationTableApplicationIndex === 0) {
                const referencedApplication = applicationVersion
                    .referencedApplications[jsonRelation.relationTableApplicationIndex];
                let relatedApplicationName = getApplicationNameFromDomainAndName(referencedApplication.domain, referencedApplication.name);
                relatedJsonApplication = relatedJsonApplicationMap.get(relatedApplicationName);
                if (!relatedJsonApplication) {
                    const relatedApplication = existingApplicationMap.get(relatedApplicationName);
                    if (relatedApplication) {
                        // FIXME: this should be looked up though currentVersion - make sure it's populated
                        // relatedJsonApplication = relatedApplication.currentVersion[0].applicationVersion.jsonApplication
                        relatedJsonApplication = relatedApplication.versions[0].jsonApplication;
                    }
                    else {
                        relatedJsonApplication = newJsonApplicationMap.get(relatedApplicationName);
                    }
                    if (!relatedJsonApplication) {
                        throw new Error(`Could not find related application ${relatedApplicationName}
            in either existing applications or newly installing applications.`);
                    }
                    relatedJsonApplicationMap.set(relatedApplicationName, relatedJsonApplication);
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
            const referencedTableName = storeDriver
                .getTableName(relatedJsonApplication, relatedJsonEntity, context);
            let referencedColumnNames = [];
            for (const relatedIdColumnRef of relatedJsonEntity.idColumnRefs) {
                referencedColumnNames.push(relatedJsonEntity.columns[relatedIdColumnRef.index].name);
            }
            const foreignKeySql = this.getForeignKeySql(tableName, 'fk_' + tableName + '_foreignKeyNumber', foreignKeyColumnNames, referencedTableName, referencedColumnNames);
            if (foreignKeySql) {
                await storeDriver.query(QueryType.DDL, foreignKeySql, [], context, false);
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
}
//# sourceMappingURL=SqlApplicationBuilder.js.map