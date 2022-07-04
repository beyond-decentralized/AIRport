import { ApplicationEntity_LocalId, PortableQuery, Application_Index, IRootTransaction } from "@airport/ground-control";
import { IContext } from "@airport/direction-indicator";
import type { IActor, AirEntity, Repository_LocalId } from "@airport/holding-pattern";
import { ITransaction } from "../transaction/ITransaction";
export interface IDeleteManager {
    deleteWhere(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, rootTransaction: IRootTransaction, context?: IContext): Promise<number>;
}
export declare type RecordsToDelete = Map<Application_Index, Map<ApplicationEntity_LocalId, Map<Repository_LocalId, AirEntity[]>>>;
//# sourceMappingURL=DeleteManager.d.ts.map