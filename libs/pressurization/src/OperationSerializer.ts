import { container, DEPENDENCY_INJECTION } from '@airport/direction-indicator'
import { ISerializationStateManager } from './SerializationStateManager'
import { OPERATION_SERIALIZER, SERIALIZATION_STATE_MANAGER } from './tokens'

/**
 * A simple operation serializer. Ids are assumed to always
 * be represented by the "id" property.
 */
export interface IOperationSerializer {

	serializeAsArray<E>(
		entity: E | E[]
	): E[]

	serialize<E>(
		entity: E | E[]
	): E | E[]

}

interface ISerializableOperation {
	namePath: string[]
	processedEntityMap: Map<any, number>
	sequence: number
	stubLookupTable: any[]
}

export class OperationSerializer
	implements IOperationSerializer {

	serializeAsArray<E>(
		entity: E | E[]
	): E[] {
		let serializedEntity: E[] = []

		if (!entity) {
			return serializedEntity
		}

        const serializationStateManager = container(this).getSync(SERIALIZATION_STATE_MANAGER)

		if (entity instanceof Array) {
			serializedEntity = entity
				.map(anEntity => this.serializeWithManager(anEntity, serializationStateManager) as E)
		} else {
			serializedEntity = [this.serializeWithManager(entity, serializationStateManager)as E]
		}

		return serializedEntity
	}

	serialize<E>(
		entity: E | E[]
	): E | E[] {
        const serializationStateManager = container(this).getSync(SERIALIZATION_STATE_MANAGER)

		return this.serializeWithManager(entity, serializationStateManager)
	}

	private serializeWithManager<E>(
		entity: E | E[],
		serializationStateManager: ISerializationStateManager
	): E | E[] {
		const operation: ISerializableOperation = {
			namePath: ['root'],
			processedEntityMap: new Map(),
			sequence: 0,
			stubLookupTable: [],
		}

		return this.doSerialize(entity, operation, serializationStateManager)
	}

	doSerialize<T>(
		entity: T,
		operation: ISerializableOperation,
		serializationStateManager: ISerializationStateManager,
	): T {
		if (entity instanceof Object) {
			if (entity instanceof Array) {
				return entity.map(anEntity => this.doSerialize(
					anEntity, operation, serializationStateManager)) as any as T
			} else if (entity instanceof Date) {
				return serializationStateManager.serializeAsDate(entity) as any
			}
		} else {
			return entity;
		}

		let operationUniqueId = operation.processedEntityMap.get(entity)
		if (operationUniqueId) {
			return operation.stubLookupTable[operationUniqueId]
		}
		operationUniqueId = ++operation.sequence
		operation.processedEntityMap.set(entity, operationUniqueId)

		let entityStub = {}
		serializationStateManager.markAsStub(entity)
		entityStub[serializationStateManager.getUniqueIdFieldName()] = operationUniqueId
		operation.stubLookupTable[operationUniqueId] = entityStub

		let serializedEntity: any = {}
		serializedEntity[serializationStateManager.getUniqueIdFieldName()] = operationUniqueId

		var isFirstProperty = true;
		for (const propertyName in entity) {
			const property = entity[propertyName]
			// const propertyState = property[serializationStateManager.getStateFieldName()]
			let propertyCopy
			if (!isFirstProperty) {
				operation.namePath.pop()
			}
			isFirstProperty = false
			operation.namePath.push(propertyName)

			if (property instanceof Object) {
				if (property instanceof Array) {
					// if (propertyState === EntityState.RESULT_JSON_ARRAY) {
					// 	propertyCopy = {
					// 		value: JSON.stringify(property)
					// 	}
					// 	propertyCopy[entityStateManager.getStateFieldName()] = propertyState
					// } else {
					propertyCopy = property.map(aProperty => this.doSerialize(
						aProperty, operation, serializationStateManager))
					// }
				} else if (property instanceof Date) {
					propertyCopy = serializationStateManager.serializeAsDate(property)
				} else {
					// if (propertyState === EntityState.RESULT_JSON) {
					// 	propertyCopy = {
					// 		value: JSON.stringify(property)
					// 	}
					// 	propertyCopy[entityStateManager.getStateFieldName()] = propertyState
					// } else {
					propertyCopy = this.doSerialize(property, operation, serializationStateManager)
					// }
				}
			} else {
				// switch (propertyState) {
				// 	// case EntityState.RESULT_JSON_ARRAY:
				// 	// 	if (property) {
				// 	// 		throw new Error(`Expecting an Array for "${operation.namePath.join('.')}", got: ${property}`)
				// 	// 	}
				// 	// 	break
				// 	// case EntityState.RESULT_JSON:
				// 	// 	if (property) {
				// 	// 		throw new Error(`Expecting an Object for "${operation.namePath.join('.')}", got: ${property}`)
				// 	// 	}
				// 	// 	break
				// 	case SerializationState.DATE:
				// 		if (property) {
				// 			throw new Error(`Expecting a Date for "${operation.namePath.join('.')}", got: ${property}`)
				// 		}
				// 		break
				// 	default:
				propertyCopy = property
				// break
				// }
			}
			serializedEntity[propertyName] = propertyCopy
		}
		if (!isFirstProperty) {
			operation.namePath.pop()
		}

		return serializedEntity
	}

}

DEPENDENCY_INJECTION.set(OPERATION_SERIALIZER, OperationSerializer)
