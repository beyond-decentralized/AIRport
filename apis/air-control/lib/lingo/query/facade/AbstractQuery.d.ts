import { JsonStatement } from '@airport/ground-control';
import { IFieldUtils, IQueryUtils } from '../../..';
import { Parameter } from '../../core/entity/Aliases';
export interface IAbstractQuery {
    getParameters(): {
        [alias: string]: Parameter;
    };
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JsonStatement;
}
