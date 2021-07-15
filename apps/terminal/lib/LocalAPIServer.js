import { OPERATION_DESERIALIZER, QUERY_RESULTS_SERIALIZER } from "@airport/check-in";
import { container, DI } from "@airport/di";
import { TRANSACTIONAL_CONNECTOR } from "@airport/ground-control";
import { ENTITY_STATE_MANAGER } from "@airport/pressurization";
import { DaoOperationType } from "./DaoRegistry";
import { DAO_REGISTRY, LOCAL_API_SERVER } from "./tokens";
export class LocalAPIServer {
    async handleRequest(request) {
        const [daoRegistry, entityStateManager, queryResultsSerializer, operationDeserializer, transactionalConnector] = await container(this).get(DAO_REGISTRY, ENTITY_STATE_MANAGER, QUERY_RESULTS_SERIALIZER, OPERATION_DESERIALIZER, TRANSACTIONAL_CONNECTOR);
        const operation = daoRegistry.findOperation(request.daoName, request.methodName);
        const context = {
            dbEntity: operation.dbEntity
        };
        let payload;
        switch (operation.type) {
            case DaoOperationType.ADD_REPOSITORY:
                throw new Error('TODO Implement');
                break;
            case DaoOperationType.SAVE:
                if (!request.args) {
                    throw new Error(`No entity was provied to a save call,
                    expecting an entity or an array of entities`);
                }
                else if (request.args.length !== 1) {
                    throw new Error(`Wrong number of entities was provied to a save call, 
                    expecting 1 (an entity or an array of entities), received ${request.args.length}`);
                }
                else if (typeof request.args[0] !== 'object') {
                    throw new Error(`Wrong type of entity was provied to a save call,
                    expecting an entity or an array of entities, received ${typeof request.args[0]}`);
                }
                const entity = operationDeserializer.deserialize(request.args[0], entityStateManager);
                // [context.dbEntity.schemaVersion.schema.index][context.dbEntity.name]
                payload = await transactionalConnector.save(entity, context);
                break;
            case DaoOperationType.FIND:
            case DaoOperationType.FIND_ONE:
            case DaoOperationType.SEARCH:
            case DaoOperationType.SEARCH_ONE:
                const result = this.handleQuery(operation, request.args, transactionalConnector, context);
                payload = queryResultsSerializer.serialize(result, entityStateManager);
                break;
            default:
                throw new Error(`Unknown DaoOperationType: ${operation.type}`);
        }
        const response = {
            type: null,
            payload
        };
        return response;
    }
    async handleQuery(operation, orderedParameters, transactionalConnector, context) {
        const portableQuery = this.getPortableQuery(operation.queryReference, orderedParameters);
        switch (operation.type) {
            case DaoOperationType.FIND:
                return await transactionalConnector.find(portableQuery, context);
            case DaoOperationType.FIND_ONE:
                return await transactionalConnector.findOne(portableQuery, context);
            case DaoOperationType.SEARCH:
                return await transactionalConnector.search(portableQuery, context);
            case DaoOperationType.SEARCH_ONE:
                return await transactionalConnector.searchOne(portableQuery, context);
            default:
                throw new Error(`Unknown DaoOperationType: ${operation.type}`);
        }
    }
    getPortableQuery(queryReference, orderedParameters) {
        const parameterMap = {};
        if (orderedParameters) {
            if (orderedParameters.length !== queryReference.parameterAliasesByPosition.length) {
                throw new Error(`Query expects ${queryReference.parameterAliasesByPosition.length} but ${orderedParameters.length} parameters were passed in`);
            }
            for (let i = 0; i < orderedParameters.length; i++) {
                const parameterAlias = queryReference.parameterAliasesByPosition[i];
                parameterMap[parameterAlias] = orderedParameters[i];
            }
        }
        else {
            if (queryReference.parameterAliasesByPosition.length) {
                throw new Error(`Query expects ${queryReference.parameterAliasesByPosition.length} but no parameters were passed in`);
            }
        }
        const portableQuery = queryReference.portableQuery;
        return {
            jsonQuery: portableQuery.jsonQuery,
            parameterMap,
            queryResultType: portableQuery.queryResultType,
            schemaIndex: portableQuery.schemaIndex,
            tableIndex: portableQuery.tableIndex
        };
    }
}
DI.set(LOCAL_API_SERVER, LocalAPIServer);
//# sourceMappingURL=LocalAPIServer.js.map