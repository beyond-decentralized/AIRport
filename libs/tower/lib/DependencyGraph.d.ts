import { IEntityCascadeGraph } from '@airport/air-control';
import { IDependencyGraphNode } from './DependencyGraphNode';
import { IOperationContext } from './OperationContext';
export interface IDependencyGraphResolver {
    getEntitiesToPersist<E>(entities: E[], ctx: IOperationContext<E, IEntityCascadeGraph>, operatedOnEntityIndicator: boolean[]): IDependencyGraphNode<any>[];
}
export declare class DependencyGraph implements IDependencyGraphResolver {
    getEntitiesToPersist<E>(entities: E[], ctx: IOperationContext<E, IEntityCascadeGraph>, operatedOnEntityIndicator: boolean[]): IDependencyGraphNode<any>[];
    private assertRelationValueIsAnObject;
    private assertManyToOneNotArray;
    private assertOneToManyIsArray;
}
//# sourceMappingURL=DependencyGraph.d.ts.map