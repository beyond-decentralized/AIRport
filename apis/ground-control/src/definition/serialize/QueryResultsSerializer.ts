import { DbEntity } from "../application/Entity";
import { IEntityStateManager } from "../core/operation/EntityStateManager";
import { IApplicationUtils } from "../utils/IApplicationUtils";

export interface IQueryResultsSerializer {

	serialize<E, T = E | E[]>(
		entity: T,
		dbEntity: DbEntity,
		entityStateManager: IEntityStateManager,
		applicationUtils: IApplicationUtils,
	): T

}
