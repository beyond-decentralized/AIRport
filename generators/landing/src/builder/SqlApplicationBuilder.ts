import { IAirportDatabase } from '@airport/air-control';
import { ISequence } from '@airport/airport-code';
import { container, IContext } from '@airport/direction-indicator';
import {
  EntityRelationType,
  getFullApplicationNameFromDomainAndName,
  JsonApplication,
  JsonApplicationColumn,
  JsonApplicationEntity,
  JsonApplicationVersion,
  PropertyReference,
  QueryType,
} from '@airport/ground-control';
import { JsonApplicationWithLastIds } from '@airport/security-check';
import {
  IStoreDriver,
  STORE_DRIVER
} from '@airport/terminal-map'
import { IApplication } from '@airport/airspace';
import { IApplicationBuilder } from './IApplicationBuilder';

export abstract class SqlApplicationBuilder
  implements IApplicationBuilder {

  airportDatabase: IAirportDatabase

  async build(
    jsonApplication: JsonApplication,
    existingApplicationMap: Map<string, IApplication>,
    newJsonApplicationMap: Map<string, JsonApplicationWithLastIds>,
    context: IContext,
  ): Promise<void> {
    const storeDriver = await container(this).get(STORE_DRIVER);

    await this.createApplication(jsonApplication, storeDriver, context);


    for (const jsonEntity of jsonApplication.versions[jsonApplication.versions.length - 1].entities) {
      await this.buildTable(jsonApplication, jsonEntity, existingApplicationMap, storeDriver, context);
    }

    const relatedJsonApplicationMap: Map<string, JsonApplication> = new Map()

    for (const jsonEntity of jsonApplication.versions[jsonApplication.versions.length - 1].entities) {
      await this.buildForeignKeys(jsonApplication, jsonEntity, existingApplicationMap,
        newJsonApplicationMap, relatedJsonApplicationMap, storeDriver, context);
    }

  }

  abstract createApplication(
    jsonApplication: JsonApplication,
    storeDriver: IStoreDriver,
    context: IContext,
  ): Promise<void>;

  async buildTable(
    jsonApplication: JsonApplication,
    jsonEntity: JsonApplicationEntity,
    existingApplicationMap: Map<string, IApplication>,
    storeDriver: IStoreDriver,
    context: IContext,
  ): Promise<void> {
    const primaryKeyColumnNames: string[] = [];
    const tableColumnsDdl: string[] = jsonEntity.columns.map((
      jsonColumn: JsonApplicationColumn,
    ) => {
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

    let indexNumber = 0
    if (jsonEntity.tableConfig.columnIndexes) {
      for (const indexConfig of jsonEntity.tableConfig.columnIndexes) {
        const createIndexDdl = this.getIndexSql('idx_' + tableName + '_' + (++indexNumber),
          tableName, indexConfig.columnList, indexConfig.unique);

        await storeDriver.query(QueryType.DDL, createIndexDdl, [], context, false);
      }
    }
    if (jsonEntity.tableConfig.propertyIndexes) {
      for (const indexConfig of jsonEntity.tableConfig.propertyIndexes) {
        const columnNameList = []
        for (const jsonColumn of jsonEntity.columns) {
          for (const propertyRef of jsonColumn.propertyRefs) {
            if (propertyRef.index === indexConfig.propertyIndex) {
              columnNameList.push(jsonColumn.name)
              break
            }
          }
        }

        const createIndexDdl = this.getIndexSql('idx_' + tableName + '_' + (++indexNumber),
          tableName, columnNameList, indexConfig.unique);

        await storeDriver.query(QueryType.DDL, createIndexDdl, [], context, false);
      }
    }
    //
  }

  async buildForeignKeys(
    jsonApplication: JsonApplication,
    jsonEntity: JsonApplicationEntity,
    existingApplicationMap: Map<string, IApplication>,
    newJsonApplicationMap: Map<string, JsonApplicationWithLastIds>,
    relatedJsonApplicationMap: Map<string, JsonApplication>,
    storeDriver: IStoreDriver,
    context: IContext,
  ): Promise<void> {
    if (!jsonEntity.relations || !jsonEntity.relations.length) {
      return
    }

    const applicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
    const tableName = storeDriver.getTableName(jsonApplication, jsonEntity, context);

    let foreignKeyNumber = 0
    for (const jsonRelation of jsonEntity.relations) {
      if (jsonRelation.relationType !== EntityRelationType.MANY_TO_ONE) {
        continue
      }
      let relatedJsonApplication: JsonApplication
      let relatedJsonEntity: JsonApplicationEntity
      if (jsonRelation.relationTableApplicationIndex
        || jsonRelation.relationTableApplicationIndex === 0) {
        const referencedApplication = applicationVersion
          .referencedApplications[jsonRelation.relationTableApplicationIndex]
        let relatedFullApplicationName = getFullApplicationNameFromDomainAndName(
          referencedApplication.domain, referencedApplication.name
        )
        relatedJsonApplication = relatedJsonApplicationMap.get(relatedFullApplicationName)
        if (!relatedJsonApplication) {
          const relatedApplication = existingApplicationMap.get(relatedFullApplicationName)
          if (relatedApplication) {
            // FIXME: this should be looked up though currentVersion - make sure it's populated
            // relatedJsonApplication = relatedApplication.currentVersion[0].applicationVersion.jsonApplication
            relatedJsonApplication = relatedApplication.versions[0].jsonApplication
          } else {
            relatedJsonApplication = newJsonApplicationMap.get(relatedFullApplicationName)
          }
          if (!relatedJsonApplication) {
            throw new Error(`Could not find related application ${relatedFullApplicationName}
            in either existing applications or newly installing applications.`)
          }
          relatedJsonApplicationMap.set(relatedFullApplicationName, relatedJsonApplication)
        }
        const relatedApplicationVersion: JsonApplicationVersion = relatedJsonApplication
          .versions[relatedJsonApplication.versions.length - 1]
        relatedJsonEntity = relatedApplicationVersion.entities[jsonRelation.relationTableIndex]
      } else {
        relatedJsonApplication = jsonApplication
        relatedJsonEntity = applicationVersion.entities[jsonRelation.relationTableIndex]
      }

      let foreignKeyColumnNames = []
      for (const jsonColumn of jsonEntity.columns) {
        for (const propertyRef of jsonColumn.propertyRefs) {
          if (propertyRef.index === jsonRelation.propertyRef.index) {
            foreignKeyColumnNames.push(jsonColumn.name)
            break
          }
        }
      }

      const referencedTableName = storeDriver
        .getTableName(relatedJsonApplication, relatedJsonEntity, context);
      let referencedColumnNames = []
      for (const relatedIdColumnRef of relatedJsonEntity.idColumnRefs) {
        referencedColumnNames.push(relatedJsonEntity.columns[relatedIdColumnRef.index].name)
      }
      const foreignKeySql = this.getForeignKeySql(tableName, 'fk_' + tableName + '_foreignKeyNumber',
        foreignKeyColumnNames, referencedTableName, referencedColumnNames)

      if (foreignKeySql) {
        await storeDriver.query(QueryType.DDL, foreignKeySql, [], context, false);
      }
    }
  }

  async buildForeignKeysForTable() {

  }

  protected abstract getIndexSql(
    indexName: string,
    tableName: string,
    columnNameList: string[],
    unique: boolean
  ): string

  protected abstract getForeignKeySql(
    tableName: string,
    foreignKeyName: string,
    foreignKeyColumnNames: string[],
    referencedTableName: string,
    referencedColumnNames: string[]
  ): string

  abstract buildAllSequences(
    jsonApplications: JsonApplication[],
    context: IContext,
  ): Promise<ISequence[]>

  abstract stageSequences(
    jsonApplications: JsonApplication[],
    context: IContext,
  ): ISequence[]

  abstract getColumnSuffix(
    jsonApplication: JsonApplication,
    jsonEntity: JsonApplicationEntity,
    column: JsonApplicationColumn,
  ): string

  abstract getCreateTableSuffix(
    jsonApplication: JsonApplication,
    jsonEntity: JsonApplicationEntity,
  ): string

  protected isPrimaryKeyColumn(
    jsonEntity: JsonApplicationEntity,
    jsonColumn: JsonApplicationColumn,
  ): boolean {
    return jsonColumn.propertyRefs.some((
      propertyRef: PropertyReference,
    ) => {
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

  protected getPrimaryKeyStatement(
    columnNames: string[],
  ): string {
    return `,
			PRIMARY KEY (
			${columnNames.join(',\n')}
			)`;
  }

}
