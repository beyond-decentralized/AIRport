import {ReferencedColumnData} from '@airport/air-control'
import {
	DbEntity,
	SQLDataType
}                             from '@airport/ground-control'
import {
	AbstractObjectResultParser,
	IEntityResultParser
}                             from './entity/IEntityResultParser'

/**
 * Created by Papa on 10/16/2016.
 */

export class FlattenedResultParser
	extends AbstractObjectResultParser
	implements IEntityResultParser {

	currentResultRow: any[] = []

	addEntity(
		entityAlias: string,
		dbEntity: DbEntity
	): any {
		return this.currentResultRow
	}

	addProperty(
		entityAlias: string,
		resultObject: any,
		dataType: SQLDataType,
		propertyName: string,
		propertyValue: any
	): boolean {
		resultObject.push(propertyValue)
		return this.utils.objectExists(propertyValue)
	}

	bufferManyToOneStub(
		entityAlias: string,
		dbEntity: DbEntity,
		resultObject: any,
		propertyName: string,
		relationDbEntity: DbEntity,
		relationInfos: ReferencedColumnData[]
	): void {
		this.addManyToOneStub(resultObject, propertyName, relationInfos)
	}

	bufferBlankManyToOneStub(
		entityAlias: string,
		resultObject: any,
		propertyName: string,
		relationInfos: ReferencedColumnData[]
	): void {
		relationInfos.forEach((relationInfo) => {
			resultObject.push(null)
		})
	}

	bufferManyToOneObject(
		entityAlias: string,
		dbEntity: DbEntity,
		resultObject: any,
		propertyName: string,
		relationDbEntity: DbEntity,
		childResultObject: any
	): any {
		// Nothing to do, we are working with a flat result array
	}

	bufferBlankManyToOneObject(
		entityAlias: string,
		resultObject: any,
		propertyName: string,
	): void {
		// Nothing to do, we are working with a flat result array
	}

	bufferOneToManyStub(
		otmDbEntity: DbEntity,
		otmPropertyName: string
	): void {
		throw `@OneToMany stubs not allowed in QueryResultType.PLAIN`
	}

	bufferOneToManyCollection(
		entityAlias: string,
		resultObject: any,
		otmDbEntity: DbEntity,
		propertyName: string,
		relationDbEntity: DbEntity,
		childResultObject: any
	): void {
		// Nothing to do, we are working with a flat result array
	}

	bufferBlankOneToMany(
		entityAlias: string,
		resultObject: any,
		otmEntityName: string,
		propertyName: string,
		relationDbEntity: DbEntity,
	): void {
		// Nothing to do, we are working with a flat result array
	}

	flushEntity(
		entityAlias: string,
		dbEntity: DbEntity,
		selectClauseFragment: any,
		entityId: any,
		resultObject: any
	): any {
		// Nothing to do, we are working with a flat result array
		return resultObject
	}

	flushRow(): void {
		this.currentResultRow = []
	}

	bridge(
		parsedResults: any[],
		selectClauseFragment: any
	): any[] {
		// No bridging needed for ENTITY_FLATTENED Object queries
		return parsedResults

	}

}