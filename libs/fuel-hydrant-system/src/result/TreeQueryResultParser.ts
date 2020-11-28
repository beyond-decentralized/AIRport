import {TreeResultParser} from './TreeResultParser'

/**
 * Created by Papa on 11/8/2016.
 */
export class TreeQueryResultParser
	extends TreeResultParser {

	addEntity(
		entityAlias: string
	): any {
		let resultObject                      = {}
		this.currentRowObjectMap[entityAlias] = resultObject

		return resultObject
	}

	bufferOneToManyCollection(
		entityAlias: string,
		resultObject: any,
		propertyName: string,
		childResultObject: any
	): void {
		resultObject[propertyName] = [childResultObject]
		this.addOneToManyCollection(entityAlias, resultObject, propertyName)
	}

	flushEntity(
		entityAlias: string,
		resultObject: any
	): any {
		return this.mergeEntity(entityAlias, resultObject)
	}

}
