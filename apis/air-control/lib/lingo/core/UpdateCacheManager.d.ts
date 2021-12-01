import { DbEntity, IEntityStateManager, ISaveResult } from "@airport/ground-control";
import { IApplicationUtils } from "../utils/ApplicationUtils";
export interface IUpdateCacheManager {
    saveOriginalValues<E, T = E | E[]>(entity: T, dbEntity: DbEntity, entityStateManager: IEntityStateManager, applicationUtils: IApplicationUtils): any;
    setOperationState<E, T = E | E[]>(entityCopy: T, dbEntity: DbEntity, entityStateManager: IEntityStateManager, applicationUtils: IApplicationUtils, processedEntities: Set<any>): void;
    afterSaveModifications<E, T = E | E[]>(entity: T, dbEntity: DbEntity, saveResult: ISaveResult, entityStateManager: IEntityStateManager, applicationUtils: IApplicationUtils, processedEntities: Set<any>): void;
}
//# sourceMappingURL=UpdateCacheManager.d.ts.map