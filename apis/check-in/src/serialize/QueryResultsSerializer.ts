import { IApplicationUtils } from "@airport/air-control";
import {
	DbEntity,
	IEntityStateManager
} from "@airport/ground-control";

export interface IQueryResultsSerializer {

	serialize<E, T = E | E[]>(
		entity: T,
		dbEntity: DbEntity,
		entityStateManager: IEntityStateManager,
		applicationUtils: IApplicationUtils,
	): T

}
