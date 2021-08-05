import { IClientQuery, IQueryParameterDeserializer } from "@airport/check-in";
import { IEntityStateManager } from "@airport/pressurization";
export declare class QueryParameterDeserializer implements IQueryParameterDeserializer {
    deserialize(parameters: any[], query: IClientQuery, entityStateManager: IEntityStateManager): any[];
    private deserializeParameter;
    private checkTypeOfParameter;
}
//# sourceMappingURL=QueryParameterDeserializer.d.ts.map