import {Token}          from 'typedi'
import {IActiveQueries} from "./store/ActiveQueries";
import {IIdGenerator}   from "./store/IdGenerator";

export const ActiveQueriesToken = new Token<IActiveQueries>()
export const IdGeneratorToken = new Token<IIdGenerator>()
