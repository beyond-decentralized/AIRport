import {IQEntity}        from '../../core/entity/IQEntity';
import {IQOperableField} from "../../core/field/IQOperableField";

export interface AbstractRawInsertValues<IQE extends IQEntity> {
	INSERT_INTO: IQE;
	VALUES: any[][];
}

/**
 * INSERT statements are defined in this format.
 */
export interface RawInsertValues<IQE extends IQEntity>
	extends AbstractRawInsertValues<IQE> {
	columns: IQOperableField<any, any, any, any>[],
}

export interface RawInsertColumnValues<IQE extends IQEntity>
	extends AbstractRawInsertValues<IQE> {
	columns: string[];
}
