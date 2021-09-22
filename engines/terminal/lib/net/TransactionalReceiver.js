import { container, } from '@airport/di';
import { IsolateMessageType } from '@airport/security-check';
import { TRANSACTIONAL_SERVER } from '@airport/terminal-map';
export class TransactionalReceiver {
    async processMessage(message) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        let result;
        let errorMessage;
        let credentials = {
            domainAndPort: 'test'
        };
        let context = {};
        try {
            switch (message.type) {
                case IsolateMessageType.INIT_CONNECTION:
                    result = message;
                    break;
                case IsolateMessageType.ADD_REPOSITORY:
                    const addRepositoryMessage = message;
                    result = await transServer.addRepository(addRepositoryMessage.name, addRepositoryMessage.url, addRepositoryMessage.platform, addRepositoryMessage.platformConfig, addRepositoryMessage.distributionStrategy, credentials, context);
                    break;
                case IsolateMessageType.COMMIT:
                    result = await transServer.commit(credentials, {});
                    break;
                case IsolateMessageType.DELETE_WHERE:
                    const deleteWhereMessage = message;
                    result = await transServer.deleteWhere(deleteWhereMessage.portableQuery, credentials, context);
                    break;
                case IsolateMessageType.FIND:
                    const findMessage = message;
                    result = await transServer.find(findMessage.portableQuery, credentials, context);
                    break;
                case IsolateMessageType.FIND_ONE:
                    const findOneMessage = message;
                    result = await transServer.findOne(findOneMessage.portableQuery, credentials, context);
                    break;
                case IsolateMessageType.INSERT_VALUES:
                    const insertValuesMessage = message;
                    result = await transServer.insertValues(insertValuesMessage.portableQuery, credentials, context);
                    break;
                case IsolateMessageType.INSERT_VALUES_GET_IDS:
                    const insertValuesGetIdsMessage = message;
                    result = await transServer.insertValuesGetIds(insertValuesGetIdsMessage.portableQuery, credentials, context);
                    break;
                case IsolateMessageType.ROLLBACK:
                    result = await transServer.rollback(credentials, {});
                    break;
                case IsolateMessageType.SAVE:
                    const saveMessage = message;
                    result = await transServer.save(saveMessage.entity, credentials, context);
                    break;
                case IsolateMessageType.SEARCH:
                    const searchMessage = message;
                    result = await transServer.search(searchMessage.portableQuery, credentials, context);
                    break;
                case IsolateMessageType.SEARCH_ONE:
                    const searchOneMessage = message;
                    result = await transServer.search(searchOneMessage.portableQuery, credentials, context);
                    break;
                case IsolateMessageType.START_TRANSACTION:
                    result = await transServer.startTransaction(credentials, context);
                    break;
                case IsolateMessageType.UPDATE_VALUES:
                    const updateValuesMessage = message;
                    result = await transServer.insertValuesGetIds(updateValuesMessage.portableQuery, credentials, context);
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