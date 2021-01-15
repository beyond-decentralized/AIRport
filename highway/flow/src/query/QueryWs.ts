export interface IQueryRequest {
	name: string
	parameters: {
		[parameterName: string]: string
	}
}

export interface IQueryResponse {
	results: any
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
	return null;
}
