import {
	AIRPORT_DATABASE,
	IAirportDatabase,
	QAppInternal,
} from '@airport/air-traffic-control';
import { QApp } from '@airport/aviation-communication'
import { IOC } from '@airport/direction-indicator';
import {
	PortableApplicationQuery,
	JsonFormattedQuery,
	JsonOperation,
	JsonApplication,
	DbOperationType,
	QueryInputKind,
	IQueryParameter,
	QueryParameterType,
	QueryResultType,
	IDbApplicationUtils,
	DbApplicationUtils
} from '@airport/ground-control';
import {
	Lookup,
	QUERY_FACADE
} from '@airport/tarmaq-dao';
import {
	IQFunction,
	IQOperableField,
	LimitedEntityQuery,
	QBooleanFunction,
	QDateArrayFunction,
	QDateFunction,
	QNumberArrayFunction,
	QNumberFunction,
	QStringArrayFunction,
	QStringFunction,
	Y
} from '@airport/tarmaq-query';
import tsc from 'typescript';
import { ITempDatabase, TempDatabase } from '../../ddl/loader/temp/TempDatabase';
import { JsonFormattedQueryWithExpression } from './OperationGenerator';

export class ApplicationQueryGenerator {

	private tempDatabase: ITempDatabase = new TempDatabase();

	async processQueries(
		entityOperationMap: {
			[entityName: string]: {
				[operationName: string]: JsonOperation
			}
		},
		jsonApplication: JsonApplication
	): Promise<void> {
		if (!this.haveQueries(entityOperationMap)) {
			return;
		}
		await this.initTempDatabase(jsonApplication);

		for (const entityName in entityOperationMap) {
			const operations: { [operationName: string]: JsonOperation; }
				= entityOperationMap[entityName];
			for (const operationName in operations) {
				const operation = operations[operationName];
				switch (operation.type) {
					case DbOperationType.DELETE:
					case DbOperationType.SAVE:
						break;
					default:
						// its a query
						const queryDefinition: JsonFormattedQueryWithExpression
							= operation as JsonFormattedQueryWithExpression;

						const query = await this.getApplicationQuery(queryDefinition, entityName,
							jsonApplication);

						const inputs: IQueryParameter[] = queryDefinition.inputs.filter(input =>
							(input as IQueryParameter).type === QueryInputKind.PARAMETER) as any;

						inputs.forEach(input => {
							if (!input.isArray) {
								delete input.isArray;
							}
							delete input.clazz;
							delete input.type;
						});

						operations[operationName] = {
							inputs,
							query,
							type: queryDefinition.type,
						} as JsonFormattedQuery;
						break;
				}
			}
		}
	}

	private haveQueries(
		entityOperationMap: {
			[entityName: string]: {
				[operationName: string]: JsonOperation
			}
		}
	): boolean {
		for (const entityName in entityOperationMap) {
			const operations: { [operationName: string]: JsonOperation; }
				= entityOperationMap[entityName];
			for (const operationName in operations) {
				const operation = operations[operationName];
				switch (operation.type) {
					case DbOperationType.DELETE:
					case DbOperationType.SAVE:
						break;
					default:
						// its a query
						return true;
				}
				// dao[dao](...(new QQueryPreparationField() as Array<any>));
			}
		}
		return false;
	}

	private async initTempDatabase(
		application: JsonApplication
	): Promise<void> {
		await this.tempDatabase.initialize([application]);
	}

	private async getApplicationQuery(
		queryDefinition: JsonFormattedQueryWithExpression,
		entityName: string,
		jsonApplication: JsonApplication,
	): Promise<PortableApplicationQuery> {
		const queryTypescript = queryDefinition.expression.getText();
		let queryJavascript = tsc.transpile(queryTypescript);
		const functionStartRegex = /\(\s*function \s*\(\s*[\w,\s]*\)\s*\{\s*/;
		const functionEndRegex = /\s*\}\);\s*$/;
		queryJavascript = queryJavascript.replace(functionStartRegex, '');
		queryJavascript = queryJavascript.replace(functionEndRegex, '');

		const [airDb, dbApplicationUtils] = await IOC.get(AIRPORT_DATABASE, DbApplicationUtils);
		for (const functionName in airDb.functions) {
			const regex = new RegExp(`\\s*${functionName}\\(`);
			queryJavascript = queryJavascript
				.replace(regex, ` airDb.functions.${functionName}(`);
		}
		const functionConstructorParams = [];

		for (const input of queryDefinition.inputs) {
			functionConstructorParams.push(input.name);
		}
		functionConstructorParams.push('airDb');
		functionConstructorParams.push('Y');
		functionConstructorParams.push(queryJavascript);
		const queryFunction = new Function(...functionConstructorParams);

		const [queryFunctionParameters, queryParameters] = this.getQueryFunctionParameters(
			queryDefinition, jsonApplication, airDb, dbApplicationUtils);

		const rawQuery = queryFunction(...queryFunctionParameters);

		const [dbAppliationUtils, lookup, queryFacade] = await IOC.get(
			DbApplicationUtils, Lookup, QUERY_FACADE);
		const context = lookup.ensureContext(null);
		const qApplication: QAppInternal = airDb.QM[dbAppliationUtils.
			getDbApplication_FullName(jsonApplication)];
		const dbApplicationVersion = qApplication.__dbDbApplication__
			.versions[qApplication.__dbDbApplication__.versions.length - 1];
		context.dbEntity = dbApplicationVersion.entityMapByName[entityName];
		await queryFacade.ensureContext(context);
		const queryResultType = this.getQueryResultType(queryDefinition.type);

		const portableQuery = queryFacade.getPortableQuery(
			new LimitedEntityQuery(rawQuery), queryResultType, context);

		const parameterFieldMapByAlias = {};
		for (const queryParameter of queryParameters) {
			const qFunction: IQFunction<any> = queryParameter.parameter as any;
			parameterFieldMapByAlias[qFunction.parameterAlias] = queryParameter;
		}
		const parameterMap = {
			...portableQuery.parameterMap
		};
		for (const parameterAlias in portableQuery.parameterMap) {
			parameterMap[parameterAlias] = parameterFieldMapByAlias[parameterAlias].index;
		}

		return {
			query: portableQuery.query,
			parameterMap,
			queryResultType: portableQuery.queryResultType,
			entityIndex: portableQuery.entityIndex
		};
	}

	private getQueryFunctionParameters(
		queryDefinition: JsonFormattedQueryWithExpression,
		jsonApplication: JsonApplication,
		airDb: IAirportDatabase,
		dbApplicationUtils: IDbApplicationUtils
	): [any[], { index: number, parameter: IQOperableField<any, any, any, any> }[]] {
		const queryFunctionParameters = [];
		const queryParameters = [];
		let parameter: IQueryParameter;
		let queryParameter: IQOperableField<any, any, any, any>;
		let lastBooleanParameter = false;
		let lastNumberParameter = 0;
		let lastStringParameter = 0;
		let lastDateParameter = new Date().getTime();
		let Q: QApp;
		for (const input of queryDefinition.inputs) {
			switch (input.type) {
				case QueryInputKind.PARAMETER:
					parameter = input as IQueryParameter;
					switch (parameter.parameterType) {
						case QueryParameterType.BOOLEAN:
							lastBooleanParameter = !lastBooleanParameter;
							queryParameter = new QBooleanFunction(lastBooleanParameter, true);
							queryFunctionParameters.push(queryParameter);
							queryParameters.push(queryParameter);
							break;
						case QueryParameterType.DATE:
							lastDateParameter++;
							if (parameter.isArray) {
								queryParameter = new QDateArrayFunction([new Date(lastDateParameter)], true);
							} else {
								queryParameter = new QDateFunction(new Date(lastDateParameter), true);
							}
							queryFunctionParameters.push(queryParameter);
							queryParameters.push(queryParameter);
							break;
						case QueryParameterType.NUMBER:
							lastNumberParameter++;
							if (parameter.isArray) {
								queryParameter = new QNumberArrayFunction([lastNumberParameter], true);
							} else {
								queryParameter = new QNumberFunction(lastNumberParameter, true);
							}
							queryFunctionParameters.push(queryParameter);
							queryParameters.push(queryParameter);
							break;
						case QueryParameterType.STRING:
							lastStringParameter++;
							if (parameter.isArray) {
								queryParameter = new QStringArrayFunction(['' + lastStringParameter], true);
							} else {
								queryParameter = new QStringFunction('' + lastStringParameter, true);
							}
							queryFunctionParameters.push(queryParameter);
							queryParameters.push(queryParameter);
							break;
						default:
							throw new Error(`Unsupported QueryParameterType: ` +
								parameter.parameterType);
					}
					break;
				case QueryInputKind.Q:
					Q = airDb.QM[dbApplicationUtils.
						getDbApplication_FullName(jsonApplication)];
					queryFunctionParameters.push(Q);
					break;
				case QueryInputKind.QENTITY:
					queryFunctionParameters.push(null);
					break;
			}
		}
		queryFunctionParameters.push(airDb);
		queryFunctionParameters.push(Y);

		return [queryFunctionParameters, queryParameters.map((
			parameter,
			index
		) => ({
			index,
			parameter
		}))];
	}

	private getQueryResultType(
		operationType: DbOperationType
	): QueryResultType {
		switch (operationType) {
			case DbOperationType.FIND_ONE_GRAPH:
			case DbOperationType.FIND_GRAPH:
			case DbOperationType.SEARCH_ONE_GRAPH:
			case DbOperationType.SEARCH_GRAPH:
				return QueryResultType.ENTITY_GRAPH;
			case DbOperationType.FIND_ONE_TREE:
			case DbOperationType.FIND_TREE:
			case DbOperationType.SEARCH_ONE_TREE:
			case DbOperationType.SEARCH_TREE:
				return QueryResultType.ENTITY_TREE;
			default:
				throw new Error(`Unexpected DbOperationType: '${operationType}'.`);
		}
	}
}
