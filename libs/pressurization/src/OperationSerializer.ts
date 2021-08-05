import { DI } from '@airport/di'
import {
	EntityState,
	IEntityStateManager
} from '@airport/ground-control'
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
		entityStateManager: IEntityStateManager,
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
		entityStateManager: IEntityStateManager,
	): T {
		const operation: ISerializableOperation = {
			namePath: ['root'],
			processedEntityMap: new Map(),
			sequence: 0,
			stubLookupTable: [],
		}

		return this.doSerialize(entity, operation, entityStateManager)
	}

	doSerialize<E>(
		entity: E,
		operation: ISerializableOperation,
		entityStateManager: IEntityStateManager,
	): E {
		if (entity instanceof Object) {
			if (entity instanceof Array) {
				return <any><E[]>entity.map(anEntity => this.doSerialize(
					anEntity, operation, entityStateManager))
			} else if (entity instanceof Date) {
				var copy = {
					value: entity.toISOString()
				}
				copy[entityStateManager.getStateFieldName()] = EntityState.RESULT_DATE
				return copy as any
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
		entityStub[entityStateManager.getUniqueIdFieldName()] = operationUniqueId
		entityStub[entityStateManager.getStateFieldName()] = EntityState.STUB
		operation.stubLookupTable[operationUniqueId] = entityStub

		let serializedEntity: any = {}
		serializedEntity[entityStateManager.getUniqueIdFieldName()] = operationUniqueId

		var isFirstProperty = true;
		for (const propertyName in entity) {
			const property = entity[propertyName]
			const propertyState = property[entityStateManager.getStateFieldName()]
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
							aProperty, operation, entityStateManager))
					// }
				} else if (property instanceof Date) {
					propertyCopy = {
						value: property.toISOString()
					}
					propertyCopy[entityStateManager.getStateFieldName()] = EntityState.RESULT_DATE
				} else {
					// if (propertyState === EntityState.RESULT_JSON) {
					// 	propertyCopy = {
					// 		value: JSON.stringify(property)
					// 	}
					// 	propertyCopy[entityStateManager.getStateFieldName()] = propertyState
					// } else {
						propertyCopy = this.doSerialize(property, operation, entityStateManager)
					// }
				}
			} else {
				propertyCopy = {
					value: null
				}
				propertyCopy[entityStateManager.getStateFieldName()] = propertyState

				switch (propertyState) {
					// case EntityState.RESULT_JSON_ARRAY:
					// 	if (property) {
					// 		throw new Error(`Expecting an Array for "${operation.namePath.join('.')}", got: ${property}`)
					// 	}
					// 	break
					// case EntityState.RESULT_JSON:
					// 	if (property) {
					// 		throw new Error(`Expecting an Object for "${operation.namePath.join('.')}", got: ${property}`)
					// 	}
					// 	break
					case EntityState.RESULT_DATE:
						if (property) {
							throw new Error(`Expecting a Date for "${operation.namePath.join('.')}", got: ${property}`)
						}
						break
					default:
						propertyCopy = property
						break
				}
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
