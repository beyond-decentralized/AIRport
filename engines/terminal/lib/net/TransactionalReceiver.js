import { container, } from '@airport/di';
import { IsolateMessageType } from '@airport/security-check';
import { DDL_OBJECT_RETRIEVER } from '@airport/takeoff';
import { TRANSACTIONAL_SERVER } from '@airport/terminal-map';
import { DATABASE_MANAGER } from '../tokens';
import { getSchemaName } from '@airport/ground-control';
export class TransactionalReceiver {
    constructor() {
        // FIXME: move this state to Terminal.state
        this.initializingApps = new Set();
        this.initializedApps = new Set();
    }
    async processMessage(message) {
        const [ddlObjectRetriever, transactionalServer] = await container(this)
            .get(DDL_OBJECT_RETRIEVER, TRANSACTIONAL_SERVER);
        let result;
        let errorMessage;
        let credentials = {
            domainAndPort: 'test'
        };
        let context = {};
        try {
            switch (message.type) {
                case IsolateMessageType.APP_INITIALIZING:
                    let initConnectionMessage = message;
                    const schema = initConnectionMessage.schema;
                    const schemaName = getSchemaName(schema);
                    if (this.initializingApps.has(schemaName)) {
                        return null;
                    }
                    this.initializingApps.add(schemaName);
                    const databaseManager = await container(this).get(DATABASE_MANAGER);
                    // FIXME: initalize ahead of time, at Isolate Loading
                    await databaseManager.initFeatureSchemas({}, [schema]);
                    result = schema.lastIds;
                    break;
                case IsolateMessageType.APP_INITIALIZED:
                    this.initializedApps.add(schemaName);
                    return null;
                case IsolateMessageType.ADD_REPOSITORY:
                    const addRepositoryMessage = message;
                    result = await transactionalServer.addRepository(addRepositoryMessage.name, addRepositoryMessage.url, addRepositoryMessage.platform, addRepositoryMessage.platformConfig, addRepositoryMessage.distributionStrategy, credentials, context);
                    break;
                case IsolateMessageType.COMMIT:
                    result = await transactionalServer.commit(credentials, {});
                    break;
                case IsolateMessageType.DELETE_WHERE:
                    const deleteWhereMessage = message;
                    result = await transactionalServer.deleteWhere(deleteWhereMessage.portableQuery, credentials, context);
                    break;
                case IsolateMessageType.FIND:
                    const findMessage = message;
                    result = await transactionalServer.find(findMessage.portableQuery, credentials, context);
                    break;
                case IsolateMessageType.FIND_ONE:
                    const findOneMessage = message;
                    result = await transactionalServer.findOne(findOneMessage.portableQuery, credentials, context);
                    break;
                case IsolateMessageType.INSERT_VALUES:
                    const insertValuesMessage = message;
                    result = await transactionalServer.insertValues(insertValuesMessage.portableQuery, credentials, context);
                    break;
                case IsolateMessageType.INSERT_VALUES_GET_IDS:
                    const insertValuesGetIdsMessage = message;
                    result = await transactionalServer.insertValuesGetIds(insertValuesGetIdsMessage.portableQuery, credentials, context);
                    break;
                case IsolateMessageType.ROLLBACK:
                    result = await transactionalServer.rollback(credentials, {});
                    break;
                case IsolateMessageType.SAVE:
                    const saveMessage = message;
                    result = await transactionalServer.save(saveMessage.entity, credentials, context);
                    break;
                case IsolateMessageType.SEARCH:
                    const searchMessage = message;
                    result = await transactionalServer.search(searchMessage.portableQuery, credentials, context);
                    break;
                case IsolateMessageType.SEARCH_ONE:
                    const searchOneMessage = message;
                    result = await transactionalServer.search(searchOneMessage.portableQuery, credentials, context);
                    break;
                case IsolateMessageType.START_TRANSACTION:
                    result = await transactionalServer.startTransaction(credentials, context);
                    break;
                case IsolateMessageType.UPDATE_VALUES:
                    const updateValuesMessage = message;
                    result = await transactionalServer.insertValuesGetIds(updateValuesMessage.portableQuery, credentials, context);
                    break;
                default:
                    // Unexpected IsolateMessageInType
                    return;
            }
        }
        catch (error) {
            result = null;
            errorMessage = error.message;
        }
        return {
            category: 'Db',
            errorMessage,
            id: message.id,
            schemaSignature: message.schemaSignature,
            type: message.type,
            result
        };
    }
}
//# sourceMappingURL=TransactionalReceiver.js.map