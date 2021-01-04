import { IAirportDatabase } from '@airport/air-control';
import { ISequence } from '@airport/airport-code';
import { container, IContext } from '@airport/di';
import {
  IStoreDriver,
  JsonSchema,
  JsonSchemaColumn,
  JsonSchemaEntity,
  PropertyReference,
  QueryType,
  STORE_DRIVER,
} from '@airport/ground-control';
import { ISchemaBuilder } from './ISchemaBuilder';

export abstract class SqlSchemaBuilder
  implements ISchemaBuilder {

  async build(
    jsonSchema: JsonSchema,
    context: IContext,
  ): Promise<void> {
    const storeDriver = await container(this).get(STORE_DRIVER);

    await this.createSchema(jsonSchema, storeDriver, context);


    for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
      await this.buildTable(jsonSchema, jsonEntity, storeDriver, context);
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

    for (const indexConfig of jsonEntity.tableConfig.indexes) {
      let uniquePrefix = '';
      if (indexConfig.unique) {
        uniquePrefix = ' UNIQUE';
      }

      const createIndexDdl = `CREATE${uniquePrefix} INDEX ${indexConfig.name}
			ON ${tableName} (
			${indexConfig.columnList.join(', ')}
			)`;

      await storeDriver.query(QueryType.DDL, createIndexDdl, [], context, false);
    }
    //
  }

  async abstract buildAllSequences(
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
