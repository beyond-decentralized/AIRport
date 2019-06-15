import {
	IAirportDatabase,
	ISchemaUtils,
	objectExists,
	ReferencedColumnData
} from '@airport/air-control'
import {
	DbEntity,
	SQLDataType
} from '@airport/ground-control'
import {
	AbstractObjectResultParser,
	IEntityResultParser
} from './entity/IEntityResultParser'

/**
 * Created by Papa on 10/16/2016.
 */

/**
 * The goal of this parser is to split a flat row of result set cells into an facade
 * graph (just for that row).
 */
export class PlainResultParser
	extends AbstractObjectResultParser
	implements IEntityResultParser {

	addEntity(
		entityAlias: string,
		dbEntity: DbEntity,
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils
	): any {
		return schemaUtils.getNewEntity(dbEntity, airDb)
	}

	addProperty(
		entityAlias: string,
		resultObject: any,
		dataType: SQLDataType,
		propertyName: string,
		propertyValue: any
	): boolean {
		resultObject[propertyName] = propertyValue
		return objectExists(propertyValue)
	}

	bufferManyToOneStub(
		entityAlias: string,
		dbEntity: DbEntity,
		resultObject: any,
		propertyName: string,
		relationDbEntity: DbEntity,
		relationInfos: ReferencedColumnData[],
		schemaUtils: ISchemaUtils
	): void {
		this.addManyToOneStub(
			resultObject, propertyName, relationInfos, schemaUtils)
	}

	bufferManyToOneObject(
		entityAlias: string,
		dbEntity: DbEntity,
		resultObject: any,
		propertyName: string,
		relationDbEntity: DbEntity,
		childResultObject: any
	): any {
		resultObject[propertyName] = childResultObject
	}

	bufferBlankManyToOneStub(
		entityAlias: string,
		resultObject: any,
		propertyName: string,
		relationInfos: ReferencedColumnData[]
	): void {
		resultObject[propertyName] = null
		// Nothing to do the facade simply doesn't have anything in it
	}

	bufferBlankManyToOneObject(
		entityAlias: string,
		resultObject: any,
		propertyName: string,
	): void {
		resultObject[propertyName] = null
		// Nothing to do the facade simply doesn't have anything in it
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
		resultObject[propertyName] = [childResultObject]
	}

	bufferBlankOneToMany(
		entityAlias: string,
		resultObject: any,
		otmEntityName: string,
		propertyName: string,
		relationDbEntity: DbEntity,
	): void {
		resultObject[propertyName] = []
	}

	flushEntity(
		entityAlias: string,
		dbEntity: DbEntity,
		selectClauseFragment: any,
		entityId: any,
		resultObject: any
	): any {
		// Nothing to be done, plain objects don't need to be flushed since they don't relate
		// do any other rows
		return resultObject
	}

	flushRow(): void {
		// Nothing to be done, plain rows don't need to be flushed since they don't relate do
		// any other rows
	}

	bridge(
		parsedResults: any[],
		selectClauseFragment: any
	): any[] {
		// Nothing to be done, plain queries are not bridged
		return parsedResults
	}
}
