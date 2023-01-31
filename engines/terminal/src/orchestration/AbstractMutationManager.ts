import {
  AbstractQuery,
  IFieldUtils,
  InsertValues,
  IQEntity,
  IQEntityInternal,
  IQueryUtils,
  RawInsertValues,
  IRelationManager,
} from '@airport/tarmaq-query';
import {
  Inject,
  Injected
} from '@airport/direction-indicator'
import { IContext } from '@airport/direction-indicator';
import { DbColumn, IApplicationUtils, JsonQuery, PortableQuery, QueryResultType } from '@airport/ground-control';
import { ITransaction } from '@airport/terminal-map';

interface IColumnValueLookup {
  name: string
  nested: IColumnValueLookup
}
@Injected()
export class AbstractMutationManager {

  @Inject()
  applicationUtils: IApplicationUtils

  @Inject()
  fieldUtils: IFieldUtils

  @Inject()
  queryUtils: IQueryUtils

  @Inject()
  relationManager: IRelationManager

  protected getPortableQuery(
    applicationIndex: number,
    tableIndex: number,
    query: AbstractQuery,
    queryResultType: QueryResultType
  ): PortableQuery {
    return {
      applicationIndex,
      tableIndex,
      jsonQuery: <JsonQuery>query.toJSON(
        this.queryUtils, this.fieldUtils, this.relationManager),
      parameterMap: query.getParameters(),
      queryResultType,
      trackedRepoGUIDs: Array.from(query.trackedRepoGUIDSet),
      trackedRepoLocalIds: Array.from(query.trackedRepoLocalIdSet)
    };
  }

  protected async doInsertValues(
    transaction: ITransaction,
    q: IQEntity,
    entities: any[],
    context: IContext,
  ): Promise<number> {
    const dbEntity = (q as IQEntityInternal).__driver__.dbEntity;
    const columnIndexes: number[] = [];
    const columnValueLookups: IColumnValueLookup[] = [];
    for (const dbProperty of dbEntity.properties) {
      let columnValueLookup = {
        name: dbProperty.name,
        nested: null,
      };
      if (dbProperty.relation && dbProperty.relation.length) {
        const dbRelation = dbProperty.relation[0];
        this.applicationUtils.forEachColumnTypeOfRelation(dbRelation, (
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
    const VALUES = entities.map(
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
      INSERT_INTO: q,
      columns: null,
      VALUES
    };
    let insertValues: InsertValues<any> = new InsertValues(rawInsertValues, columnIndexes);
    let portableQuery: PortableQuery = this.getPortableQuery(
      dbEntity.applicationVersion.application.index, dbEntity.index,
      insertValues, null);

    return await transaction.insertValues(portableQuery, context);
  }

}
