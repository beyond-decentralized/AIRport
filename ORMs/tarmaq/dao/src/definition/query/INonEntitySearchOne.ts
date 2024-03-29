import { IContext } from '@airport/direction-indicator'
import {
	IQOrderableField,
	ITreeEntity,
	RawFieldQuery,
	RawSheetQuery,
	RawTreeQuery
} from '@airport/tarmaq-query';
import { Observable } from 'rxjs'
import { ILookup } from './ILookup'

/**
 * Non-Entity 'searchOne' API.
 */
export interface INonEntitySearchOne
	extends ILookup {

	/**
	 * Returns an Observable for a non-interlinked arbitrary object tree.
	 */
	tree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> },
		context?: IContext
	): Observable<ITE>;

	/**
	 * Returns an Observable for a flat sheet/table of RawInsertValues.
	 */
	sheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		context?: IContext
	): Observable<any[]>;

	/**
	 * Returns an Observable for a single value.
	 */
	field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> },
		context?: IContext
	): Observable<any>;

}
