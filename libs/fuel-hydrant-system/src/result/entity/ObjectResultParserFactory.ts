import {
	IUtils
} from '@airport/air-traffic-control'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	DbEntity,
	IApplicationUtils,
	IDatastructureUtils,
	IEntityStateManager,
	QueryResultType
} from '@airport/ground-control'
import { IQueryUtils } from '@airport/tarmaq-query'
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
	datastructureUtils: IDatastructureUtils

	@Inject()
	entityStateManager: IEntityStateManager

	@Inject()
	queryUtils: IQueryUtils

	@Inject()
	utils: IUtils

	getObjectResultParser(
		queryResultType: QueryResultType,
		config?: GraphQueryConfiguration,
		rootDbEntity?: DbEntity,
	): IEntityResultParser {
		switch (queryResultType) {
			case QueryResultType.ENTITY_GRAPH:
				return new EntityGraphResultParser(config, this.datastructureUtils,
					rootDbEntity, this.applicationUtils, this.queryUtils,
					this.entityStateManager, this.utils)
			case QueryResultType.ENTITY_TREE:
				return new EntityTreeResultParser(
					this.applicationUtils, this.entityStateManager, this.utils)
			default:
				throw new Error(
					`ObjectQueryParser not supported for QueryResultType: ${queryResultType}`)
		}
	}

}
