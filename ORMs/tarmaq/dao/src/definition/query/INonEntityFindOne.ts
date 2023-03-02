import { IContext } from '@airport/direction-indicator'
import { IQOrderableField, ITreeEntity, RawOneTimeFieldQuery, RawOneTimeSheetQuery, RawOneTimeTreeQuery } from '@airport/tarmaq-query';
import { ILookup } from './ILookup'

/**
 * Non-Entity 'findOne' API.
 */
export interface INonEntityFindOne
	extends ILookup {

	/**
	 * Returns a Promise for a non-interlinked arbitrary object tree.
	 */
	tree<ITE extends ITreeEntity>(
		rawTreeQuery: RawOneTimeTreeQuery<ITE>
			| { (...args: any[]): RawOneTimeTreeQuery<any> },
		context?: IContext
	): Promise<ITE>;

	/**
	 * Returns a Promise for a flat sheet/table of RawInsertValues.
	 */
	sheet(
		rawSheetQuery: RawOneTimeSheetQuery
			| { (...args: any[]): RawOneTimeSheetQuery },
		context?: IContext
	): Promise<any[]>;

	/**
	 * Returns a Promise for a single value.
	 */
	field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawOneTimeFieldQuery<IQF>
			| { (...args: any[]): RawOneTimeFieldQuery<any> },
		context?: IContext
	): Promise<any>;

}
