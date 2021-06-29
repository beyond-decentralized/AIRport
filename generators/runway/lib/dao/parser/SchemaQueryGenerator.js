import { AIRPORT_DATABASE, LimitedEntityQuery, LOOKUP, QBooleanFunction, QDateArrayFunction, QDateFunction, QNumberArrayFunction, QNumberFunction, QStringArrayFunction, QStringFunction, QUERY_FACADE, Y } from '@airport/air-control';
import { DI } from '@airport/di';
import { getSchemaName, OperationType, QueryInputKind, QueryParameterType, QueryResultType } from '@airport/ground-control';
import { TempDatabase } from '@airport/taxiway';
import tsc from 'typescript';
export class SchemaQueryGenerator {
    constructor() {
        this.tempDatabase = new TempDatabase();
    }
    async processQueries(entityOperationMap, jsonSchema) {
        if (!this.haveQueries(entityOperationMap)) {
            return;
        }
        await this.initTempDatabase(jsonSchema);
        for (const entityName in entityOperationMap) {
            const operations = entityOperationMap[entityName];
            for (const operationName in operations) {
                const operation = operations[operationName];
                switch (operation.type) {
                    case OperationType.DELETE:
                    case OperationType.SAVE:
                        break;
                    default:
                        // its a query
                        const queryDefinition = operation;
                        const query = await this.getSchemaQuery(queryDefinition, entityName, jsonSchema);
                        const inputs = queryDefinition.inputs.filter(input => input.type === QueryInputKind.PARAMETER);
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
                        };
                        break;
                }
            }
        }
    }
    haveQueries(entityOperationMap) {
        for (const entityName in entityOperationMap) {
            const operations = entityOperationMap[entityName];
            for (const operationName in operations) {
                const operation = operations[operationName];
                switch (operation.type) {
                    case OperationType.DELETE:
                    case OperationType.SAVE:
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
    async initTempDatabase(schema) {
        await this.tempDatabase.initialize([schema]);
    }
    async getSchemaQuery(queryDefinition, entityName, jsonSchema) {
        const queryTypescript = queryDefinition.expression.getText();
        let queryJavascript = tsc.transpile(queryTypescript);
        const functionStartRegex = /\(\s*function \s*\(\s*[\w,\s]*\)\s*\{\s*/;
        const functionEndRegex = /\s*\}\);\s*$/;
        queryJavascript = queryJavascript.replace(functionStartRegex, '');
        queryJavascript = queryJavascript.replace(functionEndRegex, '');
        const airDb = await DI.db().get(AIRPORT_DATABASE);
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
        const [queryFunctionParameters, queryParameters] = this.getQueryFunctionParameters(queryDefinition, jsonSchema, airDb);
        const rawQuery = queryFunction(...queryFunctionParameters);
        const [lookup, queryFacade] = await DI.db().get(LOOKUP, QUERY_FACADE);
        const context = lookup.ensureContext(null);
        const qSchema = airDb.QM[getSchemaName(jsonSchema)];
        const dbSchemaVersion = qSchema.__dbSchema__
            .versions[qSchema.__dbSchema__.versions.length - 1];
        context.dbEntity = dbSchemaVersion.entityMapByName[entityName];
        await queryFacade.ensureIocContext(context);
        const queryResultType = this.getQueryResultType(queryDefinition.type, false);
        const portableQuery = queryFacade.getPortableQuery(new LimitedEntityQuery(rawQuery), queryResultType, context);
        const parameterFieldMapByAlias = {};
        for (const queryParameter of queryParameters) {
            const qFunction = queryParameter.parameter;
            parameterFieldMapByAlias[qFunction.parameterAlias] = queryParameter;
        }
        const parameterMap = {
            ...portableQuery.parameterMap
        };
        for (const parameterAlias in portableQuery.parameterMap) {
            parameterMap[parameterAlias] = parameterFieldMapByAlias[parameterAlias].index;
        }
        return {
            jsonQuery: portableQuery.jsonQuery,
            parameterMap,
            queryResultType: portableQuery.queryResultType,
            tableIndex: portableQuery.tableIndex
        };
    }
    getQueryFunctionParameters(queryDefinition, jsonSchema, airDb) {
        const queryFunctionParameters = [];
        const queryParameters = [];
        let parameter;
        let queryParameter;
        let lastBooleanParameter = false;
        let lastNumberParameter = 0;
        let lastStringParameter = 0;
        let lastDateParameter = new Date().getTime();
        let Q;
        for (const input of queryDefinition.inputs) {
            switch (input.type) {
                case QueryInputKind.PARAMETER:
                    parameter = input;
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
                            }
                            else {
                                queryParameter = new QDateFunction(new Date(lastDateParameter), true);
                            }
                            queryFunctionParameters.push(queryParameter);
                            queryParameters.push(queryParameter);
                            break;
                        case QueryParameterType.NUMBER:
                            lastNumberParameter++;
                            if (parameter.isArray) {
                                queryParameter = new QNumberArrayFunction([lastNumberParameter], true);
                            }
                            else {
                                queryParameter = new QNumberFunction(lastNumberParameter, true);
                            }
                            queryFunctionParameters.push(queryParameter);
                            queryParameters.push(queryParameter);
                            break;
                        case QueryParameterType.STRING:
                            lastStringParameter++;
                            if (parameter.isArray) {
                                queryParameter = new QStringArrayFunction(['' + lastStringParameter], true);
                            }
                            else {
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
                    Q = airDb.QM[getSchemaName(jsonSchema)];
                    queryFunctionParameters.push(Q);
                    break;
                case QueryInputKind.QENTITY:
                    queryFunctionParameters.push(null);
                    break;
            }
        }
        queryFunctionParameters.push(airDb);
        queryFunctionParameters.push(Y);
        return [queryFunctionParameters, queryParameters.map((parameter, index) => ({
                index,
                parameter
            }))];
    }
    getQueryResultType(operationType, mapResults) {
        switch (operationType) {
            case OperationType.FIND_ONE_GRAPH:
            case OperationType.FIND_GRAPH:
            case OperationType.SEARCH_ONE_GRAPH:
            case OperationType.SEARCH_GRAPH:
                if (mapResults) {
                    return QueryResultType.MAPPED_ENTITY_GRAPH;
                }
                return QueryResultType.ENTITY_GRAPH;
            case OperationType.FIND_ONE_TREE:
            case OperationType.FIND_TREE:
            case OperationType.SEARCH_ONE_TREE:
            case OperationType.SEARCH_TREE:
                if (mapResults) {
                    return QueryResultType.MAPPED_ENTITY_TREE;
                }
                return QueryResultType.ENTITY_TREE;
            default:
                throw new Error(`Unexpected OperationType: '${operationType}'.`);
        }
    }
}
//# sourceMappingURL=SchemaQueryGenerator.js.map