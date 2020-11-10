import { IContext } from '@airport/di';
import { DbEntity, ITransactionalConnector } from '@airport/ground-control';
import { IEntityUtils } from '../../utils/EntityUtils';
import { IFieldUtils } from '../../utils/FieldUtils';
import { IQueryUtils } from '../../utils/QueryUtils';
import { ISchemaUtils } from '../../utils/SchemaUtils';
import { IQueryFacade } from '../repository/DatabaseFacade';
import { IUpdateCache } from './UpdateCache';
export interface IEntityContext extends IContext {
    dbEntity: DbEntity;
}
export interface IEntityOperationContext extends IEntityContext {
    entityUtils: IEntityUtils;
    fieldUtils: IFieldUtils;
    queryFacade: IQueryFacade;
    queryUtils: IQueryUtils;
    schemaUtils: ISchemaUtils;
    transConnector: ITransactionalConnector;
    updateCache: IUpdateCache;
}
//# sourceMappingURL=EntityContext.d.ts.map