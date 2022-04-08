import { container, DI } from '@airport/di'
import {
	ISerializationStateManager,
	SerializationState
} from './SerializationStateManager'
import { QUERY_RESULTS_DESERIALIZER, SERIALIZATION_STATE_MANAGER } from './tokens'

/**
 * Deserializer for query results coming back from the server
 */
export interface IQueryResultsDeserializer {

	deserialize<E, T = E | E[]>(
		entity: T
	): T

}

interface IDeserializableOperation {
	lookupTable: any[]
}

export class QueryResultsDeserializer
	implements IQueryResultsDeserializer {

	deserialize<E, T = E | E[]>(
		entity: T,
	): T {
		const serializationStateManager = container(this).getSync(SERIALIZATION_STATE_MANAGER)
		const operation: IDeserializableOperation = {
			lookupTable: [],
		}
		let deserializedEntity
		if (entity instanceof Array) {
			deserializedEntity = <any><E[]>entity.map(anEntity => this.doDeserialize(
				anEntity, operation, serializationStateManager))
		} else {
			deserializedEntity = this.doDeserialize(entity, operation, serializationStateManager)
		}

		return deserializedEntity
	}

	doDeserialize<E>(
		entity: E,
		operation: IDeserializableOperation,
		serializationStateManager: ISerializationStateManager
	): E {
		let state = serializationStateManager.getEntityState(entity)
		switch (state) {
			case SerializationState.DATE:
				return <any>new Date(entity['value'])
			// case EntityState.RESULT_JSON:
			// 	return entity
			// case EntityState.RESULT_JSON_ARRAY:
			// 	const value = entity['value']
			// 	value[entityStateManager.getStateFieldName()] = EntityState.RESULT_JSON_ARRAY
			// 	return entity
		}

		let operationUniqueId = serializationStateManager.getSerializationUniqueId(entity)
		if (!operationUniqueId || typeof operationUniqueId !== 'number' || operationUniqueId < 1) {
			throw new Error(`Invalid or missing ${serializationStateManager.getUniqueIdFieldName()} field.`)
		}

		let alreadyDeserializedEntity = operation.lookupTable[operationUniqueId]
		switch (state) {
			case SerializationState.STUB: {
				if (!alreadyDeserializedEntity) {
					throw new Error(`Could not find an already present entity for
					${serializationStateManager.getUniqueIdFieldName()} of ${operationUniqueId}`)
				}
				return alreadyDeserializedEntity
			}
			default:
				if (alreadyDeserializedEntity) {
					throw new Error(`Entity appears more than once for
					${serializationStateManager.getUniqueIdFieldName()} of ${operationUniqueId}`)
				}
		}

		let deserializedEntity: any = {}
		operation.lookupTable[operationUniqueId] = deserializedEntity

		for (const propertyName in entity) {
			const property = entity[propertyName]
			let propertyCopy
			if (property instanceof Object) {
				if (property instanceof Array) {
					propertyCopy = property.map(aProperty => this.doDeserialize(
						aProperty, operation, serializationStateManager))
				} else {
					propertyCopy = this.doDeserialize(property, operation, serializationStateManager)
				}
			} else {
				propertyCopy = property
			}
			deserializedEntity[propertyName] = propertyCopy
		}
		delete deserializedEntity[serializationStateManager.getUniqueIdFieldName()]

		return deserializedEntity
	}

}

DI.set(QUERY_RESULTS_DESERIALIZER, QueryResultsDeserializer)
