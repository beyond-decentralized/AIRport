import { PortableQuery } from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern';
import { ITransaction } from '@airport/terminal-map';
import { IOperationContext } from '../processing/OperationContext';
export interface IUpdateManager {
    updateValues(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, ctx: IOperationContext<any, any>): Promise<number>;
}
export declare class UpdateManager implements IUpdateManager {
    updateValues(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, context: IOperationContext<any, any>): Promise<number>;
    private addUpdateHistory;
    private addNewValueHistory;
    private groupRecordsByRepository;
}
//# sourceMappingURL=UpdateManager.d.ts.map