import { JsonFormattedQuery, JsonOperation } from '@airport/ground-control';
import * as ts from 'typescript';
export interface JsonFormattedQueryWithExpression extends JsonFormattedQuery {
    expression: ts.FunctionExpression;
}
export declare const entityOperationMap: {
    [entityName: string]: {
        [operationName: string]: JsonOperation;
    };
};
export declare const entityOperationPaths: {
    [entityName: string]: string;
};
export declare function visitDaoFile(node: ts.Node, path: string): void;
//# sourceMappingURL=OperationGenerator.d.ts.map