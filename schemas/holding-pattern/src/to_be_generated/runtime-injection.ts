import { app } from '@airport/direction-indicator'
import { RepositoryApi } from '../api/api'
import { RecordHistoryNewValueDao } from '../dao/history/RecordHistoryNewValueDao'
import { RecordHistoryOldValueDao } from '../dao/history/RecordHistoryOldValueDao'
import { RepositoryTransactionHistoryDao } from '../dao/history/RepositoryTransactionHistoryDao'
import { ActorDao } from '../dao/infrastructure/ActorDao'
import { RepositoryDao } from '../dao/repository/RepositoryDao'
import { RepositoryMemberDao } from '../dao/repository/RepositoryMemberDao'
import { OperationHistoryDuo } from '../duo/history/OperationHistoryDuo'
import { RecordHistoryDuo } from '../duo/history/RecordHistoryDuo'
import { RecordHistoryNewValueDuo } from '../duo/history/RecordHistoryNewValueDuo'
import { RecordHistoryOldValueDuo } from '../duo/history/RecordHistoryOldValueDuo'
import { RepositoryTransactionHistoryDuo } from '../duo/history/RepositoryTransactionHistoryDuo'
import { TransactionHistoryDuo } from '../duo/history/TransactionHistoryDuo'
import { application } from './app-declaration'
import { DatastructureUtils } from '@airport/ground-control'
import { IRepositoryManager, TERMINAL_SESSION_MANAGER } from '@airport/terminal-map'

export const holdingPattern = app(application)

export const REPOSITORY_MANAGER = holdingPattern.token<IRepositoryManager>('RepositoryManager')

holdingPattern.register(
    ActorDao, OperationHistoryDuo, RecordHistoryDuo,
    RecordHistoryNewValueDao, RecordHistoryNewValueDuo,
    RecordHistoryOldValueDao, RecordHistoryOldValueDuo,
    RepositoryDao, RepositoryMemberDao,
    RepositoryTransactionHistoryDao, RepositoryTransactionHistoryDuo,
    TransactionHistoryDuo, RepositoryApi
)

holdingPattern.setDependencies(ActorDao, {
    datastructureUtils: DatastructureUtils
})

holdingPattern.setDependencies(OperationHistoryDuo, {
    recordHistoryDuo: RecordHistoryDuo,
})

holdingPattern.setDependencies(RepositoryApi, {
    repositoryDao: RepositoryDao,
    repositoryManager: REPOSITORY_MANAGER,
})

holdingPattern.setDependencies(RecordHistoryDuo, {
    recordHistoryNewValueDuo: RecordHistoryNewValueDuo,
    recordHistoryOldValueDuo: RecordHistoryOldValueDuo,
})

holdingPattern.setDependencies(RepositoryTransactionHistoryDao, {
    datastructureUtils: DatastructureUtils
})

holdingPattern.setDependencies(RepositoryTransactionHistoryDuo, {
    operationHistoryDuo: OperationHistoryDuo,
})

holdingPattern.setDependencies(TransactionHistoryDuo, {
    repositoryMemberDao: RepositoryMemberDao,
    repositoryTransactionHistoryDuo: RepositoryTransactionHistoryDuo,
    terminalSessionManager: TERMINAL_SESSION_MANAGER
})