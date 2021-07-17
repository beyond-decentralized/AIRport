import { DI } from "@airport/di";
import { UPDATE_CACHE_MANAGER } from "../tokens";

const ORIGINAL_VALUES_PROPERTY = '__originalValues__'

export interface IUpdateCacheManager {

    saveOriginalValues<T>(
        entity: T
    ): void

}

export class UpdateCacheManager
    implements IUpdateCacheManager {

    saveOriginalValues<E, T = E | E[]>(
        entity: T,
        processedEntitySet: Set<any> = new Set()
    ): void {
        const originalValuesObject = {}
        entity[ORIGINAL_VALUES_PROPERTY] = originalValuesObject

        if (entity instanceof Array) {
			deserializedEntity = <any><E[]>entity.map(anEntity => this.doDeserialize(
				anEntity, operation, entityStateManager))
		} else {
			deserializedEntity = this.doDeserialize(entity, operation, entityStateManager)
		}
    }


}
DI.set(UPDATE_CACHE_MANAGER, UpdateCacheManager);
