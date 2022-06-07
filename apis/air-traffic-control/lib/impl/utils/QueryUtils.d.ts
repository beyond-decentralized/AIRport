import { IRepositoryEntityUtils, RepositoryEntityId } from '@airport/aviation-communication';
import { IRepositoryEntity, JSONBaseOperation } from '@airport/ground-control';
import { IFieldColumnAliases } from '../../lingo/core/entity/Aliases';
import { IQEntityInternal, IQRepositoryEntity } from '../../lingo/core/entity/Entity';
import { IQRepositoryEntityRelation } from '../../lingo/core/entity/Relation';
import { JSONLogicalOperation } from '../../lingo/core/operation/LogicalOperation';
import { IFieldUtils } from '../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../lingo/utils/QueryUtils';
import { IRelationManager } from '../core/entity/RelationManager';
export declare class QueryUtils implements IQueryUtils {
    fieldUtils: IFieldUtils;
    relationManager: IRelationManager;
    repositoryEntityUtils: IRepositoryEntityUtils;
    equals<Entity extends IRepositoryEntity, IQ extends IQEntityInternal>(entityOrUuId: Entity | IQRepositoryEntity | IQRepositoryEntityRelation<Entity, IQ> | RepositoryEntityId | string, toObject: any): JSONLogicalOperation;
    whereClauseToJSON(whereClause: JSONBaseOperation, columnAliases: IFieldColumnAliases<any>): JSONBaseOperation;
    private convertLRValue;
}
//# sourceMappingURL=QueryUtils.d.ts.map