import {IContext}                from '@airport/direction-indicator'
import { IEntitySelectProperties, RawEntityQuery } from '@airport/tarmaq-query';
import {Observable}             from 'rxjs'
import {IEntityLookup}           from './IEntityLookup'

/**
 * Entity 'searchOne' API.
 */
export interface IEntitySearchOne<Entity, IESP extends IEntitySelectProperties>
	extends IEntityLookup {

	/**
	 * Returns an Observable of a fully interlinked entity graph.
	 */
	graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		ctx?: IContext
	): Observable<Entity>;

	/**
	 * Returns an Observable of a non-interlinked entity ITreeEntity.
	 */
	tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		ctx?: IContext
	): Observable<Entity>;

}
