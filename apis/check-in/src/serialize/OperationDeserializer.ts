import { DbEntity } from "@airport/ground-control";
import { IEntityStateManager } from "@airport/pressurization";

export interface IOperationDeserializer {

    deserialize<E, T = E | E[]>(
        entity: T,
        dbEntity: DbEntity,
        entityStateManager: IEntityStateManager
    ): T

}
