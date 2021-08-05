import { ISaveResult } from "../../query/SaveResult";
import { DbEntity } from "../../schema/Entity";
import { IEntityStateManager } from "./EntityStateManager";
export interface IUpdateCacheManager {
    saveOriginalValues<E, T = E | E[]>(entity: T, dbEntity: DbEntity, entityStateManager: IEntityStateManager): any;
    setOperationState<E, T = E | E[]>(entityCopy: T, dbEntity: DbEntity, entityStateManager: IEntityStateManager, processedEntities: Set<any>): void;
    afterSaveModifications<E, T = E | E[]>(entity: T, dbEntity: DbEntity, saveResult: ISaveResult, entityStateManager: IEntityStateManager, processedEntities: Set<any>): void;
}
//# sourceMappingURL=UpdateCacheManager.d.ts.map