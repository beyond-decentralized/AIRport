import {
	IUtils,
} from '@airport/air-traffic-control'
import {
	DbEntity,
	EntityRelationType,
	IApplicationUtils,
	IDatastructureUtils,
	IEntityStateManager,
	SQLDataType
} from '@airport/ground-control'
import {
	IQueryUtils,
	ReferencedColumnData
} from '@airport/tarmaq-query'
import { IFuelHydrantContext } from '../../FuelHydrantContext'
import {
	GraphMtoMapper,
	ManyToOneStubReference
} from './GraphMtoMapper'
import {
	GraphOtmMapper,
	OneToManyStubReference
} from './GraphOtmMapper'
import {
	AbstractObjectResultParser,
	GraphQueryConfiguration,
	IEntityResultParser
} from './IEntityResultParser'

/**
 * Created by Papa on 10/16/2016.
 */

/**
 * The goal of this parser to to bridge all entity references and arrive at an
 * inter-connected graph (where possible).
 */
export class EntityGraphResultParser
	extends AbstractObjectResultParser
	implements IEntityResultParser {

	// Keys can only be strings or numbers | TODO: change to JS Maps, if needed
	entityMapByApplicationAndTableIndexes: { [entityId: string]: any }[][] = []

	otmMapper: GraphOtmMapper
	mtoMapper: GraphMtoMapper

	// One-To-Many & MtO temp stubs (before entityId is available)
	otmStubBuffer: OneToManyStubReference[] = []
	mtoStubBuffer: ManyToOneStubReference[] = []

	// Used in ENTITY_FLATTENED queries
	currentResultRow: any[] = []

	constructor(
		private config: GraphQueryConfiguration,
		private datastructureUtils: IDatastructureUtils,
		private rootDbEntity: DbEntity,
		applicationUtils: IApplicationUtils,
		private queryUtils: IQueryUtils,
		entityStateManager: IEntityStateManager,
		utils: IUtils,
	) {
		super(applicationUtils, entityStateManager, utils)
		this.otmMapper = new globalThis.GraphOtmMapper(datastructureUtils)
		this.mtoMapper = new globalThis.GraphMtoMapper(datastructureUtils)
	}

	addEntity(
		entityAlias: string,
		dbEntity: DbEntity,
		context: IFuelHydrantContext,
	): any {
		return this.applicationUtils.getNewEntity(dbEntity)
	}

	addProperty(
		entityAlias: string,
		resultObject: any,
		dataType: SQLDataType,
		propertyName: string,
		propertyValue: any
	): boolean {
		resultObject[propertyName] = propertyValue
		return this.utils.objectExists(propertyValue)
	}

	bufferManyToOneStub(
		entityAlias: string,
		dbEntity: DbEntity,
		resultObject: any,
		propertyName: string,
		relationDbEntity: DbEntity,
		relationInfos: ReferencedColumnData[],
		context: IFuelHydrantContext,
	): void {
		const oneToManyStubAdded = this.addManyToOneStub(
			resultObject, propertyName, relationInfos, context)
		if (oneToManyStubAdded) {
			const relatedEntityId = this.queryUtils.getIdKey(resultObject[propertyName], relationDbEntity)
			this.bufferManyToOne(dbEntity, propertyName, relationDbEntity, relatedEntityId)
		}
	}

	bufferBlankManyToOneStub(
		entityAlias: string,
		resultObject: any,
		propertyName: string,
	): void {
		resultObject[propertyName] = null
		// Nothing to do for bridged parser - bridging will map blanks, where possible
	}

	bufferManyToOneObject(
		entityAlias: string,
		dbEntity: DbEntity,
		resultObject: any,
		propertyName: string,
		relationDbEntity: DbEntity,
		childResultObject: any,
		context: IFuelHydrantContext,
	): any {
		resultObject[propertyName] = childResultObject
		const relatedEntityId = this.queryUtils.getIdKey(resultObject[propertyName], relationDbEntity)
		this.bufferManyToOne(dbEntity, propertyName, relationDbEntity, relatedEntityId)
	}

	bufferBlankManyToOneObject(
		entityAlias: string,
		resultObject: any,
		propertyName: string,
	): void {
		resultObject[propertyName] = null
		// Nothing to do for bridged parser - bridging will map blanks, where possible
	}

	bufferOneToManyStub(
		otmDbEntity: DbEntity,
		otmPropertyName: string
	): void {
		this.bufferOneToMany(otmDbEntity, otmPropertyName)
	}

	bufferOneToManyCollection(
		entityAlias: string,
		resultObject: any,
		otmDbEntity: DbEntity,
		propertyName: string,
		relationDbEntity: DbEntity,
		childResultObject: any,
		context: IFuelHydrantContext,
	): void {
		this.bufferOneToMany(otmDbEntity, propertyName)
		resultObject[propertyName] = [childResultObject]
	}

	bufferBlankOneToMany(
		entityAlias: string,
		resultObject: any,
		otmEntityName: string,
		propertyName: string,
		relationDbEntity: DbEntity,
		context: IFuelHydrantContext,
	): void {
		resultObject[propertyName] = []
	}

	flushEntity(
		entityAlias: string,
		dbEntity: DbEntity,
		selectClauseFragment: any,
		entityIdValue: string,
		resultObject: any,
		context: IFuelHydrantContext,
	): any {
		if (!entityIdValue) {
			throw new Error(`No Id provided for entity 
			'${dbEntity.applicationVersion.application.name}.${dbEntity.name}'`)
		}
		let currentEntity = this.getEntityToFlush(
			dbEntity, selectClauseFragment, entityIdValue, resultObject, context)
		this.flushRelationStubBuffers(
			entityIdValue, currentEntity, dbEntity, context)

		return currentEntity
	}

	flushRow(): void {
		// Nothing to do, bridged queries don't rely on rows changing
	}

	bridge(
		parsedResults: any[],
		selectClauseFragment: any,
		context: IFuelHydrantContext,
	): any[] {
		this.mtoMapper.populateMtos(this.entityMapByApplicationAndTableIndexes)
		this.otmMapper.populateOtms(this.entityMapByApplicationAndTableIndexes)

		// merge any out of order entity references (there shouldn't be any)

		return parsedResults
	}

	private bufferManyToOne(
		dbEntity: DbEntity,
		propertyName: string,
		relationDbEntity: DbEntity,
		relatedEntityId: any
	): void {
		let otmEntityField: string
		for (const dbRelation of relationDbEntity.relations) {
			switch (dbRelation.relationType) {
				case EntityRelationType.ONE_TO_MANY:
					break
				case EntityRelationType.MANY_TO_ONE:
					continue
				default:
					throw new Error(`Unknown EntityRelationType: ${dbRelation.relationType}`)
			}
			if (dbRelation.oneToManyElems && dbRelation.oneToManyElems.mappedBy) {
				if (dbEntity._localId === dbRelation.relationEntity._localId
					|| dbRelation.oneToManyElems.mappedBy === propertyName) {
					otmEntityField = dbRelation.property.name
				}
			}
		}

		this.mtoStubBuffer.push({
			otmEntityId: relatedEntityId,
			otmDbEntity: relationDbEntity,
			otmEntityField: otmEntityField,
			mtoDbEntity: dbEntity,
			mtoRelationField: propertyName,
			mtoParentObject: null
		})
	}

	private bufferOneToMany(
		otmDbEntity: DbEntity,
		otmPropertyName: string
	): void {
		this.otmStubBuffer.push({
			otmDbEntity: otmDbEntity,
			otmPropertyName: otmPropertyName,
			otmObject: null
		})
	}

	private getEntityToFlush(
		dbEntity: DbEntity,
		selectClauseFragment: any,
		idValue: string,
		resultObject: any,
		context: IFuelHydrantContext,
	): any {
		if (!idValue) {
			throw new Error(`Entity ID not specified for entity 
			'${dbEntity.applicationVersion.application.name}.${dbEntity.name}'.`)
		}
		let entityMapForName: {
			[entityId: string]: any
		} = this.datastructureUtils.ensureChildMap(
			this.datastructureUtils.ensureChildArray(this.entityMapByApplicationAndTableIndexes, dbEntity.applicationVersion.application.index),
			dbEntity.index
		)

		let existingEntity = entityMapForName[idValue]
		let currentEntity = this.mergeEntities(
			existingEntity, resultObject, dbEntity, selectClauseFragment, context)
		entityMapForName[idValue] = currentEntity

		return currentEntity
	}

	// Must merge the one-to-many relationships returned as part of the result tree
	/**
	 * Merge entities with of the same class and with the same Id
	 *
	 * @param source
	 * @param target
	 * @param qEntity
	 * @param selectClauseFragment
	 * @param entityPropertyTypeMap
	 * @param entityRelationMap
	 * @returns {any}
	 */
	private mergeEntities(
		source: any,
		target: any,
		dbEntity: DbEntity,
		selectClauseFragment: any,
		context: IFuelHydrantContext,
	): any {
		if (!source || target === source) {
			return target
		}
		const id = this.queryUtils.getIdKey(target, dbEntity)

		for (let propertyName in selectClauseFragment) {
			if (selectClauseFragment[propertyName] === undefined) {
				continue
			}
			const dbProperty = dbEntity.propertyMap[propertyName]
			// Merge properties (conflicts detected at query parsing time):
			if (!dbProperty.relation || !dbProperty.relation.length) {
				// If source property doesn't exist
				if (this.applicationUtils.isEmpty(source[propertyName])) {
					// set the source property to value of target
					source[propertyName] = target[propertyName]
				}
				// Else if target property doesn't exist, keep the source value
				// Else, assume that properties must be the same
			}
			// Merge relations
			else {
				const childSelectClauseFragment = selectClauseFragment[propertyName]
				// For stubs (conflicts detected at query parsing time)
				if (childSelectClauseFragment == null) {
					// For Many-to-One stubs, assume they are are the same and don't detect
					// conflicts, just merge
					source[propertyName] = target[propertyName]
					// Don't process One-to-Many stubs yet (not all related MTOs may have been
					// collected).
				}
				// For actual objects
				else {
					const dbRelation = dbProperty.relation[0]
					const childDbEntity = dbRelation.relationEntity
					switch (dbRelation.relationType) {
						case EntityRelationType.MANY_TO_ONE:
							// Many-to-One (conflicts detected at query parsing time)
							// If source is missing this mapping and target has it
							if (source[propertyName] === undefined && target[propertyName] !== undefined) {
								// set the source property to value of target
								source[propertyName] = target[propertyName]
							}
							// Else if target property doesn't exist, keep the source value
							// Assume that the child objects have already been merged themselves and
							// don't process
							break
						case EntityRelationType.ONE_TO_MANY:
							let sourceArray = source[propertyName]
							const targetArray = target[propertyName]
							// Because parseQueryResult is depth-first, all child objects have already
							// been processed

							// TODO: this will probably fail, since the merged in array should always
							// have only one entity in it because it is created for a single result set
							// row.
							if (this.config && this.config.strict) {
								if ((!sourceArray && targetArray)
									|| (!targetArray && sourceArray)
									|| sourceArray.length != targetArray.length) {
									throw new Error(`One-to-Many child arrays don't match for 
									'${dbEntity.name}.${dbProperty.name}', Id: ${id}`)
								}
							}
							const sourceSet: { [id: string]: any } = {}
							if (sourceArray) {
								sourceArray.forEach((sourceChild) => {
									const sourceChildIdValue = this.queryUtils.getIdKey(sourceChild, childDbEntity)
									sourceSet[sourceChildIdValue] = sourceChild
								})
							} else {
								sourceArray = []
								source[propertyName] = sourceArray
							}
							if (targetArray) {
								targetArray.forEach((targetChild) => {
									const targetChildIdValue = this.queryUtils.getIdKey(targetChild, childDbEntity)
									if (this.config && this.config.strict && !sourceSet[targetChildIdValue]) {
										throw new Error(`One-to-Many child arrays don't match for 
										'${dbEntity.name}.${dbProperty.name}', Id: ${id}`)
									}
									// If target child array has a value that source doesn't
									if (!sourceSet[targetChildIdValue]) {
										// add it to source (preserve order)
										sourceArray.push(targetChild)
									}
								})
							}
							// So instead just do
							// for(let targetObject in targetArray) {
							//		sourceArray.push(targetArray)
							//}
							break
						default:
							throw new Error(`Unknown relation type '${dbRelation.relationType}' for 
							'${dbEntity.name}.${dbProperty.name}'`)
					}
				}
			}
		}

		return source
	}

	private flushRelationStubBuffers(
		entityIdValue: string,
		currentEntity: any,
		dbEntity: DbEntity,
		context: IFuelHydrantContext,
	): void {
		let otmStubBuffer = this.otmStubBuffer
		this.otmStubBuffer = []
		otmStubBuffer.forEach((otmStub) => {
			otmStub.otmObject = currentEntity
			this.otmMapper.addOtmReference(otmStub, entityIdValue)
		})
		let mtoStubBuffer = this.mtoStubBuffer
		this.mtoStubBuffer = []
		mtoStubBuffer.forEach((mtoStub) => {
			mtoStub.mtoParentObject = currentEntity
			this.otmMapper.addMtoReference(
				mtoStub, entityIdValue, dbEntity, context)
			this.mtoMapper.addMtoReference(mtoStub, entityIdValue)
		})

	}

}
