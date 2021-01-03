import {IQEntity}        from '../../core/entity/Entity';
import {IQOperableField} from "../../core/field/OperableField";

export interface AbstractRawInsertValues<IQE extends IQEntity<any>> {
	insertInto: IQE;
	values: any[][];
}

/**
 * INSERT statements are user-defined in this format.
 */
export interface RawInsertValues<IQE extends IQEntity<any>>
	extends AbstractRawInsertValues<IQE> {
	columns: IQOperableField<any, any, any, any>[],
}

export interface RawInsertColumnValues<IQE extends IQEntity<any>>
	extends AbstractRawInsertValues<IQE> {
	columns: string[];
}
