import { JsonTreeQuery } from '@airport/ground-control';
import { IEntityAliases } from '../../../lingo/core/entity/Aliases';
import { IQuery } from '../../../lingo/query/facade/Query';
import { ITreeEntity, RawTreeQuery } from '../../../lingo/query/facade/TreeQuery';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { IRelationManager } from '../../core/entity/RelationManager';
import { MappableQuery } from './MappableQuery';
export declare class TreeQuery<ITE extends ITreeEntity> extends MappableQuery implements IQuery {
    rawQuery: RawTreeQuery<ITE>;
    constructor(rawQuery: RawTreeQuery<ITE>, entityAliases?: IEntityAliases);
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonTreeQuery;
}
//# sourceMappingURL=TreeQuery.d.ts.map