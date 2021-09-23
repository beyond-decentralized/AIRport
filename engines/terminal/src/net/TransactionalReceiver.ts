import {
    container,
    IContext,
} from '@airport/di';
import {
    JsonSchemaWithApi
} from '@airport/check-in'
import {
    IAddRepositoryIMI,
    IInitConnectionIMI,
    IInitConnectionIMO,
    IIsolateMessage,
    IIsolateMessageOut,
    IPortableQueryIMI,
    IReadQueryIMI,
    ISaveIMI,
    IsolateMessageType
} from '@airport/security-check';
import { DDL_OBJECT_RETRIEVER } from '@airport/takeoff';
import {
    ICredentials,
    TRANSACTIONAL_SERVER
} from '@airport/terminal-map';

export abstract class TransactionalReceiver {

    async processMessage<ReturnType extends IIsolateMessageOut<any>>(
        message: IIsolateMessage
    ): Promise<ReturnType> {
        const [ddlObjectRetriever, transactionalServer] = await container(this)
            .get(DDL_OBJECT_RETRIEVER, TRANSACTIONAL_SERVER);
        let result: any
        let errorMessage
        let credentials: ICredentials = {
            domainAndPort: 'test'
        }
        let context: IContext = {}
        try {
            switch (message.type) {
                case IsolateMessageType.INIT_CONNECTION:
                    ddlObjectRetriever.lastIds
                    let initConnectionMessage: IInitConnectionIMI = message
                    const schema: JsonSchemaWithApi = initConnectionMessage.schema
                    schema.
                    result = message
                    break;
                case IsolateMessageType.ADD_REPOSITORY:
                    const addRepositoryMessage: IAddRepositoryIMI = <IAddRepositoryIMI>message
                    result = await transactionalServer.addRepository(
                        addRepositoryMessage.name,
                        addRepositoryMessage.url,
                        addRepositoryMessage.platform,
                        addRepositoryMessage.platformConfig,
                        addRepositoryMessage.distributionStrategy,
                        credentials,
                        context
                    );
                    break
                case IsolateMessageType.COMMIT:
                    result = await transactionalServer.commit(
                        credentials,
                        {}
                    )
                    break
                case IsolateMessageType.DELETE_WHERE:
                    const deleteWhereMessage: IPortableQueryIMI = <IPortableQueryIMI>message
                    result = await transactionalServer.deleteWhere(
                        deleteWhereMessage.portableQuery,
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.FIND:
                    const findMessage: IReadQueryIMI = <IReadQueryIMI>message;
                    result = await transactionalServer.find(
                        findMessage.portableQuery,
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.FIND_ONE:
                    const findOneMessage: IReadQueryIMI = <IReadQueryIMI>message;
                    result = await transactionalServer.findOne(
                        findOneMessage.portableQuery,
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.INSERT_VALUES:
                    const insertValuesMessage: IPortableQueryIMI = <IPortableQueryIMI>message
                    result = await transactionalServer.insertValues(
                        insertValuesMessage.portableQuery,
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.INSERT_VALUES_GET_IDS:
                    const insertValuesGetIdsMessage: IPortableQueryIMI = <IPortableQueryIMI>message
                    result = await transactionalServer.insertValuesGetIds(
                        insertValuesGetIdsMessage.portableQuery,
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.ROLLBACK:
                    result = await transactionalServer.rollback(
                        credentials,
                        {}
                    )
                    break
                case IsolateMessageType.SAVE:
                    const saveMessage: ISaveIMI<any, any> = <ISaveIMI<any, any>>message
                    result = await transactionalServer.save(
                        saveMessage.entity,
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.SEARCH:
                    const searchMessage: IReadQueryIMI = <IReadQueryIMI>message;
                    result = await transactionalServer.search(
                        searchMessage.portableQuery,
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.SEARCH_ONE:
                    const searchOneMessage: IReadQueryIMI = <IReadQueryIMI>message;
                    result = await transactionalServer.search(
                        searchOneMessage.portableQuery,
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.START_TRANSACTION:
                    result = await transactionalServer.startTransaction(
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.UPDATE_VALUES:
                    const updateValuesMessage: IPortableQueryIMI = <IPortableQueryIMI>message
                    result = await transactionalServer.insertValuesGetIds(
                        updateValuesMessage.portableQuery,
                        credentials,
                        context
                    )
                    break
                default:
                    // Unexpected IsolateMessageInType
                    return
            }
        } catch (error) {
            result = null;
            errorMessage = error.message
        }
        return {
            category: 'Db',
            errorMessage,
            id: message.id,
            schemaSignature: message.schemaSignature,
            type: message.type,
            result
        } as any
    }

}