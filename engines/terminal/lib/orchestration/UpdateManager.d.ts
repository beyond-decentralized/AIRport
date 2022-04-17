import { IRootTransaction, PortableQuery } from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern';
import { IOperationContext, ITransaction, IUpdateManager } from '@airport/terminal-map';
export declare class UpdateManager implements IUpdateManager {
    updateValues(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, rootTransaction: IRootTransaction, context: IOperationContext): Promise<number>;
    private addUpdateHistory;
    private addNewValueHistory;
    private groupRecordsByRepository;
}
//# sourceMappingURL=UpdateManager.d.ts.map