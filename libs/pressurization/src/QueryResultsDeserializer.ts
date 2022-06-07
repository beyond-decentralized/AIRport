import { REPOSITORY_ENTITY_UTILS } from '@airport/aviation-communication'
import { Inject, Injected } from '@airport/direction-indicator'
import {
	ISerializationStateManager,
	SerializationState
} from './SerializationStateManager'

/**
 * Deserializer for query results coming back from the server
 */
export interface IQueryResultsDeserializer {

	deserialize<E, T = E | E[]>(
		entity: T
	): T

	deepCopyProperties<T>(
		from: T,
		to: T
	): void

	setPropertyDescriptors(
		object: any
	): void

}

interface IDeserializableOperation {
	lookupTable: any[]
}

@Injected()
export class QueryResultsDeserializer
	implements IQueryResultsDeserializer {

	@Inject()
	serializationStateManager: ISerializationStateManager

	deserialize<E, T = E | E[]>(
		entity: T,
	): T {
		const operation: IDeserializableOperation = {
			lookupTable: [],
		}
		let deserializedEntity
		if (entity instanceof Array) {
			deserializedEntity = <any><E[]>entity.map(anEntity => this.doDeserialize(
				anEntity, operation))
		} else {
			deserializedEntity = this.doDeserialize(entity, operation)
		}

		return deserializedEntity
	}

	doDeserialize<E>(
		entity: E,
		operation: IDeserializableOperation
	): E {
		let state = this.serializationStateManager.getEntityState(entity)
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

		let operationUniqueId = this.serializationStateManager.getSerializationUniqueId(entity)
		if (!operationUniqueId || typeof operationUniqueId !== 'number' || operationUniqueId < 1) {
			throw new Error(`Invalid or missing ${this.serializationStateManager.getUniqueIdFieldName()} field.`)
		}

		let alreadyDeserializedEntity = operation.lookupTable[operationUniqueId]
		switch (state) {
			case SerializationState.STUB: {
				if (!alreadyDeserializedEntity) {
					throw new Error(`Could not find an already present entity for
					${this.serializationStateManager.getUniqueIdFieldName()} of ${operationUniqueId}`)
				}
				return alreadyDeserializedEntity
			}
			default:
				if (alreadyDeserializedEntity) {
					throw new Error(`Entity appears more than once for
					${this.serializationStateManager.getUniqueIdFieldName()} of ${operationUniqueId}`)
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
						aProperty, operation))
				} else {
					propertyCopy = this.doDeserialize(property, operation)
				}
			} else {
				propertyCopy = property
			}
			deserializedEntity[propertyName] = propertyCopy
		}
		delete deserializedEntity[this.serializationStateManager.getUniqueIdFieldName()]

		return deserializedEntity
	}

	deepCopyProperties<T>(
		from: T,
		to: T
	): void {
		if (from instanceof Array) {
			for (let i = 0; i < from.length; i++) {
				this.deepCopyProperties(from[i], to[i])
			}
		}
		if (!(from instanceof Object)) {
			return
		}
		if (from instanceof Date) {
			return
		}
		for (let propertyName in from) {
			if (!from.hasOwnProperty(propertyName)) {
				continue
			}
			let fromProperty = from[propertyName]
			let toProperty = to[propertyName]
			if (fromProperty instanceof Object && toProperty instanceof Object) {
				this.deepCopyProperties(fromProperty, toProperty)
			} else {
				to[propertyName] = from[propertyName]
			}
		}
		for (let propertyName in to) {
			if (!to.hasOwnProperty(propertyName)) {
				continue
			}
			if (!from.hasOwnProperty(propertyName)) {
				delete to[propertyName]
			}
		}
		this.doSetPropertyDescriptors(to)
	}

	setPropertyDescriptors(
		object: any
	): void {
		if (object instanceof Array) {
			for (let i = 0; i < object.length; i++) {
				this.setPropertyDescriptors(object[i])
			}
		}
		if (!(object instanceof Object)) {
			return
		}
		if (object instanceof Date) {
			return
		}

		for (let propertyName in object) {
			if (!object.hasOwnProperty(propertyName)) {
				continue
			}
			let property = object[propertyName]
			if (property instanceof Object) {
				this.setPropertyDescriptors(property)
			}
		}
		this.doSetPropertyDescriptors(object)
	}

	private doSetPropertyDescriptors(
		object: any
	): void {
		let objectPrototype = Object.getPrototypeOf(object)
		if (!object.id
			&& !Object.getOwnPropertyDescriptor(object, 'uuId')
			&& (!objectPrototype
				|| !Object.getOwnPropertyDescriptor(objectPrototype, 'uuId'))) {
			Object.defineProperty(object, 'uuId', {
				get() {
					return this.__container__.getSync(REPOSITORY_ENTITY_UTILS).encodeUuId(this)
				},
				set(
					idString: string
				) {
					return this.__container__.getSync(REPOSITORY_ENTITY_UTILS).setUuId(idString, this)
				}
			});
		}
		if (!object.createdBy
			&& !Object.getOwnPropertyDescriptor(object, 'createdBy')
			&& (!objectPrototype
				|| !Object.getOwnPropertyDescriptor(objectPrototype, 'createdBy'))) {
			Object.defineProperty(object, 'createdBy', {
				get() {
					return this.__container__.getSync(REPOSITORY_ENTITY_UTILS).getCreatedBy(this)
				}
			});
		}
	}

}
