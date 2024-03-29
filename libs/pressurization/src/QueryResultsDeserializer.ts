import { IAirEntityUtils } from '@airport/aviation-communication'
import { IInjected, Inject, Injected } from '@airport/direction-indicator'
import {
	ISerializationStateManager,
	SerializationState,
	SerializationStateManager
} from './SerializationStateManager'

/**
 * Deserializer for query results coming back from the server
 */
export interface IQueryResultsDeserializer {

	deserialize<E, T = E | E[]>(
		entity: T,
		operation?: IDeserializableOperation
	): T

	deepCopyProperties<T>(
		from: T,
		to: T,
		fromToMap: Map<T, T>
	): void

	setPropertyDescriptors(
		object: any,
		processecEntities?: Set<any>
	): void

	setPropertyDescriptorsOfAirEntity(
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
		operation: IDeserializableOperation = {
			lookupTable: [],
		}
	): T {
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
				propertyCopy = this.deserialize(property, operation)
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
		to: T,
		fromToMap: Map<T, T>
	): void {
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
			this.copyObject(from, propertyName, to, fromToMap)
		}
		for (let propertyName in to) {
			if (!to.hasOwnProperty(propertyName)) {
				continue
			}
			if (!from.hasOwnProperty(propertyName)) {
				delete to[propertyName]
			}
		}
		this.setPropertyDescriptorsOfAirEntity(to)
	}

	copyObject<T>(
		fromParent: T,
		key: string | number,
		toParent: T,
		fromToMap: Map<T, T>
	) {
		let from = fromParent[key]
		let to = toParent[key]
		let alreadyProcessedTo = fromToMap.get(from)
		if (alreadyProcessedTo) {
			toParent[key] = alreadyProcessedTo
			return
		}
		if (from instanceof Object) {
			if (from instanceof Array) {
				if (!to || !(to instanceof Array)) {
					to = []
					toParent[key] = to
				}
				fromToMap.set(from as any, to)
				for (let i = 0; i < from.length; i++) {
					this.copyObject(from, i, to, fromToMap)
				}
			} else if (from instanceof Date) {
				toParent[key] = new Date(from.getTime()) as any
			} else {
				if (!to || !(to instanceof Object) || to instanceof Date || to instanceof Array) {
					to = {}
					toParent[key] = to
				}
				fromToMap.set(from, to)
				this.deepCopyProperties(from, to, fromToMap)
			}
		} else {
			toParent[key] = from
		}
	}

	setPropertyDescriptors(
		object: any,
		processedEntities = new Set()
	): void {
		if (object instanceof Array) {
			for (let i = 0; i < object.length; i++) {
				this.setPropertyDescriptors(object[i], processedEntities)
			}
			return
		}
		if (!(object instanceof Object)) {
			return
		}
		if (object instanceof Date) {
			return
		}
		if (processedEntities.has(object)) {
			return
		}
		processedEntities.add(object)

		for (let propertyName in object) {
			if (!object.hasOwnProperty(propertyName)) {
				continue
			}
			let property = object[propertyName]
			if (propertyName !== SerializationStateManager.ORIGINAL_VALUES_PROPERTY
				&& !(property instanceof Date) && property instanceof Object) {
				this.setPropertyDescriptors(property, processedEntities)
			}
		}
		this.setPropertyDescriptorsOfAirEntity(object)
	}

	setPropertyDescriptorsOfAirEntity(
		object: any
	): void {
		let objectPrototype = Object.getPrototypeOf(object)
		if (!Object.getOwnPropertyDescriptor(object, 'id')
			&& (!objectPrototype
				|| !Object.getOwnPropertyDescriptor(objectPrototype, 'id'))
			&& !object.id) {
			let _this = this as IInjected
			Object.defineProperty(object, 'id', {
				get() {
					let container = _this.__container__
					// In UI mode this.__container__ won't be set since depenceny injection library
					// is not loaded and objects are wired in manually in @airport/autopilot 
					if (!container) {
						container = globalThis.IOC
					}
					return (container.getSync(globalThis.AIR_ENTITY_UTILS) as IAirEntityUtils).encodeId(this)
				},
				set(
					idString: string
				) {
					let container = _this.__container__
					// In UI mode this.__container__ won't be set since depenceny injection library
					// is not loaded and objects are wired in manually in @airport/autopilot 
					if (!container) {
						container = globalThis.IOC
					}
					return (container.getSync(globalThis.AIR_ENTITY_UTILS) as IAirEntityUtils).setId(idString, this)
				}
			});
		}
		if (!Object.getOwnPropertyDescriptor(object, 'isNew')
			&& (!objectPrototype
				|| !Object.getOwnPropertyDescriptor(objectPrototype, 'isNew'))
			&& !object.isNew) {
			Object.defineProperty(object, 'isNew', {
				get() {
					return !!this._actorRecordId
				}
			});
		}
		if (!Object.getOwnPropertyDescriptor(object, 'createdBy')
			&& (!objectPrototype
				|| !Object.getOwnPropertyDescriptor(objectPrototype, 'createdBy'))
			&& !object.createdBy) {
			Object.defineProperty(object, 'createdBy', {
				get() {
					return this.actor.userAccount
				}
			});
		}
	}

}
