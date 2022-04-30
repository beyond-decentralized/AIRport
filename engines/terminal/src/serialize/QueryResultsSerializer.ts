import { IApplicationUtils } from '@airport/air-control'
import {
	Injected
} from '@airport/direction-indicator'
import {
	IQueryResultsSerializer
} from '@airport/check-in'
import {
	DbEntity,
	EntityState,
	IEntityStateManager,
	SQLDataType
} from '@airport/ground-control'

interface ISerializableOperation {
	lookupTable: any[]
	sequence: number
	stubLookupTable: any[]
}

// TODO: figure out if this is needed - originally written for serializing
// query resuts returned to the client.  Since then moved to Isolates and
// generic API calls.  Probably should be used in go-tower to serialize
// the values returned (and won't be tied to a query of any kind, API
// interface is generic, unless already known to contain entity objects.)
@Injected()
export class QueryResultsSerializer
	implements IQueryResultsSerializer {

	serialize<E, T = E | E[]>(
		entity: T,
		dbEntity: DbEntity,
		entityStateManager: IEntityStateManager,
		applicationUtils: IApplicationUtils,
	): T {
		const operation: ISerializableOperation = {
			lookupTable: [],
			sequence: 0,
			stubLookupTable: []
		}
		let serializedEntity
		if (entity instanceof Array) {
			serializedEntity = <any><E[]>entity.map(anEntity => this.doSerialize(
				anEntity, dbEntity, operation, entityStateManager, applicationUtils))
		} else {
			serializedEntity = this.doSerialize(
				entity, dbEntity, operation, entityStateManager, applicationUtils)
		}

		for (let i = 1; i < operation.lookupTable.length; i++) {
			delete operation.lookupTable[i][entityStateManager.getUniqueIdFieldName()]
		}

		return serializedEntity
	}

	private doSerialize<E>(
		entity: E,
		dbEntity: DbEntity,
		operation: ISerializableOperation,
		entityStateManager: IEntityStateManager,
		applicationUtils: IApplicationUtils,
	): E {
		// TODO: add support for non-create operations
		let operationUniqueId = entityStateManager.getOperationUniqueId(entity)
		if (operationUniqueId) {
			return operation.stubLookupTable[operationUniqueId]
		}
		operationUniqueId = ++operation.sequence
		let entityStub = {}
		entityStub[entityStateManager.getUniqueIdFieldName()] = operationUniqueId
		entityStub[entityStateManager.getStateFieldName()] = EntityState.STUB
		operation.stubLookupTable[operationUniqueId] = entityStub

		let entityCopy: any = {}
		operation.lookupTable[operationUniqueId] = entity
		entityCopy[entityStateManager.getUniqueIdFieldName()] = operationUniqueId
		
		// TODO: Test this - used to be assigned to EntitState.RESULT, which is removed
		entityCopy[entityStateManager.getStateFieldName()]
			= entity[entityStateManager.getStateFieldName()]


		for (const dbProperty of dbEntity.properties) {
			let property = entity[dbProperty.name]
			if (applicationUtils.isEmpty(property)) {
				continue
			}

			let propertyCopy
			if (dbProperty.relation) {
				const dbRelation = dbProperty.relation[0]
				if (property instanceof Array) {
					propertyCopy = property.map(manyObject => {
						this.doSerialize(manyObject, dbRelation.relationEntity,
							operation, entityStateManager, applicationUtils)
					})
				} else {
					propertyCopy = this.doSerialize(property, dbRelation.relationEntity,
						operation, entityStateManager, applicationUtils)
				}
			} else {
				switch (dbProperty.propertyColumns[0].column.type) {
					case SQLDataType.JSON:
						// 	if (property instanceof Array) {
						// 		propertyCopy = {
						// 			value: property
						// 		}
						// 		propertyCopy[entityStateManager.getStateFieldName()]
						// 			= EntityState.RESULT_JSON_ARRAY
						// 	} else {
						// 		propertyCopy = property
						// 		propertyCopy[entityStateManager.getStateFieldName()]
						// 			= EntityState.RESULT_JSON
						// 	}
						throw new Error(`@Json() properties cannot be serialized.`)
						break;
					case SQLDataType.DATE:
						propertyCopy = {
							value: property.toISOString()
						}
						propertyCopy[entityStateManager.getStateFieldName()]
							= EntityState.DATE
						break;
					case SQLDataType.ANY:
					case SQLDataType.BOOLEAN:
					case SQLDataType.NUMBER:
					case SQLDataType.STRING:
						propertyCopy = property
						break;
					default:
						throw new Error(`Unsupported data type for property ${dbEntity.applicationVersion.application.name}.${dbEntity.name}.${dbProperty.name}`)
				}
			}
			entityCopy[dbProperty.name] = propertyCopy
		}

		return entityCopy
	}

}
