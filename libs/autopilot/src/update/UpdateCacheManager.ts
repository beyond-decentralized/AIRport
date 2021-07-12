import { DI } from "@airport/di";
import { UPDATE_CACHE_MANAGER } from "../tokens";

export interface IUpdateCacheManager {

    saveOriginalValues<T>(
        entity: T
    ): void

}

export class UpdateCacheManager
    implements IUpdateCacheManager {

    saveOriginalValues<E, T = E | E[]>(
        entity: T
    ): void {
        const entitySet = new Set<any>();
    }


}
DI.set(UPDATE_CACHE_MANAGER, UpdateCacheManager);
