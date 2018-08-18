import {IUtils}   from '@airport/air-control'
import {DbEntity} from '@airport/ground-control'

/**
 * Created by Papa on 10/15/2016.
 */
export interface ManyToOneStubReference {
	mtoDbEntity: DbEntity;
	mtoParentObject: any;
	mtoRelationField: string;
	otmEntityField: string;
	otmEntityId: string | number;
	otmDbEntity: DbEntity;
}

// For MtO mapping in bridged queries
export class GraphMtoMapper {

	// Map of all objects that have a given MtO reference
	// [] MtO reference Schema Entity Index
	// [] MtO reference Entity Index
	mtoStubReferenceMap: {
		// Id of MtO reference facade
		[mtoEntityId: string]: {
			// Name of the MtO property
			[mtoPropertyName: string]: // The stub reference
				ManyToOneStubReference
		}
	}[][] = []

	constructor(
		private utils: IUtils,
	) {
	}

	addMtoReference(
		mtoStubReference: ManyToOneStubReference,
		mtoEntityIdValue: string
	) {
		const mtoDbEntity = mtoStubReference.mtoDbEntity
		let mtoEntitiesForTypeMap: {
			[mtoEntityId: string]: { [mtoPropertyName: string]: ManyToOneStubReference }
		}                 = this.utils.ensureChildMap(
			this.utils.ensureChildArray(this.mtoStubReferenceMap, mtoDbEntity.schemaVersion.schema.index),
			mtoDbEntity.index
		)
		let mtosForEntity = this.utils.ensureChildMap(mtoEntitiesForTypeMap, mtoEntityIdValue)

		mtosForEntity[mtoStubReference.mtoRelationField] = mtoStubReference
	}

	populateMtos(
		entityMap: { [entityId: string]: any }[][]
	) {
		for (const schemaIndex in this.mtoStubReferenceMap) {
			const mtoEntitiesForSchemaMap = this.mtoStubReferenceMap[schemaIndex]
			for (const entityIndex in mtoEntitiesForSchemaMap) {
				const mtoEntitiesForTypeMap = mtoEntitiesForSchemaMap[entityIndex]

				for (let mtoEntityId in mtoEntitiesForTypeMap) {
					let mtosForEntity = mtoEntitiesForTypeMap[mtoEntityId]
					for (let mtoPropertyName in mtosForEntity) {
						let mtoStubReference: ManyToOneStubReference = mtosForEntity[mtoPropertyName]
						let otmEntitiesForTypeMap                    = entityMap[schemaIndex][entityIndex]
						if (!otmEntitiesForTypeMap) {
							continue
						}
						let otmEntity = otmEntitiesForTypeMap[mtoStubReference.otmEntityId]
						if (!otmEntity) {
							continue
						}
						mtoStubReference.mtoParentObject[mtoStubReference.mtoRelationField] = otmEntity
					}
				}
			}
		}
	}

}
