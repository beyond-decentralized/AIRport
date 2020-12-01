import { IEntityCascadeGraph } from '@airport/air-control';
import { DbColumn, DbProperty } from '@airport/ground-control';
import { IDependencyGraphNode } from './DependencyGraphNode';
import { IOperationContext } from './OperationContext';
export interface IDependencyGraphResolver {
    getEntitiesToPersist<E>(entities: E[], ctx: IOperationContext<E, IEntityCascadeGraph>, operatedOnEntityIndicator: boolean[]): IDependencyGraphNode<any>[];
}
export declare class DependencyGraphResolver implements IDependencyGraphResolver {
    getEntitiesToPersist<E>(entities: E[], context: IOperationContext<E, IEntityCascadeGraph>, operatedOnEntityIndicator: boolean[], fromDependency?: IDependencyGraphNode<any>): IDependencyGraphNode<any>[];
    protected assertRelationValueIsAnObject(relationValue: any, dbProperty: DbProperty): void;
    protected assertManyToOneNotArray(relationValue: any): void;
    protected assertOneToManyIsArray(relationValue: any): void;
    protected columnProcessed(dbProperty: DbProperty, foundValues: any[], dbColumn: DbColumn, value: any): boolean;
}
//# sourceMappingURL=DependencyGraphResolver.d.ts.map