import { IClientQuery, IQueryParameterDeserializer } from '@airport/arrivals-n-departures';
import { IEntityStateManager } from "@airport/ground-control";
export declare class QueryParameterDeserializer implements IQueryParameterDeserializer {
    deserialize(parameters: any[], query: IClientQuery, entityStateManager: IEntityStateManager): any[];
    private deserializeParameter;
    private checkTypeOfParameter;
}
//# sourceMappingURL=QueryParameterDeserializer.d.ts.map