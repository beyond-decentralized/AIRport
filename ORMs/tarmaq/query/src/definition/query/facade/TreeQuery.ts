import { IQDistinctFunction } from '../../core/field/Functions';
import { RawNonEntityQuery } from './NonEntityQuery';

/**
 * Marker interface for entities in the SELECT clause of a RawTreeQuery,
 * as returned by a tree or join functions.
 */
export interface ITreeEntity {
	[fieldName: string]: any;
}

/**
 * Non-Entity Tree query format.
 */
export interface RawTreeQuery<ITC extends ITreeEntity> extends RawNonEntityQuery {
	SELECT: ITC | IQDistinctFunction<ITC>;
}