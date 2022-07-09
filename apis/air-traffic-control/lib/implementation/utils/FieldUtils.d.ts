import { JsonFieldQuery } from '@airport/ground-control';
import { FieldQuery, IEntityAliases, IFieldUtils, IQOrderableField, IQueryUtils, IRelationManager, RawFieldQuery } from '@airport/tarmaq-query';
export declare class FieldUtils implements IFieldUtils {
    relationManager: IRelationManager;
    FieldQuery: typeof FieldQuery;
    getFieldQueryJson<IQF extends IQOrderableField<IQF>>(fieldSubQuery: RawFieldQuery<IQF>, entityAliases: IEntityAliases, queryUtils: IQueryUtils): JsonFieldQuery;
}
//# sourceMappingURL=FieldUtils.d.ts.map