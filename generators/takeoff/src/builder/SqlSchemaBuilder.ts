import { IAirportDatabase, JsonApplicationWithLastIds } from '@airport/air-traffic-control';
import {
  IContext,
  IOC,
  Inject,
  Injected
} from '@airport/direction-indicator'
import { ISequenceDao, SequenceDao } from '@airport/airport-code';
import {
  IApplication,
  DbSequence,
  EntityRelationType,
  IApplicationReferenceUtils,
  IApplicationNameUtils,
  JsonApplication,
  JsonColumn,
  JsonEntity,
  JsonRelation,
  JsonApplicationVersion,
  PropertyReference,
  QueryType,
} from '@airport/ground-control';
import {
  IStoreDriver
} from '@airport/terminal-map'
import { ISchemaBuilder } from './ISchemaBuilder';

@Injected()
export abstract class SqlSchemaBuilder
  implements ISchemaBuilder {

  @Inject()
  airportDatabase: IAirportDatabase

  @Inject()
  applicationReferenceUtils: IApplicationReferenceUtils

  @Inject()
  applicationNameUtils: IApplicationNameUtils

  @Inject()
  storeDriver: IStoreDriver

  // Avoids race-condition errors when SequenceDao is retrieved at initialization
  async getSequenceDao(): Promise<ISequenceDao> {
    return await IOC.get(SequenceDao)
  }

  async build(
    jsonApplication: JsonApplication,
    existingApplicationMap: Map<string, IApplication>,
    newJsonApplicationMap: Map<string, JsonApplicationWithLastIds>,
    isFeatureApp: boolean,
    context: IContext,
  ): Promise<void> {
    await this.createApplication(jsonApplication, context);

    const jsonApplicationVersion = this.applicationReferenceUtils
      .getCurrentJsonApplicationVersion(jsonApplication)

    for (const jsonEntity of jsonApplicationVersion.entities) {
      await this.buildTable(jsonApplication, jsonApplicationVersion,
        jsonEntity, existingApplicationMap, context);
    }

    const relatedJsonApplicationMap: Map<string, JsonApplication> = new Map()

    for (const jsonEntity of jsonApplicationVersion.entities) {
      await this.buildForeignKeys(jsonApplication, jsonApplicationVersion,
        jsonEntity, existingApplicationMap,
        newJsonApplicationMap, relatedJsonApplicationMap, context);
    }

    this.applicationReferenceUtils.checkFrameworkReferences(
      jsonApplication,
      (
        jsonApplication: JsonApplication,
        jsonApplicationVersion: JsonApplicationVersion,
        queryRelation: JsonRelation
      ) => {
        return this.getRelationInfo(jsonApplication, jsonApplicationVersion,
          queryRelation, existingApplicationMap, newJsonApplicationMap,
          relatedJsonApplicationMap)
      }
    )

  }

  abstract createApplication(
    jsonApplication: JsonApplication,
    context: IContext,
  ): Promise<void>;

  async buildTable(
    jsonApplication: JsonApplication,
    jsonApplicationVersion: JsonApplicationVersion,
    jsonEntity: JsonEntity,
    existingApplicationMap: Map<string, IApplication>,
    context: IContext,
  ): Promise<void> {
    const primaryKeyColumnNames: string[] = [];
    const tableColumnsDdl: string[] = jsonEntity.columns.map((
      jsonColumn: JsonColumn,
    ) => {
      let columnDdl = `${jsonColumn.name} ${this.getColumnSuffix(jsonApplication, jsonEntity, jsonColumn)}`;

      if (this.isPrimaryKeyColumn(jsonEntity, jsonColumn)) {
        primaryKeyColumnNames.push(jsonColumn.name);
      }

      return columnDdl;
    });

    const createTableSuffix = this.getCreateTableSuffix(jsonApplication, jsonEntity);

    const tableName = this.storeDriver.getTableName(jsonApplication,
      jsonApplicationVersion.integerVersion, jsonEntity, context);

    let primaryKeySubStatement = ``;
    if (primaryKeyColumnNames.length) {
      primaryKeySubStatement = this.getPrimaryKeyStatement(primaryKeyColumnNames);
    }

    const createTableDdl = `CREATE TABLE ${tableName} (
		${tableColumnsDdl.join(',\n')}${primaryKeySubStatement}
		)${createTableSuffix}`;

    await this.storeDriver.query(QueryType.DDL, createTableDdl, [], context, false);

    let indexNumber = 0
    if (jsonEntity.tableConfig.columnIndexes) {
      for (const indexConfig of jsonEntity.tableConfig.columnIndexes) {
        const createIndexDdl = this.getIndexSql('idx_' + tableName + '_' + (++indexNumber),
          tableName, indexConfig.columnList, indexConfig.unique);

        await this.storeDriver.query(QueryType.DDL, createIndexDdl, [], context, false);
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

        await this.storeDriver.query(QueryType.DDL, createIndexDdl, [], context, false);
      }
    }
    //
  }

  private getRelationInfo(
    jsonApplication: JsonApplication,
    jsonApplicationVersion: JsonApplicationVersion,
    queryRelation: JsonRelation,
    existingApplicationMap: Map<string, IApplication>,
    newJsonApplicationMap: Map<string, JsonApplicationWithLastIds>,
    relatedJsonApplicationMap: Map<string, JsonApplication>
  ): {
    relatedJsonApplication: JsonApplication,
    relatedJsonEntity: JsonEntity
  } {
    let relatedJsonApplication: JsonApplication
    let relatedJsonEntity: JsonEntity
    if (queryRelation.relationTableApplication_Index
      || queryRelation.relationTableApplication_Index === 0) {
      const referencedApplication = jsonApplicationVersion
        .referencedApplications[queryRelation.relationTableApplication_Index]
      let relatedApplication_FullName = this.applicationNameUtils
        .getApplication_FullNameFromDomainAndName(
          referencedApplication.domain, referencedApplication.name
        )
      relatedJsonApplication = relatedJsonApplicationMap.get(relatedApplication_FullName)
      if (!relatedJsonApplication) {
        const relatedApplication = existingApplicationMap.get(relatedApplication_FullName)
        if (relatedApplication) {
          // FIXME: this should be looked up though currentVersion - make sure it's populated
          // relatedJsonApplication = relatedApplication.currentVersion[0].applicationVersion.jsonApplication
          relatedJsonApplication = relatedApplication.versions[0].jsonApplication
        } else {
          relatedJsonApplication = newJsonApplicationMap.get(relatedApplication_FullName)
        }
        if (!relatedJsonApplication) {
          throw new Error(`Could not find related application ${relatedApplication_FullName}
          in either existing applications or newly installing applications.`)
        }
        relatedJsonApplicationMap.set(relatedApplication_FullName, relatedJsonApplication)
      }
      const relatedApplicationVersion: JsonApplicationVersion = relatedJsonApplication
        .versions[relatedJsonApplication.versions.length - 1]
      relatedJsonEntity = relatedApplicationVersion.entities[queryRelation.relationTableIndex]
    } else {
      relatedJsonApplication = jsonApplication
      relatedJsonEntity = jsonApplicationVersion.entities[queryRelation.relationTableIndex]
    }

    return {
      relatedJsonApplication,
      relatedJsonEntity
    }
  }

  private getApplicationVersion(
    jsonApplication: JsonApplication
  ): JsonApplicationVersion {
    return jsonApplication.versions[jsonApplication.versions.length - 1]
  }

  async buildForeignKeys(
    jsonApplication: JsonApplication,
    jsonApplicationVersion: JsonApplicationVersion,
    jsonEntity: JsonEntity,
    existingApplicationMap: Map<string, IApplication>,
    newJsonApplicationMap: Map<string, JsonApplicationWithLastIds>,
    relatedJsonApplicationMap: Map<string, JsonApplication>,
    context: IContext,
  ): Promise<void> {
    if (!jsonEntity.relations || !jsonEntity.relations.length) {
      return
    }

    const applicationVersion = this.getApplicationVersion(jsonApplication);
    const tableName = this.storeDriver.getTableName(
      jsonApplication, jsonApplicationVersion.integerVersion, jsonEntity, context);

    for (const queryRelation of jsonEntity.relations) {
      if (queryRelation.relationType !== EntityRelationType.MANY_TO_ONE) {
        continue
      }

      const {
        relatedJsonApplication, relatedJsonEntity
      } = this.getRelationInfo(jsonApplication, applicationVersion,
        queryRelation, existingApplicationMap,
        newJsonApplicationMap, relatedJsonApplicationMap)

      let foreignKeyColumnNames = []
      for (const jsonColumn of jsonEntity.columns) {
        for (const propertyRef of jsonColumn.propertyRefs) {
          if (propertyRef.index === queryRelation.propertyRef.index) {
            foreignKeyColumnNames.push(jsonColumn.name)
            break
          }
        }
      }

      const referencedTableName = this.storeDriver
        .getTableName(relatedJsonApplication, applicationVersion.integerVersion, relatedJsonEntity, context);
      let referencedColumnNames = []
      for (const relatedIdColumnRef of relatedJsonEntity.idColumnRefs) {
        referencedColumnNames.push(relatedJsonEntity.columns[relatedIdColumnRef.index].name)
      }
      const foreignKeySql = this.getForeignKeySql(tableName, 'fk_' + tableName + '_foreignKeyNumber',
        foreignKeyColumnNames, referencedTableName, referencedColumnNames)

      if (foreignKeySql) {
        await this.storeDriver.query(
          QueryType.DDL, foreignKeySql, [], context, false);
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
  ): Promise<DbSequence[]>

  abstract stageSequences(
    jsonApplications: JsonApplication[],
    context: IContext,
  ): DbSequence[]

  abstract getColumnSuffix(
    jsonApplication: JsonApplication,
    jsonEntity: JsonEntity,
    column: JsonColumn,
  ): string

  abstract getCreateTableSuffix(
    jsonApplication: JsonApplication,
    jsonEntity: JsonEntity,
  ): string

  protected isPrimaryKeyColumn(
    jsonEntity: JsonEntity,
    jsonColumn: JsonColumn,
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
    jsonEntity: JsonEntity,
    jsonColumn: JsonColumn
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
