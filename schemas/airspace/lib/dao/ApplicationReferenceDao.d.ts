import { IContext } from '@airport/direction-indicator';
import { ApplicationVersion_LocalId } from '@airport/ground-control';
import { BaseApplicationReferenceDao, IBaseApplicationReferenceDao, IApplicationReference } from '../generated/generated';
export interface IApplicationReferenceDao extends IBaseApplicationReferenceDao {
    findAllForApplicationVersions(applicationVersionIds: ApplicationVersion_LocalId[]): Promise<IApplicationReference[]>;
    insert(applicationReferences: IApplicationReference[], context: IContext): Promise<void>;
}
export declare class ApplicationReferenceDao extends BaseApplicationReferenceDao implements IApplicationReferenceDao {
    findAllForApplicationVersions(applicationVersionIds: ApplicationVersion_LocalId[]): Promise<IApplicationReference[]>;
    insert(applicationReferences: IApplicationReference[], context: IContext): Promise<void>;
}
//# sourceMappingURL=ApplicationReferenceDao.d.ts.map