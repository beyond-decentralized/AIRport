import { IApplicationUtils } from '@airport/air-control';
import { DbEntity, IEntityStateManager, QueryResultType } from '@airport/ground-control';
import { GraphQueryConfiguration, IEntityResultParser } from './IEntityResultParser';
export interface IObjectResultParserFactory {
    getObjectResultParser(queryResultType: QueryResultType, applicationUtils: IApplicationUtils, entityStateManager: IEntityStateManager, config?: GraphQueryConfiguration, rootDbEntity?: DbEntity): IEntityResultParser;
}
export declare class ObjectResultParserFactory implements IObjectResultParserFactory {
    getObjectResultParser(queryResultType: QueryResultType, applicationUtils: IApplicationUtils, entityStateManager: IEntityStateManager, config?: GraphQueryConfiguration, rootDbEntity?: DbEntity): IEntityResultParser;
}
//# sourceMappingURL=ObjectResultParserFactory.d.ts.map