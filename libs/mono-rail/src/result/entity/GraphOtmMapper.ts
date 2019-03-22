import {
	DbEntity,
	IUtils,
	MappedEntityArray,
	newMappedEntityArray
}                               from '@airport/air-control'
import {ManyToOneStubReference} from './GraphMtoMapper'

/**
 * Created by Papa on 10/15/2016.
 */

export interface OneToManyStubReference {
	otmDbEntity: DbEntity;
	otmPropertyName: string;
	otmObject: any;
}

// For OtM mapping in bridged queries
export class GraphOtmMapper {
	// Map of MtO referred objects by OtM references
	// [] OTM Reference Entity Schema Index
	// [] OTM Reference Entity Index
	mtoEntityReferenceMap: {
		// Id of OTM reference facade
		[otmReferenceId: string]: {
			// Name of the property of OtM reference
			[otmProperty: string]: MappedEntityArray<any>
		}
	}[][] = []

	// Map of objects with OtM references by
	// [] OtM reference Schema Entity Index
	// [] OtM reference Entity Index
	otmEntityReferenceMap: {
		// Id of facade with OtM reference
		[otmEntityId: string]: any
	}[][] = []

	constructor(
		private utils: IUtils
	) {
	}

	addMtoReference(
		mtoStubReference: ManyToOneStubReference,
		mtoEntityId: string | number,
		dbEntity: DbEntity
	): void {
		// If the @OneToMany({ mappedBy: ... }) is missing, there is nothing to map to
		if (!mtoStubReference.otmEntityField) {
			return
		}
		// Add into mtoEntityReferenceMap
		const otmDbEntity = mtoStubReference.otmDbEntity
		let mtoEntityReferenceMapForEntity: {
			[otmReferenceId: string]: { [otmProperty: string]: MappedEntityArray<any> }
		}                 = this.utils.ensureChildMap(
			this.utils.ensureChildArray(this.mtoEntityReferenceMap, otmDbEntity.schema.index),
			otmDbEntity.index
		)

		let mapForOtmEntity: { [otmProperty: string]: MappedEntityArray<any> } = mtoEntityReferenceMapForEntity[mtoStubReference.otmEntityId]
		if (!mapForOtmEntity) {
			mapForOtmEntity                                              = {}
			mtoEntityReferenceMapForEntity[mtoStubReference.otmEntityId] = mapForOtmEntity
		}
		let mtoCollection: MappedEntityArray<any> = mapForOtmEntity[mtoStubReference.otmEntityField]
		if (!mtoCollection) {
			mtoCollection                                    = newMappedEntityArray<any>(this.utils, dbEntity)
			mapForOtmEntity[mtoStubReference.otmEntityField] = mtoCollection
		}

		mtoCollection.put(mtoStubReference.mtoParentObject)
	}

	addOtmReference(
		otmStubReference: OneToManyStubReference,
		otmEntityIdValue: string
	): void {
		// Add into otoEntityReferenceMap
		const otmDbEntity = otmStubReference.otmDbEntity
		let mtoEntityReferenceMapForEntity: {
			[otmEntityId: string]: any
		}                 = this.utils.ensureChildMap(
			this.utils.ensureChildArray(this.otmEntityReferenceMap, otmDbEntity.schema.index),
			otmDbEntity.index
		)

		let otmRecordByPropertyName = mtoEntityReferenceMapForEntity[otmEntityIdValue]
		if (!otmRecordByPropertyName) {
			otmRecordByPropertyName                          = {}
			mtoEntityReferenceMapForEntity[otmEntityIdValue] = otmRecordByPropertyName
		}

		otmRecordByPropertyName[otmStubReference.otmPropertyName] = otmStubReference.otmObject
	}

	populateOtms(
		entityMap: { [entityId: string]: any }[][],
		keepMappedEntityArrays: boolean
	) {
		for (const schemaIndex in this.mtoEntityReferenceMap) {
			const mtoEntityReferenceMapForSchema = this.mtoEntityReferenceMap[schemaIndex]
			for (const entityIndex in mtoEntityReferenceMapForSchema) {
				const mtoEntityReferenceMapForEntity = mtoEntityReferenceMapForSchema[entityIndex]

				let entityOfTypeMap = entityMap[schemaIndex][entityIndex]
				// If there are no entities of this type in query results, just keep the stubs
				if (!entityOfTypeMap) {
					continue
				}
				let entityWithOtmMap: { [otmEntityId: string]: any } = this.otmEntityReferenceMap[schemaIndex][entityIndex]
				// If there are no OTM for this type in query results, no mapping needs to happen
				if (!entityWithOtmMap) {
					continue
				}
				for (let otmEntityId in mtoEntityReferenceMapForEntity) {
					let referencedEntitiesByPropertyMap: { [otmProperty: string]: MappedEntityArray<any> } = mtoEntityReferenceMapForEntity[otmEntityId]
					let otmRecordByPropertyName                                                            = entityWithOtmMap[otmEntityId]
					// If there are no OtMs for this entity, no mapping needs to happen
					if (!otmRecordByPropertyName) {
						continue
					}
					for (let otmProperty in referencedEntitiesByPropertyMap) {
						let otmEntity = otmRecordByPropertyName[otmProperty]
						// If OtM entity doesn't have this collection, no mapping needs to happen
						if (!otmEntity) {
							continue
						}
						let referencedEntityMap: MappedEntityArray<any> = referencedEntitiesByPropertyMap[otmProperty]

						let otmCollection: MappedEntityArray<any> = otmEntity[otmProperty]
						// If @OneToMany isn't set yet
						if (!otmCollection) {
							otmEntity[otmProperty] = referencedEntityMap
						} else {
							otmCollection.putAll(referencedEntityMap)
						}
						if (!keepMappedEntityArrays) {
							otmRecordByPropertyName[otmProperty] = otmEntity[otmProperty].slice()
						}
					}
				}
			}
		}
	}
}