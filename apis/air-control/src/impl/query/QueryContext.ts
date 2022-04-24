import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import {
	ITransactionalConnector,
	TRANSACTIONAL_CONNECTOR
} from '@airport/ground-control';
import { IAirportDatabase } from '../../lingo/AirportDatabase';
import { IQueryFacade } from '../../lingo/core/repository/DatabaseFacade';
import {
	IIocQueryContext,
	IQueryContext
} from '../../lingo/query/QueryContext';
import { IEntityUtils } from '../../lingo/utils/EntityUtils';
import { IFieldUtils } from '../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../lingo/utils/QueryUtils';
import { IApplicationUtils } from '../../lingo/utils/ApplicationUtils';
import {
	AIRPORT_DATABASE,
	ENTITY_UTILS,
	FIELD_UTILS,
	QUERY_FACADE,
	QUERY_UTILS,
	APPLICATION_UTILS
} from '../../tokens';

export class IocQueryContext
	implements IIocQueryContext {

	airDb: IAirportDatabase;
	entityUtils: IEntityUtils;
	fieldUtils: IFieldUtils;

	async init(): Promise<void> {
		const [airDb, entityUtils, fieldUtils, queryFacade,
			queryUtils, applicationUtils, transactionalConnector] = await DEPENDENCY_INJECTION.db()
				.get(AIRPORT_DATABASE, ENTITY_UTILS, FIELD_UTILS, QUERY_FACADE,
					QUERY_UTILS, APPLICATION_UTILS, TRANSACTIONAL_CONNECTOR);
		this.airDb = airDb;
		this.entityUtils = entityUtils;
		this.fieldUtils = fieldUtils;
		this.queryFacade = queryFacade;
		this.queryUtils = queryUtils;
		this.applicationUtils = applicationUtils;
		this.transactionalConnector = transactionalConnector;
	}

	queryFacade: IQueryFacade;
	queryUtils: IQueryUtils;
	applicationUtils: IApplicationUtils;
	transactionalConnector: ITransactionalConnector;
}

export interface IQueryContextLoader {

	ensure<E>(
		ctx: IQueryContext
	): Promise<void>

}

export class QueryContextLoader
	implements IQueryContextLoader {

	async ensure<E>(
		ctx: IQueryContext
	): Promise<void> {
		if (!ctx.ioc) {
			ctx.ioc = new IocQueryContext();
			await ctx.ioc.init();
		}
	}

}
