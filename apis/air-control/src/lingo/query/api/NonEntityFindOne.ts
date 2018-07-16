import { IQOrderableField } from '../../core/field/Field';
import { RawFieldQuery } from '../facade/FieldQuery';
import { RawSheetQuery } from '../facade/SheetQuery';
import { ITreeEntity, RawTreeQuery } from '../facade/TreeQuery';

/**
 * Non-Entity 'findOne' API.
 */
export interface INonEntityFindOne {

	/**
	 * Returns a Promise for a non-interlinked arbitrary object tree.
	 */
	tree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { ( ...args: any[] ): RawTreeQuery<any> }
	): Promise<ITE>;

	/**
	 * Returns a Promise for a flat sheet/table of RawInsertValues.
	 */
	sheet(
		rawSheetQuery: RawSheetQuery | { ( ...args: any[] ): RawSheetQuery }
	): Promise<any[]>;

	/**
	 * Returns a Promise for a single value.
	 */
	field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { ( ...args: any[] ): RawFieldQuery<any> }
	): Promise<any>;

}