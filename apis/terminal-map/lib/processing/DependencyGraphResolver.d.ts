import { IAirEntity } from "@airport/holding-pattern";
import { IOperationNode } from "./DependencyGraphNode";
import { IOperationContext } from "./OperationContext";
export interface IDependencyGraphResolver {
    getOperationsInOrder<E extends IAirEntity>(entities: E[], context: IOperationContext): IOperationNode<E>[];
}
export interface IOperationsForEntity {
    create: IOperationNode<any>[];
    update: IOperationNode<any>[];
    delete: IOperationNode<any>[];
}
//# sourceMappingURL=DependencyGraphResolver.d.ts.map