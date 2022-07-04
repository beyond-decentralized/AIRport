import { IContext } from '@airport/direction-indicator';
import { ApplicationEntity_LocalId } from '@airport/ground-control';
import { BaseApplicationPropertyDao, IBaseApplicationPropertyDao, IApplicationProperty } from '../generated/generated';
export interface IApplicationPropertyDao extends IBaseApplicationPropertyDao {
    findAllForEntities(entityIds: ApplicationEntity_LocalId[]): Promise<IApplicationProperty[]>;
    insert(applicationProperties: IApplicationProperty[], context: IContext): Promise<void>;
}
export declare class ApplicationPropertyDao extends BaseApplicationPropertyDao implements IApplicationPropertyDao {
    findAllForEntities(entityIds: ApplicationEntity_LocalId[]): Promise<IApplicationProperty[]>;
    insert(applicationProperties: IApplicationProperty[], context: IContext): Promise<void>;
}
//# sourceMappingURL=ApplicationPropertyDao.d.ts.map