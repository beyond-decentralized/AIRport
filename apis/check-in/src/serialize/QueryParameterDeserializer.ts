import { IEntityStateManager } from "@airport/pressurization";
import { IClientQuery } from "../clientQuery/ClientQuery";

export interface IQueryParameterDeserializer {

    deserialize(
        parameters: any[],
        query: IClientQuery,
        entityStateManager: IEntityStateManager
    ): any[]

}