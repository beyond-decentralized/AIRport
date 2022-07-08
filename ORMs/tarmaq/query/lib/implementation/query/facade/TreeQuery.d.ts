import { JsonTreeQuery } from '@airport/ground-control';
import { IEntityAliases } from '../../../definition/core/entity/Aliases';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { IQuery } from '../../../definition/query/facade/Query';
import { ITreeEntity, RawTreeQuery } from '../../../definition/query/facade/TreeQuery';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
import { MappableQuery } from './MappableQuery';
export declare class TreeQuery<ITE extends ITreeEntity> extends MappableQuery implements IQuery {
    rawQuery: RawTreeQuery<ITE>;
    constructor(rawQuery: RawTreeQuery<ITE>, entityAliases?: IEntityAliases);
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonTreeQuery;
}
//# sourceMappingURL=TreeQuery.d.ts.map