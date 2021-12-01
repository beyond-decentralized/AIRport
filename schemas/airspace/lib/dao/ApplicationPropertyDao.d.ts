import { EntityId } from '@airport/ground-control';
import { BaseApplicationPropertyDao, IBaseApplicationPropertyDao, IApplicationProperty } from '../generated/generated';
export interface IApplicationPropertyDao extends IBaseApplicationPropertyDao {
    findAllForEntities(entityIds: EntityId[]): Promise<IApplicationProperty[]>;
    insert(applicationProperties: IApplicationProperty[]): Promise<void>;
}
export declare class ApplicationPropertyDao extends BaseApplicationPropertyDao implements IApplicationPropertyDao {
    findAllForEntities(entityIds: EntityId[]): Promise<IApplicationProperty[]>;
    insert(applicationProperties: IApplicationProperty[]): Promise<void>;
}
//# sourceMappingURL=ApplicationPropertyDao.d.ts.map