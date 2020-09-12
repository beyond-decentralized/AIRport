import { PortableQuery } from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern';
export interface IDeleteManager {
    deleteWhere(portableQuery: PortableQuery, actor: IActor): Promise<number>;
}
export declare class DeleteManager implements IDeleteManager {
    deleteWhere(portableQuery: PortableQuery, actor: IActor): Promise<number>;
    private recordRepositoryIds;
    private columnProcessed;
    private recordTreeToDelete;
    private getCascadeSubTree;
}
//# sourceMappingURL=DeleteManager.d.ts.map