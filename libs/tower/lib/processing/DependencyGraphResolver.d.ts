import { IEntityCascadeGraph } from '@airport/air-control';
import { IDependencyGraphNode, IOperationNode } from './DependencyGraphNode';
import { IOperationContext } from './OperationContext';
export interface IDependencyGraphResolver {
    getOperationsInOrder<E>(entities: E[], context: IOperationContext<E, IEntityCascadeGraph>): IOperationNode<E>[];
}
export declare class DependencyGraphResolver implements IDependencyGraphResolver {
    getOperationsInOrder<E>(entities: E[], context: IOperationContext<E, IEntityCascadeGraph>): IOperationNode<E>[];
    protected getEntitiesToPersist<E>(entities: E[], operatedOnEntities: IDependencyGraphNode<any>[], context: IOperationContext<E, IEntityCascadeGraph>, dependsOn?: IDependencyGraphNode<any>, dependency?: IDependencyGraphNode<any>, deleteByCascade?: boolean): IDependencyGraphNode<any>[];
    protected orderEntitiesToPersist<E>(unorderedDependencies: IDependencyGraphNode<any>[], context: IOperationContext<E, IEntityCascadeGraph>): IDependencyGraphNode<any>[];
    protected optimizePersistOperations<E>(orderedDependencies: IDependencyGraphNode<any>[], context: IOperationContext<E, IEntityCascadeGraph>): IOperationNode<E>[];
}
//# sourceMappingURL=DependencyGraphResolver.d.ts.map