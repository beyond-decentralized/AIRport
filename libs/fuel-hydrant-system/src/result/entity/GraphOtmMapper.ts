import {
	DbEntity, IDatastructureUtils
} from '@airport/ground-control'
import { IFuelHydrantContext } from '../../FuelHydrantContext'
import { ManyToOneStubReference } from './GraphMtoMapper'

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
	// [] OTM Reference Entity Application Index
	// [] OTM Reference Entity Index
	mtoEntityReferenceMap: {
		// Id of OTM reference facade
		[otmReferenceId: string]: {
			// Name of the property of OtM reference
			[otmProperty: string]: Array<any>
		}
	}[][] = []

	// Map of objects with OtM references by
	// [] OtM reference Application Entity Index
	// [] OtM reference Entity Index
	otmEntityReferenceMap: {
		// Id of facade with OtM reference
		[otmEntityId: string]: any
	}[][] = []

	constructor(
		private datastructureUtils: IDatastructureUtils
	) {
	}

	addMtoReference(
		mtoStubReference: ManyToOneStubReference,
		mtoEntityId: string | number,
		dbEntity: DbEntity,
		context: IFuelHydrantContext,
	): void {
		// If the @OneToMany({ mappedBy: ... }) is missing, there is nothing to map to
		if (!mtoStubReference.otmEntityField) {
			return
		}
		// Add into mtoEntityReferenceMap
		const otmDbEntity = mtoStubReference.otmDbEntity

		let mtoEntityReferenceMapForEntity: {
			[otmReferenceId: string]: { [otmProperty: string]: Array<any> }
		} = this.datastructureUtils.ensureChildMap(
			this.datastructureUtils.ensureChildArray(
				this.mtoEntityReferenceMap, otmDbEntity.applicationVersion.application.index),
			otmDbEntity.index
		)

		let mapForOtmEntity: { [otmProperty: string]: Array<any> } = mtoEntityReferenceMapForEntity[mtoStubReference.otmEntityId]
		if (!mapForOtmEntity) {
			mapForOtmEntity = {}
			mtoEntityReferenceMapForEntity[mtoStubReference.otmEntityId] = mapForOtmEntity
		}
		let mtoCollection: any[] = mapForOtmEntity[mtoStubReference.otmEntityField]
		if (!mtoCollection) {
			mtoCollection = []
			mapForOtmEntity[mtoStubReference.otmEntityField]
				= mtoCollection
		}

		mtoCollection.push(mtoStubReference.mtoParentObject)
	}

	addOtmReference(
		otmStubReference: OneToManyStubReference,
		otmEntityIdValue: string
	): void {
		// Add into otoEntityReferenceMap
		const otmDbEntity = otmStubReference.otmDbEntity
		let mtoEntityReferenceMapForEntity: {
			[otmEntityId: string]: any
		} = this.datastructureUtils.ensureChildMap(
			this.datastructureUtils.ensureChildArray(
				this.otmEntityReferenceMap, otmDbEntity.applicationVersion.application.index),
			otmDbEntity.index
		)

		let otmRecordByPropertyName = mtoEntityReferenceMapForEntity[otmEntityIdValue]
		if (!otmRecordByPropertyName) {
			otmRecordByPropertyName = {}
			mtoEntityReferenceMapForEntity[otmEntityIdValue] = otmRecordByPropertyName
		}

		otmRecordByPropertyName[otmStubReference.otmPropertyName] = otmStubReference.otmObject
	}

	populateOtms(
		entityMap: { [entityId: string]: any }[][]
	) {
		for (const applicationIndex in this.mtoEntityReferenceMap) {
			const mtoEntityReferenceMapForApplication = this.mtoEntityReferenceMap[applicationIndex]
			for (const entityIndex in mtoEntityReferenceMapForApplication) {
				const mtoEntityReferenceMapForEntity = mtoEntityReferenceMapForApplication[entityIndex]

				// If there are no entities of this type in query results, just keep the stubs
				if (!entityMap[applicationIndex]) {
					continue
				}
				let entityOfTypeMap = entityMap[applicationIndex][entityIndex]
				// If there are no entities of this type in query results, just keep the stubs
				if (!entityOfTypeMap) {
					continue
				}
				// If there are no OTM for this type in query results, no mapping needs to happen
				if (!this.otmEntityReferenceMap[applicationIndex]) {
					continue
				}
				let entityWithOtmMap: { [otmEntityId: string]: any } = this.otmEntityReferenceMap[applicationIndex][entityIndex]
				// If there are no OTM for this type in query results, no mapping needs to happen
				if (!entityWithOtmMap) {
					continue
				}
				for (let otmEntityId in mtoEntityReferenceMapForEntity) {
					let referencedEntitiesByPropertyMap: { [otmProperty: string]: Array<any> } = mtoEntityReferenceMapForEntity[otmEntityId]
					let otmRecordByPropertyName = entityWithOtmMap[otmEntityId]
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
						let referencedEntityArray: Array<any> = referencedEntitiesByPropertyMap[otmProperty]

						let otmCollection: Array<any> = otmEntity[otmProperty]
						// If @OneToMany isn't set yet
						if (!otmCollection) {
							otmEntity[otmProperty] = referencedEntityArray
						} else {
							for (let referencedEntity of referencedEntityArray) {
								otmCollection.push(referencedEntity)
							}
						}
						otmRecordByPropertyName[otmProperty] = otmEntity[otmProperty].slice()
					}
				}
			}
		}
	}
}
globalThis.GraphOtmMapper = GraphOtmMapper
