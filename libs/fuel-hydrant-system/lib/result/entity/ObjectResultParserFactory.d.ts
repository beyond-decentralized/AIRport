import { IApplicationUtils } from '@airport/air-traffic-control';
import { DbEntity, IEntityStateManager, QueryResultType } from '@airport/ground-control';
import { GraphQueryConfiguration, IEntityResultParser } from './IEntityResultParser';
export interface IObjectResultParserFactory {
    getObjectResultParser(queryResultType: QueryResultType, config?: GraphQueryConfiguration, rootDbEntity?: DbEntity): IEntityResultParser;
}
export declare class ObjectResultParserFactory implements IObjectResultParserFactory {
    applicationUtils: IApplicationUtils;
    entityStateManager: IEntityStateManager;
    getObjectResultParser(queryResultType: QueryResultType, config?: GraphQueryConfiguration, rootDbEntity?: DbEntity): IEntityResultParser;
}
//# sourceMappingURL=ObjectResultParserFactory.d.ts.map