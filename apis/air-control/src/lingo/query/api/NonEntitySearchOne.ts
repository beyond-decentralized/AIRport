import {IContext}         from '@airport/di'
import {IObservable}      from '@airport/observe'
import {IQOrderableField} from '../../core/field/Field'
import {RawFieldQuery}    from '../facade/FieldQuery'
import {RawSheetQuery}    from '../facade/SheetQuery'
import {
	ITreeEntity,
	RawTreeQuery
}                         from '../facade/TreeQuery'
import {ILookup}          from './Lookup'

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
		ctx?: IContext
	): IObservable<ITE>;

	/**
	 * Returns an Observable for a flat sheet/table of RawInsertValues.
	 */
	sheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		ctx?: IContext
	): IObservable<any[]>;

	/**
	 * Returns an Observable for a single value.
	 */
	field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> },
		ctx?: IContext
	): IObservable<any>;

}
