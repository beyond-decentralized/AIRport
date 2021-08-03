import { IEntityStateManager } from "@airport/ground-control";
import { IClientQuery } from "../clientQuery/ClientQuery";
export interface IQueryParameterDeserializer {
    deserialize(parameters: any[], query: IClientQuery, entityStateManager: IEntityStateManager): any[];
}
//# sourceMappingURL=QueryParameterDeserializer.d.ts.map