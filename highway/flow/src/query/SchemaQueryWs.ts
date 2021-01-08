export interface ISchemaQueryRequest {

}

export interface ISchemaQueryResponse {

}

export interface ISchemaQueryConfig {

}

export interface ISchemaQueryContext {
	ioc
}

export type ISchemaQueryHandlerCallback = {
	(
		request: ISchemaQueryRequest,
		context: ISchemaQueryContext
	): Promise<ISchemaQueryResponse>;
};

export function getReadWsHandler(
	config: ISchemaQueryConfig
): ISchemaQueryHandlerCallback {
	return async (
		request: ISchemaQueryRequest,
		context: ISchemaQueryContext
	) => {
		return await schemaQueryWsHandler(request, config, context);
	};
}

export async function schemaQueryWsHandler(
	request: ISchemaQueryRequest,
	config: ISchemaQueryConfig = {},
	context: ISchemaQueryContext
): Promise<ISchemaQueryResponse> {
	return null;
}
