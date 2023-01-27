import { IEntityStateManager } from "../core/operation/EntityStateManager";
import { IClientQuery } from "./ClientQuery";

export interface IQueryParameterDeserializer {

    deserialize(
        parameters: any[],
        query: IClientQuery,
        entityStateManager: IEntityStateManager
    ): any[]

}