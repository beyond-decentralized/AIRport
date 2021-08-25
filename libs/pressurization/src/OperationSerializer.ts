import { DI } from '@airport/di'
import { ISerializationStateManager, SerializationState } from './SerializationStateManager'
import { OPERATION_SERIALIZER } from './tokens'

/**
 * A simple operation serializer that is not aware
 * of the schema and only supports create operations
 * (good enough for now, to be expanded on later).
 * Also, ids are currently assumed to always
 * be represented by the "id" property.
 */
export interface IOperationSerializer {

	serialize<E, T = E | E[]>(
		entity: T,
		serializationStateManager: ISerializationStateManager,
	): T

}

interface ISerializableOperation {
	namePath: string[]
	processedEntityMap: Map<any, number>
	sequence: number
	stubLookupTable: any[]
}

export class OperationSerializer
	implements IOperationSerializer {

	serialize<E, T = E | E[]>(
		entity: T,
		serializationStateManager: ISerializationStateManager,
	): T {
		const operation: ISerializableOperation = {
			namePath: ['root'],
			processedEntityMap: new Map(),
			sequence: 0,
			stubLookupTable: [],
		}

		return this.doSerialize(entity, operation, serializationStateManager)
	}

	doSerialize<E>(
		entity: E,
		operation: ISerializableOperation,
		serializationStateManager: ISerializationStateManager,
	): E {
		if (entity instanceof Object) {
			if (entity instanceof Array) {
				return <any><E[]>entity.map(anEntity => this.doSerialize(
					anEntity, operation, serializationStateManager))
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

DI.set(OPERATION_SERIALIZER, OperationSerializer)
