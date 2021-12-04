import { IEntityContext } from "@airport/air-control";
import { DbEntity, IEntityStateManager } from "@airport/ground-control";
/**
 * A defensive copy maker.  It's a fast operation but might
 * save headaches going forward.  The only currently known scenario
 * where it is useful is related to not propagating the stateField
 * used for save operation.  This could be important if
 * a save operation fails and, subsequently, the invoking logic
 * further modifies objects (resulting in a state where previously
 * a non-op object becomes an update or an update becomes a delete).
 */
export interface IEntityCopier {
    copyEntityForProcessing<E, T = E | E[]>(entity: T, dbEntity: DbEntity, entityStateManager: IEntityStateManager, context: IEntityContext): T;
}
export declare class EntityCopier implements IEntityCopier {
    copyEntityForProcessing<E, T = E | E[]>(entity: T, dbEntity: DbEntity, entityStateManager: IEntityStateManager, context: IEntityContext): T;
    private doCopyEntityForProcessing;
}
//# sourceMappingURL=EntityCopier.d.ts.map