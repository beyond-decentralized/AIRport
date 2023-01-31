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
 * Non-Entity 'searchOne' (searchOne many) API.
 */
export interface INonEntitySearch
	extends ILookup {

	/**
	 * Returns an Observable for a list of non-interlinked arbitrary object tree.
	 */
	tree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> },
		ctx?: IContext
	): Observable<ITE[]>;

	/**
	 * Returns an Observable for a list of flat sheets/tables of values.
	 */
	sheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		ctx?: IContext
	): Observable<any[][]>;

	/**
	 * Returns an Observable for a list of a single value.
	 */
	field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> },
		ctx?: IContext
	): Observable<any[]>;

}
