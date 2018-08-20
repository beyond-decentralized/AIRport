import {Token}              from 'typedi'
import {IActiveQueries}     from "./store/ActiveQueries";
import {IIdGenerator}       from "./store/IdGenerator";
import {ISequenceGenerator} from './store/VirtualSequenceGenerator'

export const ActiveQueriesToken = new Token<IActiveQueries>()
export const IdGeneratorToken = new Token<IIdGenerator>()
export const SequenceGeneratorToken = new Token<ISequenceGenerator>()