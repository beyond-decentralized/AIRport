import { DI } from '@airport/di'
import {
	EntityState,
	IEntityStateManager
} from './EntityStateManager'
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
	lookupTable: any[]
	sequence: number
	stubLookupTable: any[]
	processedEntityMap: Map<any, number>
}

export class OperationSerializer
	implements IOperationSerializer {

	serialize<E, T = E | E[]>(
		entity: T,
		entityStateManager: IEntityStateManager,
	): T {
		const operation: ISerializableOperation = {
			lookupTable: [],
			sequence: 0,
			stubLookupTable: [],
			processedEntityMap: new Map()
		}
		let serializedEntity = this.doSerialize(entity, operation, entityStateManager)

		for (let i = 1; i < operation.lookupTable.length; i++) {
			delete operation.lookupTable[i][entityStateManager.getUniqueIdFieldName()]
		}

		return serializedEntity
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
				return entity.toISOString() as any
			} else {
				// fall though
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
		operation.lookupTable[operationUniqueId] = entity
		serializedEntity[entityStateManager.getUniqueIdFieldName()] = operationUniqueId

		// let entityState = EntityState.STUB
		// if (entity['id']) {
		// 	entityState = EntityState.CREATE
		// }
		// entityCopy[entityStateManager.getStateFieldName()] = entityState

		for (const propertyName in entity) {
			const property = entity[propertyName]
			const propertyState = property[entityStateManager.getStateFieldName()]
			let propertyCopy
			if (property instanceof Object) {
				if (property instanceof Array) {
					if (propertyState === EntityState.RESULT_JSON_ARRAY) {
						propertyCopy = JSON.stringify(property)
					} else {
						propertyCopy = property.map(aProperty => this.doSerialize(
							aProperty, operation, entityStateManager))
					}
				} else if (property instanceof Date) {
					propertyCopy = {
						value: property.toISOString()
					}
					propertyCopy[entityStateManager.getStateFieldName()] = EntityState.RESULT_DATE
				} else {
					if (propertyState === EntityState.RESULT_JSON) {
						propertyCopy = JSON.stringify(property)
					} else {
						propertyCopy = this.doSerialize(property, operation, entityStateManager)
					}
				}
			} else {
				propertyCopy = property
			}
			serializedEntity[propertyName] = propertyCopy
		}

		return serializedEntity
	}

}

DI.set(OPERATION_SERIALIZER, OperationSerializer)
