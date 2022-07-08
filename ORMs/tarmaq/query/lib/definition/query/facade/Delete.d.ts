import { JSONBaseOperation } from "@airport/ground-control";
import { IQEntity } from '../../core/entity/Entity';
/**
 * DELETE statements are defined in this format.
 */
export interface RawDelete<IQE extends IQEntity> {
    deleteFrom: IQE;
    where?: JSONBaseOperation;
}
//# sourceMappingURL=Delete.d.ts.map