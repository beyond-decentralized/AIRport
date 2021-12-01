import { EntityId } from '@airport/ground-control';
import { BaseApplicationColumnDao, IBaseApplicationColumnDao, IApplicationColumn } from '../generated/generated';
export interface IApplicationColumnDao extends IBaseApplicationColumnDao {
    findAllForEntities(entityIds: EntityId[]): Promise<IApplicationColumn[]>;
    insert(applicationColumns: IApplicationColumn[]): Promise<void>;
}
export declare class ApplicationColumnDao extends BaseApplicationColumnDao implements IApplicationColumnDao {
    findAllForEntities(entityIds: EntityId[]): Promise<IApplicationColumn[]>;
    insert(applicationColumns: IApplicationColumn[]): Promise<void>;
}
//# sourceMappingURL=ApplicationColumnDao.d.ts.map