import { ApplicationVersionId } from '@airport/ground-control';
import { BaseApplicationReferenceDao, IBaseApplicationReferenceDao, IApplicationReference } from '../generated/generated';
export interface IApplicationReferenceDao extends IBaseApplicationReferenceDao {
    findAllForApplicationVersions(applicationVersionIds: ApplicationVersionId[]): Promise<IApplicationReference[]>;
    insert(applicationReferences: IApplicationReference[]): Promise<void>;
}
export declare class ApplicationReferenceDao extends BaseApplicationReferenceDao implements IApplicationReferenceDao {
    findAllForApplicationVersions(applicationVersionIds: ApplicationVersionId[]): Promise<IApplicationReference[]>;
    insert(applicationReferences: IApplicationReference[]): Promise<void>;
}
//# sourceMappingURL=ApplicationReferenceDao.d.ts.map