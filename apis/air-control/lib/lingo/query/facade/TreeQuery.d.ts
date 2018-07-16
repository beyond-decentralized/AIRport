import { IQDistinctFunction } from '../../core/field/Functions';
import { RawNonEntityQuery } from './NonEntityQuery';
/**
 * Marker interface for entities in the select clause of a RawTreeQuery,
 * as returned by a tree or join functions.
 */
export interface ITreeEntity {
    [fieldName: string]: any;
}
/**
 * Non-Entity Tree queries are user-defined in this format.
 */
export interface RawTreeQuery<ITC extends ITreeEntity> extends RawNonEntityQuery {
    select: ITC | IQDistinctFunction<ITC>;
}
