import { IObservable } from "@airport/observe";
import { IQOrderableField } from '../../core/field/Field';
import { RawFieldQuery } from '../facade/FieldQuery';
import { RawSheetQuery } from '../facade/SheetQuery';
import { ITreeEntity, RawTreeQuery } from '../facade/TreeQuery';
/**
 * Non-Entity 'search' (search many) API.
 */
export interface INonEntitySearch {
    /**
     * Returns an Observable for a list of non-interlinked arbitrary object tree.
     */
    tree<ITE extends ITreeEntity>(rawTreeQuery: RawTreeQuery<ITE> | {
        (...args: any[]): RawTreeQuery<any>;
    }): IObservable<ITE[]>;
    /**
     * Returns an Observable for a list of flat sheets/tables of values.
     */
    sheet(rawSheetQuery: RawSheetQuery | {
        (...args: any[]): RawSheetQuery;
    }): IObservable<any[][]>;
    /**
     * Returns an Observable for a list of a single value.
     */
    field<IQF extends IQOrderableField<IQF>>(rawFieldQuery: RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<any>;
    }): IObservable<any[]>;
}
