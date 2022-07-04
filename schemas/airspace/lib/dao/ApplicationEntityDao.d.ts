import { IContext } from '@airport/direction-indicator';
import { ApplicationVersion_LocalId } from '@airport/ground-control';
import { BaseApplicationEntityDao, IBaseApplicationEntityDao, IApplicationEntity } from '../generated/generated';
export interface IApplicationEntityDao extends IBaseApplicationEntityDao {
    findAllForApplicationVersions(applicationVersionIds: ApplicationVersion_LocalId[]): Promise<IApplicationEntity[]>;
    insert(applicationEntities: IApplicationEntity[], context: IContext): Promise<void>;
}
export declare class ApplicationEntityDao extends BaseApplicationEntityDao implements IApplicationEntityDao {
    findAllForApplicationVersions(applicationVersionIds: ApplicationVersion_LocalId[]): Promise<IApplicationEntity[]>;
    insert(applicationEntities: IApplicationEntity[], context: IContext): Promise<void>;
}
//# sourceMappingURL=ApplicationEntityDao.d.ts.map