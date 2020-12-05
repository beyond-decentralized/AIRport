import {
	EntityState,
	IEntityStateManager
}                             from '@airport/air-control'
import {DI}                   from '@airport/di'
import {OPERATION_SERIALIZER} from '../tokens'

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
			stubLookupTable: []
		}
		let serializedEntity
		if (entity instanceof Array) {
			serializedEntity = <any><E[]>entity.map(anEntity => this.doSerialize(
				anEntity, operation, entityStateManager))
		} else {
			serializedEntity = this.doSerialize(entity, operation, entityStateManager)
		}

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
		// TODO: add support for non-create operations
		let operationUniqueId = entityStateManager.getOperationUniqueId(entity)
		if (operationUniqueId) {
			return operation.stubLookupTable[operationUniqueId]
		}
		operationUniqueId                                     = ++operation.sequence
		let entityStub                                        = {}
		entityStub[entityStateManager.getUniqueIdFieldName()] = operationUniqueId
		entityStub[entityStateManager.getStateFieldName()]    = EntityState.STUB
		operation.stubLookupTable[operationUniqueId]          = entityStub

		let entityCopy: any                                   = {}
		operation.lookupTable[operationUniqueId]              = entity
		entityCopy[entityStateManager.getUniqueIdFieldName()] = operationUniqueId

		let isCreate    = true
		let entityState = EntityState.STUB
		if (entity['id']) {
			isCreate    = false
			entityState = EntityState.CREATE
		}
		entityStub[entityStateManager.getStateFieldName()] = entityState

		for (const propertyName in entity) {
			const property = entity[propertyName]
			let propertyCopy
			if (property instanceof Object) {
				if (property instanceof Array) {
					propertyCopy = property.map(aProperty => this.doSerialize(
						aProperty, operation, entityStateManager))
				} else if (property instanceof Date) {
					propertyCopy = property.toISOString()
				} else {
					propertyCopy = this.doSerialize(property, operation, entityStateManager)
				}
			} else {
				propertyCopy = property
			}
			entityCopy[propertyName] = propertyCopy
		}

		return entityCopy
	}

}

DI.set(OPERATION_SERIALIZER, OperationSerializer)
