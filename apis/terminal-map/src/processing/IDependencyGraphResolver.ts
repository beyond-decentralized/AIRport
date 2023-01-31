import { IAirEntity } from "@airport/ground-control";
import { IOperationNode } from "./IDependencyGraphNode";
import { IOperationContext } from "./IOperationContext";

export interface IDependencyGraphResolver {

    getOperationsInOrder<E extends IAirEntity>(
        entities: E[],
        context: IOperationContext,
    ): IOperationNode<E>[]

}

export interface IOperationsForEntity {
    create: IOperationNode<any>[],
    update: IOperationNode<any>[],
    delete: IOperationNode<any>[]
}
