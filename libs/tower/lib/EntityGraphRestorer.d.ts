import { IEntityStateManager } from '@airport/air-control';
export interface IEntityGraphRestore {
}
export declare class EntityGraphRestorer implements IEntityGraphRestore {
    restoreEntityGraph(root: any): void;
    protected linkEntityGraph(currentEntities: any[], entitiesByOperationIndex: any[], entityStateManager: IEntityStateManager, checkForDuplicates?: boolean): void;
}
//# sourceMappingURL=EntityGraphRestorer.d.ts.map