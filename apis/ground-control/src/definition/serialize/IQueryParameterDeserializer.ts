import { IEntityStateManager } from "../core/operation/IEntityStateManager";
import { IClientQuery } from "./IClientQuery";

export interface IQueryParameterDeserializer {

    deserialize(
        parameters: any[],
        query: IClientQuery,
        entityStateManager: IEntityStateManager
    ): any[]

}