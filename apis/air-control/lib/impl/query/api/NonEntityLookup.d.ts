import { QueryResultType } from '@airport/ground-control';
import { DistinguishableQuery, RawNonEntityQuery } from '../../..';
import { ILookup } from '../../../lingo/query/api/Lookup';
import { LookupProxy } from './Lookup';
export interface INonEntityLookupInternal extends ILookup {
    nonEntityLookup(rawNonEntityQuery: RawNonEntityQuery | {
        (...args: any[]): RawNonEntityQuery;
    }, queryResultType: QueryResultType, search: boolean, one: boolean, QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => DistinguishableQuery): Promise<any>;
}
export declare abstract class NonEntityLookup extends LookupProxy implements INonEntityLookupInternal {
    nonEntityLookup(rawNonEntityQuery: RawNonEntityQuery | {
        (...args: any[]): RawNonEntityQuery;
    }, queryResultType: QueryResultType, search: boolean, one: boolean, QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => DistinguishableQuery): Promise<any>;
}
