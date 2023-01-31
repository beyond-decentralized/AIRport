import { DbEntity } from "../application/DbEntity";
import { IEntityStateManager } from "../core/operation/IEntityStateManager";
import { IApplicationUtils } from "../utils/IApplicationUtils";

export interface IOperationDeserializer {

    deserialize<E, T = E | E[]>(
        entity: T,
        dbEntity: DbEntity,
        entityStateManager: IEntityStateManager,
        applicationUtils: IApplicationUtils
    ): T

}
