import {IContext}         from '@airport/direction-indicator'
import { IQOrderableField, ITreeEntity, RawFieldQuery, RawSheetQuery, RawTreeQuery } from '@airport/tarmaq-query';
import {ILookup}          from './ILookup'

/**
 * Non-Entity 'findOne' API.
 */
export interface INonEntityFindOne
	extends ILookup {

	/**
	 * Returns a Promise for a non-interlinked arbitrary object tree.
	 */
	tree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> },
		ctx?: IContext
	): Promise<ITE>;

	/**
	 * Returns a Promise for a flat sheet/table of RawInsertValues.
	 */
	sheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		ctx?: IContext
	): Promise<any[]>;

	/**
	 * Returns a Promise for a single value.
	 */
	field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> },
		ctx?: IContext
	): Promise<any>;

}
