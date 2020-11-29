import { IOperationContext } from './OperationContext';
export interface IEntityGraphRestorer {
    restoreEntityGraph<T>(root: T | T[], context: IOperationContext<any, any>): void;
}
export declare class EntityGraphRestorer implements IEntityGraphRestorer {
    restoreEntityGraph<T>(root: T | T[], context: IOperationContext<any, any>): void;
    protected linkEntityGraph(currentEntities: any[], entitiesByOperationIndex: any[], context: IOperationContext<any, any>, checkForDuplicates?: boolean): void;
}
//# sourceMappingURL=EntityGraphRestorer.d.ts.map