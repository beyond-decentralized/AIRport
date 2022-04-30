import { IApplicationUtils } from '@airport/air-control'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	DbEntity,
	IEntityStateManager,
	QueryResultType
} from '@airport/ground-control'
import { EntityGraphResultParser } from './EntityGraphResultParser'
import { EntityTreeResultParser } from './EntityTreeResultParser'
import {
	GraphQueryConfiguration,
	IEntityResultParser
} from './IEntityResultParser'

export interface IObjectResultParserFactory {

	getObjectResultParser(
		queryResultType: QueryResultType,
		config?: GraphQueryConfiguration,
		rootDbEntity?: DbEntity,
	): IEntityResultParser

}

@Injected()
export class ObjectResultParserFactory
	implements IObjectResultParserFactory {

	@Inject()
	applicationUtils: IApplicationUtils

	@Inject()
	entityStateManager: IEntityStateManager

	getObjectResultParser(
		queryResultType: QueryResultType,
		config?: GraphQueryConfiguration,
		rootDbEntity?: DbEntity,
	): IEntityResultParser {
		switch (queryResultType) {
			case QueryResultType.ENTITY_GRAPH:
			case QueryResultType.MAPPED_ENTITY_GRAPH:
				return new EntityGraphResultParser(config, rootDbEntity,
					this.applicationUtils, this.entityStateManager)
			case QueryResultType.ENTITY_TREE:
			case QueryResultType.MAPPED_ENTITY_TREE:
				return new EntityTreeResultParser(this.applicationUtils, this.entityStateManager)
			default:
				throw new Error(
					`ObjectQueryParser not supported for QueryResultType: ${queryResultType}`)
		}
	}

}
