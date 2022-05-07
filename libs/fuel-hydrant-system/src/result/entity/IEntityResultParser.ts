import {
	IApplicationUtils,
	IUtils,
	MappedEntityArray,
	ReferencedColumnData
} from '@airport/air-traffic-control'
import {
	DbEntity,
	IEntityStateManager,
	SQLDataType
} from '@airport/ground-control'
import { IFuelHydrantContext } from '../../FuelHydrantContext'

/**
 * Created by Papa on 10/16/2016.
 */

export class GraphQueryConfiguration {
	// This is for conflicts on OneToMany references
	strict: boolean = true
	mapped: boolean = true
	// Always fail on no ID - bridged entities must have IDs
	// failOnNoId: boolean = true;
	// Assume there are no conflicts on ManyToOneReferences
	//failOnManyToOneConflicts: boolean = true;
}

export interface IEntityResultParser {

	addEntity(
		entityAlias: string,
		dbEntity: DbEntity,
		context: IFuelHydrantContext,
	): any;

	addProperty(
		entityAlias: string,
		resultObject: any,
		dataType: SQLDataType,
		propertyName: string,
		propertyValue: any
	): boolean;

	bufferManyToOneStub(
		entityAlias: string,
		dbEntity: DbEntity,
		resultObject: any,
		propertyName: string,
		relationDbEntity: DbEntity,
		relationInfos: ReferencedColumnData[],
		context: IFuelHydrantContext,
	): void;

	bufferBlankManyToOneStub(
		entityAlias: string,
		resultObject: any,
		propertyName: string,
		relationInfos: ReferencedColumnData[]
	): void;

	bufferManyToOneObject(
		entityAlias: string,
		dbEntity: DbEntity,
		resultObject: any,
		propertyName: string,
		relationDbEntity: DbEntity,
		relatedEntityId: any,
		context: IFuelHydrantContext,
	): void;

	bufferBlankManyToOneObject(
		entityAlias: string,
		resultObject: any,
		propertyName: string,
	): void;

	bufferOneToManyStub(
		otmDbEntity: DbEntity,
		otmPropertyName: string
	): void;

	bufferOneToManyCollection(
		entityAlias: string,
		resultObject: any,
		otmDbEntity: DbEntity,
		propertyName: string,
		relationDbEntity: DbEntity,
		childResultObject: any,
		context: IFuelHydrantContext,
	): void;

	bufferBlankOneToMany(
		entityAlias: string,
		resultObject: any,
		otmEntityName: string,
		propertyName: string,
		relationDbEntity: DbEntity,
		context: IFuelHydrantContext,
	): void;

	flushEntity(
		entityAlias: string,
		dbEntity: DbEntity,
		selectClauseFragment: any,
		idValue: any,
		resultObject: any,
		context: IFuelHydrantContext,
	): any;

	flushRow(): void;

	bridge(
		parsedResults: any[],
		selectClauseFragment: any,
		context: IFuelHydrantContext,
	): any[] | MappedEntityArray<any>;

}

export abstract class AbstractObjectResultParser {

	constructor(
		protected applicationUtils: IApplicationUtils,
		protected entityStateManager: IEntityStateManager,
		protected utils: IUtils
	) {
	}

	protected addManyToOneStub(
		resultObject: any,
		propertyName: string,
		relationInfos: ReferencedColumnData[],
		context: IFuelHydrantContext,
	): boolean {
		let manyToOneStub = {}
		this.entityStateManager.isStub(manyToOneStub)
		resultObject[propertyName] = manyToOneStub
		let haveAllIds = true
		relationInfos.forEach((relationInfo) => {
			if (this.applicationUtils.isIdEmpty(relationInfo.value)) {
				haveAllIds = false
				return
			}
			let lastObject
			let currentObject = manyToOneStub
			let currentIndex = 1
			const propertyNameChain = relationInfo.propertyNameChains[0]
			while (currentIndex < propertyNameChain.length) {
				// If there is no object in context, create one
				if (!currentObject) {
					currentObject = {}
					this.entityStateManager.markAsStub(currentObject)
					lastObject[propertyNameChain[currentIndex - 1]] = currentObject
				}
				// If it's not a leaf (more objects in the chain exist)
				if (currentIndex < propertyNameChain.length - 1) {
					lastObject = currentObject
					currentObject = lastObject[propertyNameChain[currentIndex]]
				} else {
					// Otherwise, just assign the value
					currentObject[propertyNameChain[currentIndex]] = relationInfo.value
				}
				currentIndex++
			}
		})

		return haveAllIds
	}

}
