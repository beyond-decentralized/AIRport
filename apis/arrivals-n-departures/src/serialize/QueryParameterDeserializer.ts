import { IEntityStateManager } from "@airport/ground-control";
import { IClientQuery } from "./ClientQuery";

export interface IQueryParameterDeserializer {

    deserialize(
        parameters: any[],
        query: IClientQuery,
        entityStateManager: IEntityStateManager
    ): any[]

}