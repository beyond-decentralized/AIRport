import { IDependencyGraphNode, IDependencyGraphResolver, IOperationContext, IOperationNode } from '@airport/terminal-map';
export declare class DependencyGraphResolver implements IDependencyGraphResolver {
    getOperationsInOrder<E>(entities: E[], context: IOperationContext): IOperationNode<E>[];
    protected getEntitiesToPersist<E>(entities: E[], operatedOnEntities: IDependencyGraphNode<any>[], context: IOperationContext, dependsOn?: IDependencyGraphNode<any>, dependency?: IDependencyGraphNode<any>, deleteByCascade?: boolean): IDependencyGraphNode<any>[];
    protected resolveCircularDependencies<E>(unorderedDependencies: IDependencyGraphNode<any>[], context: IOperationContext): void;
    protected resolveCircularDependenciesForNode<E>(node: IDependencyGraphNode<any>, nodeOUID: number, currentlyTraversedNode: IDependencyGraphNode<any>, context: IOperationContext): void;
    protected hasGeneratedIdColumns(node: IDependencyGraphNode<any>): boolean;
    protected orderEntitiesToPersist<E>(unorderedDependencies: IDependencyGraphNode<any>[], context: IOperationContext): IDependencyGraphNode<any>[];
    protected optimizePersistOperations<E>(orderedDependencies: IDependencyGraphNode<any>[], context: IOperationContext): IOperationNode<E>[];
    /**
     *
     * @param operationNodes
     * @param context
     */
    ensureUpdatesAreGroupedCorrectly<E>(operationNodes: IOperationNode<E>[], context: IOperationContext): IOperationNode<E>[];
}
//# sourceMappingURL=DependencyGraphResolver.d.ts.map