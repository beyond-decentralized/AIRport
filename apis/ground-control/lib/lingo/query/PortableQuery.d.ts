import { JsonStatement } from "./facade/Query";
import { QueryResultType } from "./QueryResultType";
/**
 * Created by Papa on 11/12/2016.
 */
export interface PortableQuery {
    schemaIndex?: number;
    tableIndex?: number;
    jsonQuery: JsonStatement;
    queryResultType: QueryResultType;
    parameterMap: any;
}
