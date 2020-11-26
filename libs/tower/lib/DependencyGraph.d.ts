import { IEntityCascadeGraph } from '@airport/air-control';
import { IOperationContext } from './OperationContext';
export interface IDependencyGraph {
}
export declare class DependencyGraph implements IDependencyGraph {
    getEntitiesToPersist<E>(entity: E, ctx: IOperationContext<E, IEntityCascadeGraph>): void;
}
//# sourceMappingURL=DependencyGraph.d.ts.map