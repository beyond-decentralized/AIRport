import { IContext } from '@airport/direction-indicator';
import { IQOrderableField, ITreeEntity, RawFieldQuery, RawSheetQuery, RawTreeQuery } from '@airport/tarmaq-query';
import { ILookup } from './Lookup';
/**
 * Non-Entity 'find' (find many) API.
 */
export interface INonEntityFind extends ILookup {
    /**
     * Returns a Promise for a list of non-interlinked arbitrary object tree.
     */
    tree<ITE extends ITreeEntity>(rawTreeQuery: RawTreeQuery<ITE> | {
        (...args: any[]): RawTreeQuery<any>;
    }, ctx?: IContext): Promise<ITE[]>;
    /**
     * Returns a Promise for a list of flat sheets/tables of values.
     */
    sheet(rawSheetQuery: RawSheetQuery | {
        (...args: any[]): RawSheetQuery;
    }, cursorSize?: number | ((data: any[]) => void), callback?: (data: any[][]) => void, ctx?: IContext): Promise<any[][]>;
    /**
     * Returns a Promise for a list of a single value.
     */
    field<IQF extends IQOrderableField<IQF>>(rawFieldQuery: RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<any>;
    }, ctx?: IContext): Promise<any[]>;
}
//# sourceMappingURL=NonEntityFind.d.ts.map