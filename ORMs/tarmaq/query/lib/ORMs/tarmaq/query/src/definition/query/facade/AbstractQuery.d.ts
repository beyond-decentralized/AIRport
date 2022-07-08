import { JsonStatement } from '@airport/ground-control';
import { Parameter } from '../../core/entity/Aliases';
import { IRelationManager } from '../../core/entity/IRelationManager';
import { IFieldUtils } from '../../utils/IFieldUtils';
import { IQueryUtils } from '../../utils/IQueryUtils';
export interface IAbstractQuery {
    getParameters(): {
        [alias: string]: Parameter;
    };
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonStatement;
}
//# sourceMappingURL=AbstractQuery.d.ts.map