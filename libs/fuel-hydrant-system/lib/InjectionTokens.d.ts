import { Token } from 'typedi';
import { IActiveQueries } from './store/ActiveQueries';
import { IIdGenerator } from './store/IdGenerator';
import { ISequenceGenerator } from './store/SequenceGenerator';
export declare const ActiveQueriesToken: Token<IActiveQueries>;
export declare const IdGeneratorToken: Token<IIdGenerator>;
export declare const SequenceGeneratorToken: Token<ISequenceGenerator>;
