import {Token}               from 'typedi'
import {IStatementProcessor} from './query/StatementProcessor'

export const StatementProcessorToken = new Token<IStatementProcessor>()