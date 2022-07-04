import { IContext } from '@airport/direction-indicator';
import { ApplicationProperty_LocalId } from '@airport/ground-control';
import { BaseApplicationRelationDao, IBaseApplicationRelationDao, IApplicationRelation } from '../generated/generated';
export interface IApplicationRelationDao extends IBaseApplicationRelationDao {
    findAllForProperties(propertyIds: ApplicationProperty_LocalId[]): Promise<IApplicationRelation[]>;
    insert(applicationRelations: IApplicationRelation[], context: IContext): Promise<void>;
}
export declare class ApplicationRelationDao extends BaseApplicationRelationDao implements IApplicationRelationDao {
    findAllForProperties(propertyIds: ApplicationProperty_LocalId[]): Promise<IApplicationRelation[]>;
    insert(applicationRelations: IApplicationRelation[], context: IContext): Promise<void>;
}
//# sourceMappingURL=ApplicationRelationDao.d.ts.map