import { AIR_ENTITY_UTILS, IAirEntityUtils } from '@airport/aviation-communication'
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

/*
interface ArrayMemberEntityRecord<T> {
	index: number,
	entity: T
}
*/
/*

Instead of doing a blind "copy if GUID is present otherwise do nothing":

1.	When sending objects, mark them all with serialization Ids
2.  Retain those Ids during operations in @Api()s & AIRport
3.	Map all objects on the way back by these serialization ids
4.	Do a copy from -> to based on those ids

interface ArrayMemberRecord<T> {
	index: number,
	isWithoutId: boolean
	isObject: boolean
	isEntity: boolean
	isPrimitive: boolean
	entity: T
}

interface ArrayEntityInfo {
	hasWithoutId: boolean
	hasObjects: boolean
	hasEntities: boolean
	hasPrimitives: boolean
	entityMap: Map<string, ArrayMemberEntityRecord<any>>
	entityArray: ArrayMemberRecord<any>[]
}
 */

@Injected()
export class QueryResultsDeserializer
	implements IQueryResultsDeserializer {

	@Inject()
	airEntityUtils: IAirEntityUtils

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

	// private getArrayEntityMap() {
	// 	{
	// 		hasWithoutId: boolean
	// 		hasObjects: boolean
	// 		hasEntities: boolean
	// 		hasPrimitives: boolean
	// 		entityMap: Map < string, ArrayMemberEntityRecord < any >>
	// 			entityArray: ArrayMemberRecod[]
	// 	}
	// }

	deepCopyProperties<T>(
		from: T,
		to: T
	): void {
		if (from instanceof Array) {
			// let fromArrayEntityMapByGUID: Map<string, ArrayMemberEntityRecord<any>> = new Map()
			// let toArrayEntityMapByGUID: Map<string, ArrayMemberEntityRecord<any>> = new Map()
			// let haveFromWithoutId = false
			// let haveFromObjects = false
			// let haveFromEntities = false
			// let haveFromPrimitives = false
			// for (let i = 0; i < from.length; i++) {
			// 	let fromEntity = from[i]

			// 	if (fromEntity instanceof Object && !(fromEntity instanceof Date)) {
			// 		haveFromObjects = true
			// 		let entityGUID = this.airEntityUtils.encodeId(from[i])
			// 		if (entityGUID) {
			// 			haveFromEntities = true
			// 			fromArrayEntityMapByGUID.set(entityGUID, from[i])
			// 		} else {
			// 			haveFromWithoutId = true
			// 		}
			// 	} else {
			// 		haveFromPrimitives = true
			// 	}
			// }
			// let haveToWithoutId = false
			// for (let i = 0; i < from.length; i++) {
			// 	this.deepCopyProperties(from[i], to[i])
			// }
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
			&& !Object.getOwnPropertyDescriptor(object, 'id')
			&& (!objectPrototype
				|| !Object.getOwnPropertyDescriptor(objectPrototype, 'id'))) {
			Object.defineProperty(object, 'id', {
				get() {
					return this.__container__.getSync(AIR_ENTITY_UTILS).encodeId(this)
				},
				set(
					idString: string
				) {
					this.__container__.getSync(AIR_ENTITY_UTILS).setId(idString, this)
				}
			});
		}
		if (!object.isNew
			&& !Object.getOwnPropertyDescriptor(object, 'isNew')
			&& (!objectPrototype
				|| !Object.getOwnPropertyDescriptor(objectPrototype, 'isNew'))) {
			Object.defineProperty(object, 'isNew', {
				get() {
					return !!this._actorRecordId
				}
			});
		}
		if (!object.createdBy
			&& !Object.getOwnPropertyDescriptor(object, 'createdBy')
			&& (!objectPrototype
				|| !Object.getOwnPropertyDescriptor(objectPrototype, 'createdBy'))) {
			Object.defineProperty(object, 'createdBy', {
				get() {
					return this.actor.userAccount
				}
			});
		}
	}

}
