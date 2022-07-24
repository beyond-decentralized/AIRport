import { JSONBaseOperation } from "@airport/ground-control";
import { IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '../../core/entity/Entity';
export interface AbstractRawUpdate<IQE extends IQEntity> {
    UPDATE: IQE;
    SET: any;
    WHERE?: JSONBaseOperation;
}
/**
 * UPDATE statement format.
 */
export interface RawUpdate<IEUP extends IEntityUpdateProperties, IQE extends IQEntity> extends AbstractRawUpdate<IQE> {
    SET: IEUP;
}
export interface RawUpdateColumns<IEUC extends IEntityUpdateColumns, IQE extends IQEntity> extends AbstractRawUpdate<IQE> {
    SET: IEUC;
}
//# sourceMappingURL=Update.d.ts.map