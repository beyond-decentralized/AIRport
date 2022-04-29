import { JsonStatement } from '@airport/ground-control';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { IRelationManager } from '../../../impl/core/entity/RelationManager';
import { Parameter } from '../../core/entity/Aliases';
export interface IAbstractQuery {
    getParameters(): {
        [alias: string]: Parameter;
    };
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonStatement;
}
//# sourceMappingURL=AbstractQuery.d.ts.map