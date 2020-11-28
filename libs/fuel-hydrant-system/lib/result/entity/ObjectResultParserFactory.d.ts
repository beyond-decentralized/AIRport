import { DbEntity, QueryResultType } from '@airport/ground-control';
import { GraphQueryConfiguration, IEntityResultParser } from './IEntityResultParser';
export interface IObjectResultParserFactory {
    getObjectResultParser(queryResultType: QueryResultType, config?: GraphQueryConfiguration, rootDbEntity?: DbEntity): IEntityResultParser;
}
export declare class ObjectResultParserFactory implements IObjectResultParserFactory {
    getObjectResultParser(queryResultType: QueryResultType, config?: GraphQueryConfiguration, rootDbEntity?: DbEntity): IEntityResultParser;
}
//# sourceMappingURL=ObjectResultParserFactory.d.ts.map