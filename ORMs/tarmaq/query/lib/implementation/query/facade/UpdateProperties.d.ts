import { JsonEntityUpdateColumns, JsonUpdate } from '@airport/ground-control';
import { IEntityUpdateProperties, IQEntity } from '../../../definition/core/entity/Entity';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { RawUpdate } from '../../../definition/query/facade/Update';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
import { AbstractUpdate } from './AbstractUpdate';
/**
 * Created by Papa on 10/2/2016.
 */
export declare class UpdateProperties<IEUP extends IEntityUpdateProperties, IQE extends IQEntity> extends AbstractUpdate<IQE, RawUpdate<IEUP, IQE>> {
    constructor(rawUpdate: RawUpdate<IEUP, IQE>);
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonUpdate<JsonEntityUpdateColumns>;
    protected setToJSON(rawSet: IEUP, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonEntityUpdateColumns;
    private setEntityFragmentsToJSON;
    private setFragmentToJSON;
    private getPropertyChainDesription;
}
//# sourceMappingURL=UpdateProperties.d.ts.map