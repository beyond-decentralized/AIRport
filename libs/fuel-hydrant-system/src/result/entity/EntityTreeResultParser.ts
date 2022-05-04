import {
	ReferencedColumnData,
	valuesEqual
} from '@airport/air-traffic-control'
import { DbEntity } from '@airport/ground-control'
import { IFuelHydrantContext } from '../../FuelHydrantContext'
import { TreeResultParser } from '../TreeResultParser'
import { IEntityResultParser } from './IEntityResultParser'

/**
 * Created by Papa on 10/16/2016.
 */

/**
 * The goal of this Parser is to determine which objects in the current row are the same
 * as they were in the previous row.  If the objects are the same this parser will merge
 * them.
 */
export class EntityTreeResultParser
	extends TreeResultParser
	implements IEntityResultParser {

	currentRowObjectMap: { [alias: string]: any } = {}
	objectEqualityMap: { [alias: string]: boolean } = {}

	lastRowObjectMap: { [alias: string]: any } = {}

	currentObjectOneToManys: { [propertyName: string]: any[] } = {}

	addEntity(
		entityAlias: string,
		dbEntity: DbEntity,
		context: IFuelHydrantContext,
	): any {
		let resultObject = this.applicationUtils.getNewEntity(
			dbEntity)
		this.currentRowObjectMap[entityAlias] = resultObject
		if (this.objectEqualityMap[entityAlias] !== undefined) {
			this.objectEqualityMap[entityAlias] = true
		}

		return resultObject
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
		this.addManyToOneStub(resultObject, propertyName, relationInfos, context)
		this.addManyToOneReference(entityAlias, resultObject, propertyName)
	}

	bufferBlankManyToOneStub(
		entityAlias: string,
		resultObject: any,
		propertyName: string,
	): void {
		resultObject[propertyName] = null
		this.addManyToOneReference(entityAlias, resultObject, propertyName)
	}

	bufferManyToOneObject(
		entityAlias: string,
		dbEntity: DbEntity,
		resultObject: any,
		propertyName: string,
		relationDbEntity: DbEntity,
		childResultObject: any,
		context: IFuelHydrantContext,
	): void {
		resultObject[propertyName] = childResultObject
		if (this.isDifferentOrDoesntExist(entityAlias, resultObject, propertyName)) {
			return
		}
		// Both last and current objects must exist here
		let lastObject = this.lastRowObjectMap[entityAlias]
		// @ManyToOne objects will have been merged by now, just check if its the same facade
		this.objectEqualityMap[entityAlias] = lastObject[propertyName] === resultObject[propertyName]
	}

	bufferBlankManyToOneObject(
		entityAlias: string,
		resultObject: any,
		propertyName: string,
	): void {
		resultObject[propertyName] = null
		this.addManyToOneReference(entityAlias, null, propertyName)
	}

	bufferOneToManyStub(
		otmDbEntity: DbEntity,
		otmPropertyName: string
	): void {
		throw new Error(
			`@OneToMany stubs not allowed in QueryResultType.HIERARCHICAL`)
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
		resultObject[propertyName] = [childResultObject]
		this.addOneToManyCollection(entityAlias, resultObject, propertyName)
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
		this.addOneToManyCollection(entityAlias, resultObject, propertyName)
	}

	flushEntity(
		entityAlias: string,
		dbEntity: DbEntity,
		selectClauseFragment: any,
		entityId: any,
		resultObject: any,
		context: IFuelHydrantContext,
	): any {
		return this.mergeEntity(entityAlias, resultObject)
	}

	bridge(
		parsedResults: any[],
		selectClauseFragment: any,
		context: IFuelHydrantContext,
	): any[] {
		// Nothing to be done, hierarchical queries are not bridged
		return parsedResults
	}

	private addManyToOneReference(
		entityAlias: string,
		resultObject: any,
		propertyName: string
	): void {
		if (this.isDifferentOrDoesntExist(entityAlias, resultObject, propertyName)) {
			return
		}
		// Both last and current objects must exist here
		let lastMtoStub = this.lastRowObjectMap[entityAlias][propertyName]

		let currentMtoStub = resultObject[propertyName]
		this.objectEqualityMap[entityAlias] = valuesEqual(lastMtoStub, currentMtoStub, true)
	}

}
