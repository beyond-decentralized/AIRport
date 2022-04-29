import { IOC } from '@airport/direction-indicator';
import { QUERY_WEB_SERVICE } from '../tokens';
import {
	IQueryConfig,
	IQueryContext,
	IQueryRequest,
	IQueryResponse
} from './Query';

export type IQueryHandlerCallback = {
	(
		request: IQueryRequest,
		context: IQueryContext
	): Promise<IQueryResponse>;
};

export function getQueryWsHandler(
	config: IQueryConfig
): IQueryHandlerCallback {
	return async (
		request: IQueryRequest,
		context: IQueryContext
	) => {
		return await queryWsHandler(request, config, context);
	};
}

export async function queryWsHandler(
	request: IQueryRequest,
	config: IQueryConfig,
	context: IQueryContext
) {
	const queryWebService = await IOC.get(QUERY_WEB_SERVICE);
	return await queryWebService.handle(request, config, context);
}
