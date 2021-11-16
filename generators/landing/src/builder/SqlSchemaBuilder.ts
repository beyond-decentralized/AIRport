import { IAirportDatabase } from '@airport/air-control';
import { ISequence } from '@airport/airport-code';
import { container, IContext } from '@airport/di';
import {
  EntityRelationType,
  getSchemaNameFromDomainAndName,
  IStoreDriver,
  JsonSchema,
  JsonSchemaColumn,
  JsonSchemaEntity,
  JsonSchemaVersion,
  PropertyReference,
  QueryType,
  STORE_DRIVER,
} from '@airport/ground-control';
import { JsonSchemaWithLastIds } from '@airport/security-check';
import { ISchema } from '@airport/traffic-pattern';
import { ISchemaBuilder } from './ISchemaBuilder';

export abstract class SqlSchemaBuilder
  implements ISchemaBuilder {

  async build(
    jsonSchema: JsonSchema,
    existingSchemaMap: Map<string, ISchema>,
    newJsonSchemaMap: Map<string, JsonSchemaWithLastIds>,
    context: IContext,
  ): Promise<void> {
    const storeDriver = await container(this).get(STORE_DRIVER);

    await this.createSchema(jsonSchema, storeDriver, context);


    for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
      await this.buildTable(jsonSchema, jsonEntity, existingSchemaMap, storeDriver, context);
    }

    const relatedJsonSchemaMap: Map<string, JsonSchema> = new Map()

    for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
      await this.buildForeignKeys(jsonSchema, jsonEntity, existingSchemaMap,
        newJsonSchemaMap, relatedJsonSchemaMap, storeDriver, context);
    }

  }

  abstract createSchema(
    jsonSchema: JsonSchema,
    storeDriver: IStoreDriver,
    context: IContext,
  ): Promise<void>;

  async buildTable(
    jsonSchema: JsonSchema,
    jsonEntity: JsonSchemaEntity,
    existingSchemaMap: Map<string, ISchema>,
    storeDriver: IStoreDriver,
    context: IContext,
  ): Promise<void> {
    const primaryKeyColumnNames: string[] = [];
    const tableColumnsDdl: string[] = jsonEntity.columns.map((
      jsonColumn: JsonSchemaColumn,
    ) => {
      let columnDdl = `${jsonColumn.name} ${this.getColumnSuffix(jsonSchema, jsonEntity, jsonColumn)}`;

      if (this.isPrimaryKeyColumn(jsonEntity, jsonColumn)) {
        primaryKeyColumnNames.push(jsonColumn.name);
      }

      return columnDdl;
    });

    const createTableSuffix = this.getCreateTableSuffix(jsonSchema, jsonEntity);

    const tableName = storeDriver.getTableName(jsonSchema, jsonEntity, context);

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
    jsonSchema: JsonSchema,
    jsonEntity: JsonSchemaEntity,
    existingSchemaMap: Map<string, ISchema>,
    newJsonSchemaMap: Map<string, JsonSchemaWithLastIds>,
    relatedJsonSchemaMap: Map<string, JsonSchema>,
    storeDriver: IStoreDriver,
    context: IContext,
  ): Promise<void> {
    if (!jsonEntity.relations || !jsonEntity.relations.length) {
      return
    }

    const schemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
    const tableName = storeDriver.getTableName(jsonSchema, jsonEntity, context);

    let foreignKeyNumber = 0
    for (const jsonRelation of jsonEntity.relations) {
      if (jsonRelation.relationType !== EntityRelationType.MANY_TO_ONE) {
        continue
      }
      let relatedJsonSchema: JsonSchema
      let relatedJsonEntity: JsonSchemaEntity
      if (jsonRelation.relationTableSchemaIndex
        || jsonRelation.relationTableSchemaIndex === 0) {
        const referencedSchema = schemaVersion
          .referencedSchemas[jsonRelation.relationTableSchemaIndex]
        let relatedSchemaName = getSchemaNameFromDomainAndName(
          referencedSchema.domain, referencedSchema.name
        )
        relatedJsonSchema = relatedJsonSchemaMap.get(relatedSchemaName)
        if (!relatedJsonSchema) {
          const relatedSchema = existingSchemaMap.get(relatedSchemaName)
          if (relatedSchema) {
            relatedJsonSchema = relatedSchema.jsonSchema
          } else {
            relatedJsonSchema = newJsonSchemaMap.get(relatedSchemaName)
          }
          if (!relatedJsonSchema) {
            throw new Error(`Could not find related schema ${relatedSchemaName}
            in either existing schemas or newly installing schemas.`)
          }
          relatedJsonSchemaMap.set(relatedSchemaName, relatedJsonSchema)
        }
        const relatedSchemaVersion: JsonSchemaVersion = relatedJsonSchema
          .versions[relatedJsonSchema.versions.length - 1]
        relatedJsonEntity = relatedSchemaVersion.entities[jsonRelation.relationTableIndex]
      } else {
        relatedJsonSchema = jsonSchema
        relatedJsonEntity = schemaVersion.entities[jsonRelation.relationTableIndex]
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
        .getTableName(relatedJsonSchema, relatedJsonEntity, context);
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
    jsonSchemas: JsonSchema[],
    context: IContext,
  ): Promise<ISequence[]>

  abstract stageSequences(
    jsonSchemas: JsonSchema[],
    airDb: IAirportDatabase,
    context: IContext,
  ): ISequence[]

  abstract getColumnSuffix(
    jsonSchema: JsonSchema,
    jsonEntity: JsonSchemaEntity,
    column: JsonSchemaColumn,
  ): string

  abstract getCreateTableSuffix(
    jsonSchema: JsonSchema,
    jsonEntity: JsonSchemaEntity,
  ): string

  protected isPrimaryKeyColumn(
    jsonEntity: JsonSchemaEntity,
    jsonColumn: JsonSchemaColumn,
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
    jsonEntity: JsonSchemaEntity,
    jsonColumn: JsonSchemaColumn
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
