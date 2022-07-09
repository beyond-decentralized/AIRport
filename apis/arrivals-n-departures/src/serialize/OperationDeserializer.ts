import {
    DbEntity,
    IEntityStateManager
} from "@airport/ground-control";

export interface IOperationDeserializer {

    deserialize<E, T = E | E[]>(
        entity: T,
        dbEntity: DbEntity,
        entityStateManager: IEntityStateManager,
        applicationUtils: IApplicationUtils
    ): T

}
