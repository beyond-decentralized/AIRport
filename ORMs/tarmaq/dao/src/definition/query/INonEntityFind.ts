import { IContext } from '@airport/direction-indicator'
import { IQOrderableField, ITreeEntity, RawOneTimeFieldQuery, RawOneTimeSheetQuery, RawOneTimeTreeQuery } from '@airport/tarmaq-query';
import { ILookup } from './ILookup'

/**
 * Non-Entity 'find' (find many) API.
 */
export interface INonEntityFind
	extends ILookup {

	/**
	 * Returns a Promise for a list of non-interlinked arbitrary object tree.
	 */
	tree<ITE extends ITreeEntity>(
		rawTreeQuery: RawOneTimeTreeQuery<ITE>
			| { (...args: any[]): RawOneTimeTreeQuery<any> },
		context?: IContext
	): Promise<ITE[]>;

	/**
	 * Returns a Promise for a list of flat sheets/tables of values.
	 */
	sheet(
		rawSheetQuery: RawOneTimeSheetQuery
			| { (...args: any[]): RawOneTimeSheetQuery },
		cursorSize?: number | ((
			data: any[]
		) => void),
		callback?: (
			data: any[][]
		) => void,
		context?: IContext
	): Promise<any[][]>;

	/**
	 * Returns a Promise for a list of a single value.
	 */
	field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawOneTimeFieldQuery<IQF>
			| { (...args: any[]): RawOneTimeFieldQuery<any> },
		context?: IContext
	): Promise<any[]>;

}
