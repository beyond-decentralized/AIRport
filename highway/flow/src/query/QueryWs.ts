export enum QueryType {
	PREPARED,
	DYNAMIC
}

export interface IQueryRequest {
	name: string
	parameters: {
		[parameterName: string]: string
	},
	type: QueryType
}

export interface IQueryResponse {
	error?: string,
	result?: any
}

export interface IQueryConfig {

}

export interface IQueryContext {
	ioc
}

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
	config: IQueryConfig = {},
	context: IQueryContext
): Promise<IQueryResponse> {
	switch (request.type) {
		case QueryType.DYNAMIC:
			return {
				error: `Dynamic queries are not (yet) supported by Highway.`
			};
		case QueryType.PREPARED:
			// TODO: implement
			return null;
		default:
			return {
				error: `Unknown Query type: ${request.type}`
			};
	}
}
