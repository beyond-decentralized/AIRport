import {
    container,
    IContext,
} from '@airport/di';
import {
    IAddRepositoryIMI,
    IIsolateMessage,
    IIsolateMessageOut,
    IPortableQueryIMI,
    IReadQueryIMI,
    ISaveIMI,
    IsolateMessageType
} from '@airport/security-check';
import {
    ICredentials,
    TRANSACTIONAL_SERVER
} from '@airport/terminal-map';

export abstract class TransactionalReceiver {

    async processMessage<ReturnType extends IIsolateMessageOut<any>>(
        message: IIsolateMessage
    ): Promise<ReturnType> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        let result: any
        let errorMessage
        let credentials: ICredentials = {
            domainAndPort: 'test'
        }
        let context: IContext = {}
        try {
            switch (message.type) {
                case IsolateMessageType.ADD_REPOSITORY:
                    const addRepositoryMessage: IAddRepositoryIMI = <IAddRepositoryIMI>message
                    result = await transServer.addRepository(
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
                    result = await transServer.commit(
                        credentials,
                        {}
                    )
                    break
                case IsolateMessageType.DELETE_WHERE:
                    const deleteWhereMessage: IPortableQueryIMI = <IPortableQueryIMI>message
                    result = await transServer.deleteWhere(
                        deleteWhereMessage.portableQuery,
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.FIND:
                    const findMessage: IReadQueryIMI = <IReadQueryIMI>message;
                    result = await transServer.find(
                        findMessage.portableQuery,
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.FIND_ONE:
                    const findOneMessage: IReadQueryIMI = <IReadQueryIMI>message;
                    result = await transServer.findOne(
                        findOneMessage.portableQuery,
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.INSERT_VALUES:
                    const insertValuesMessage: IPortableQueryIMI = <IPortableQueryIMI>message
                    result = await transServer.insertValues(
                        insertValuesMessage.portableQuery,
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.INSERT_VALUES_GET_IDS:
                    const insertValuesGetIdsMessage: IPortableQueryIMI = <IPortableQueryIMI>message
                    result = await transServer.insertValuesGetIds(
                        insertValuesGetIdsMessage.portableQuery,
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.ROLLBACK:
                    result = await transServer.rollback(
                        credentials,
                        {}
                    )
                    break
                case IsolateMessageType.SAVE:
                    const saveMessage: ISaveIMI<any, any> = <ISaveIMI<any, any>>message
                    result = await transServer.insertValuesGetIds(
                        saveMessage.entity,
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.SEARCH:
                    const searchMessage: IReadQueryIMI = <IReadQueryIMI>message;
                    result = await transServer.search(
                        searchMessage.portableQuery,
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.SEARCH_ONE:
                    const searchOneMessage: IReadQueryIMI = <IReadQueryIMI>message;
                    result = await transServer.search(
                        searchOneMessage.portableQuery,
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.START_TRANSACTION:
                    result = await transServer.startTransaction(
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.UPDATE_VALUES:
                    const updateValuesMessage: IPortableQueryIMI = <IPortableQueryIMI>message
                    result = await transServer.insertValuesGetIds(
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
            errorMessage,
            id: message.id,
            isolateId: message.isolateId,
            type: message.type,
            result
        } as any
    }

}