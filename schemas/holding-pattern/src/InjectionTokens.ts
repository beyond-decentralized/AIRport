import {Token}                            from 'typedi'
import {IRecordHistoryNewValueDao}        from './dao/history/RecordHistoryNewValueDao'
import {IRecordHistoryOldValueDao}        from './dao/history/RecordHistoryOldValueDao'
import {IRepositoryTransactionHistoryDao} from './dao/history/RepositoryTransactionHistoryDao'
import {IActorDao}                        from './dao/infrastructure/ActorDao'
import {IRepositoryActorDao}              from './dao/repository/RepositoryActorDao'
import {IRepositoryDao}                   from './dao/repository/RepositoryDao'
import {IOperationHistoryDmo}             from './dmo/history/OperationHistoryDmo'
import {IRecordHistoryDmo}                from './dmo/history/RecordHistoryDmo'
import {IRecordHistoryNewValueDmo}        from './dmo/history/RecordHistoryNewValueDmo'
import {IRecordHistoryOldValueDmo}        from './dmo/history/RecordHistoryOldValueDmo'
import {IRepositoryTransactionHistoryDmo} from './dmo/history/RepositoryTransactionHistoryDmo'
import {ITransactionHistoryDmo}           from './dmo/history/TransactionHistoryDmo'


export const ActorDaoToken = new Token<IActorDao>()
export const OperationHistoryDmoToken = new Token<IOperationHistoryDmo>()
export const RecordHistoryDmoToken = new Token<IRecordHistoryDmo>()
export const RecordHistoryNewValueDaoToken = new Token<IRecordHistoryNewValueDao>()
export const RecordHistoryNewValueDmoToken = new Token<IRecordHistoryNewValueDmo>()
export const RecordHistoryOldValueDaoToken = new Token<IRecordHistoryOldValueDao>()
export const RecordHistoryOldValueDmoToken = new Token<IRecordHistoryOldValueDmo>()
export const RepositoryActorDaoToken = new Token<IRepositoryActorDao>()
export const RepositoryDaoToken = new Token<IRepositoryDao>()
export const RepositoryTransactionHistoryDaoToken = new Token<IRepositoryTransactionHistoryDao>()
export const RepositoryTransactionHistoryDmoToken = new Token<IRepositoryTransactionHistoryDmo>()
export const TransactionHistoryDmoToken = new Token<ITransactionHistoryDmo>()
