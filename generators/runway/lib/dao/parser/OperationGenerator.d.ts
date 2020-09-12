import { JsonOperation } from '@airport/ground-control';
import * as ts from 'typescript';
export declare const entityOperationMap: {
    [entityName: string]: {
        [operationName: string]: JsonOperation;
    };
};
export declare function visitDaoFile(node: ts.Node, path: string): void;
//# sourceMappingURL=OperationGenerator.d.ts.map