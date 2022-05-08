import { IContext } from '@airport/direction-indicator';
import { ApplicationVersionId } from '@airport/ground-control';
import { BaseApplicationEntityDao, IBaseApplicationEntityDao, IApplicationEntity } from '../generated/generated';
export interface IApplicationEntityDao extends IBaseApplicationEntityDao {
    findAllForApplicationVersions(applicationVersionIds: ApplicationVersionId[]): Promise<IApplicationEntity[]>;
    insert(applicationEntities: IApplicationEntity[], context: IContext): Promise<void>;
}
export declare class ApplicationEntityDao extends BaseApplicationEntityDao implements IApplicationEntityDao {
    findAllForApplicationVersions(applicationVersionIds: ApplicationVersionId[]): Promise<IApplicationEntity[]>;
    insert(applicationEntities: IApplicationEntity[], context: IContext): Promise<void>;
}
//# sourceMappingURL=ApplicationEntityDao.d.ts.map