import {QueryBaseOperation} from "@airport/ground-control";
import {
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
}                          from '../../core/entity/IQEntity';

// FIXME: add support for a full blown UPDATE, with expression support for SET

export interface AbstractRawUpdate<IQE extends IQEntity> {
	UPDATE: IQE;
	SET: any;
	WHERE?: QueryBaseOperation;
}

/**
 * UPDATE statement format.
 */
export interface RawUpdate<IEUP extends IEntityUpdateProperties, IQE extends IQEntity>
	extends AbstractRawUpdate<IQE> {
	SET: IEUP;
}

export interface RawUpdateColumns<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>
	extends AbstractRawUpdate<IQE> {
	SET: IEUC;
}
