import {JSONBaseOperation} from "@airport/ground-control";
import {
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
}                          from '../../core/entity/Entity';

// FIXME: add support for a full blown UPDATE, with expression support for SET

export interface AbstractRawUpdate<IQE extends IQEntity> {
	update: IQE;
	set: any;
	where?: JSONBaseOperation;
}

/**
 * UPDATE statements are user-defined in this format.
 */
export interface RawUpdate<IEUP extends IEntityUpdateProperties, IQE extends IQEntity>
	extends AbstractRawUpdate<IQE> {
	set: IEUP;
}

export interface RawUpdateColumns<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>
	extends AbstractRawUpdate<IQE> {
	set: IEUC;
}
