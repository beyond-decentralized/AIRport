/**
 * Type of update-caching to apply to retrieved entities.
 */
import {ILookup}         from './Lookup'



/**
 * Common parent for all entity retrieval operations.
 */
export interface IEntityLookup<Child, MappedChild>
	extends ILookup {

	map(
		isMapped?: boolean
	): MappedChild;

}
