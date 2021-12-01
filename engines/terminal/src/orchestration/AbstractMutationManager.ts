import {
  AbstractQuery,
  FIELD_UTILS,
  IFieldUtils,
  InsertValues,
  IQEntity,
  IQEntityInternal,
  IQueryUtils,
  QUERY_UTILS,
  RawInsertValues,
  SCHEMA_UTILS,
} from '@airport/air-control';
import { container, IContext } from '@airport/di';
import { DbColumn, JsonQuery, PortableQuery, QueryResultType } from '@airport/ground-control';
import { ITransaction } from '@airport/terminal-map';

interface IColumnValueLookup {
  name: string
  nested: IColumnValueLookup
}
export class AbstractMutationManager {

  protected getPortableQuery(
    applicationIndex: number,
    tableIndex: number,
    query: AbstractQuery,
    queryResultType: QueryResultType,
    queryUtils: IQueryUtils,
    fieldUtils: IFieldUtils,
  ): PortableQuery {
    return {
      applicationIndex,
      tableIndex,
      jsonQuery: <JsonQuery>query.toJSON(queryUtils, fieldUtils),
      parameterMap: query.getParameters(),
      queryResultType,
    };
  }

  protected async doInsertValues<IQE extends IQEntity<any>>(
    transaction: ITransaction,
    q: IQEntity<any>,
    entities: any[],
    context: IContext,
  ): Promise<number> {
    const [fieldUtils, queryUtils, applicationUtils,
    ] = await container(this).get(
      FIELD_UTILS, QUERY_UTILS, SCHEMA_UTILS);

    const dbEntity = (q as IQEntityInternal<any>).__driver__.dbEntity;
    const columnIndexes: number[] = [];
    const columnValueLookups: IColumnValueLookup[] = [];
    for (const dbProperty of dbEntity.properties) {
      let columnValueLookup = {
        name: dbProperty.name,
        nested: null,
      };
      if (dbProperty.relation && dbProperty.relation.length) {
        const dbRelation = dbProperty.relation[0];
        applicationUtils.forEachColumnTypeOfRelation(dbRelation, (
          dbColumn: DbColumn,
          propertyNameChains: string[][],
        ) => {
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
      } else {
        const dbColumn = dbProperty.propertyColumns[0].column;
        if (columnIndexes[dbColumn.index]) {
          continue;
        }
        columnIndexes[dbColumn.index] = dbColumn.index;
        columnValueLookups[dbColumn.index] = columnValueLookup;
      }
    }
    const values = entities.map(
      entity => {
        return columnValueLookups.map(
          lookup => {
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
    const rawInsertValues: RawInsertValues<any> = {
      insertInto: q,
      columns: null,
      values,
    };
    let insertValues: InsertValues<any> = new InsertValues(rawInsertValues, columnIndexes);
    let portableQuery: PortableQuery = this.getPortableQuery(
      dbEntity.applicationVersion.application.index, dbEntity.index,
      insertValues, null, queryUtils, fieldUtils);

    return await transaction.insertValues(portableQuery, context);
  }

}
