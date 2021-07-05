import {IContext}         from '@airport/di'
import {Observable}      from 'rxjs'
import {IQOrderableField} from '../../core/field/Field'
import {RawFieldQuery}    from '../facade/FieldQuery'
import {RawSheetQuery}    from '../facade/SheetQuery'
import {
	ITreeEntity,
	RawTreeQuery
}                         from '../facade/TreeQuery'
import {ILookup}          from './Lookup'

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
