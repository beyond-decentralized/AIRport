import {
	DbEntity,
	QueryResultType
}                                     from '@airport/ground-control'
import {EntityGraphResultParser}      from './EntityGraphResultParser'
import {EntityTreeResultParser}       from './EntityTreeResultParser'
import {
	GraphQueryConfiguration,
	IEntityResultParser
}                                     from './IEntityResultParser'

export interface IObjectResultParserFactory {

	getObjectResultParser(
		queryResultType: QueryResultType,
		config?: GraphQueryConfiguration,
		rootDbEntity?: DbEntity,
	): IEntityResultParser

}

export class ObjectResultParserFactory
	implements IObjectResultParserFactory {

	getObjectResultParser(
		queryResultType: QueryResultType,
		config?: GraphQueryConfiguration,
		rootDbEntity?: DbEntity,
	): IEntityResultParser {
		switch (queryResultType) {
			case QueryResultType.ENTITY_GRAPH:
			case QueryResultType.MAPPED_ENTITY_GRAPH:
				return new EntityGraphResultParser(config, rootDbEntity)
			case QueryResultType.ENTITY_TREE:
			case QueryResultType.MAPPED_ENTITY_TREE:
				return new EntityTreeResultParser()
			default:
				throw new Error(
					`ObjectQueryParser not supported for QueryResultType: ${queryResultType}`)
		}
	}

}
