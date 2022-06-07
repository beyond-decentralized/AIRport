import { IEntityStateManager } from '@airport/ground-control';
import { IAirEntity } from '@airport/holding-pattern';
import { IDependencyGraphNode, IDependencyGraphResolver, IOperationContext, IOperationNode } from '@airport/terminal-map';
export declare class DependencyGraphResolver implements IDependencyGraphResolver {
    entityStateManager: IEntityStateManager;
    getOperationsInOrder<E extends IAirEntity>(entities: E[], context: IOperationContext): IOperationNode<E>[];
    protected getEntitiesToPersist<E extends IAirEntity>(entities: E[], operatedOnEntities: IDependencyGraphNode<any>[], operatedOnPassThroughs: boolean[], context: IOperationContext, dependsOn?: IDependencyGraphNode<any>, dependency?: IDependencyGraphNode<any>, deleteByCascade?: boolean): IDependencyGraphNode<any>[];
    protected resolveCircularDependencies<E>(unorderedDependencies: IDependencyGraphNode<any>[], context: IOperationContext): void;
    protected resolveCircularDependenciesForNode<E>(node: IDependencyGraphNode<any>, nodeOUID: number, currentlyTraversedNode: IDependencyGraphNode<any>, context: IOperationContext, nodePath?: IDependencyGraphNode<any>[]): void;
    protected orderEntitiesToPersist<E>(unorderedDependencies: IDependencyGraphNode<any>[], context: IOperationContext): IDependencyGraphNode<any>[];
    protected optimizePersistOperations<E extends IAirEntity>(orderedDependencies: IDependencyGraphNode<any>[], context: IOperationContext): IOperationNode<E>[];
    /**
     *
     * @param operationNodes
     * @param context
     */
    ensureUpdatesAreGroupedCorrectly<E extends IAirEntity>(operationNodes: IOperationNode<E>[], context: IOperationContext): IOperationNode<E>[];
}
//# sourceMappingURL=DependencyGraphResolver.d.ts.map