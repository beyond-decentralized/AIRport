import { IContext } from '@airport/direction-indicator';
import { PropertyId } from '@airport/ground-control';
import { BaseApplicationRelationDao, IBaseApplicationRelationDao, IApplicationRelation } from '../generated/generated';
export interface IApplicationRelationDao extends IBaseApplicationRelationDao {
    findAllForProperties(propertyIds: PropertyId[]): Promise<IApplicationRelation[]>;
    insert(applicationRelations: IApplicationRelation[], context: IContext): Promise<void>;
}
export declare class ApplicationRelationDao extends BaseApplicationRelationDao implements IApplicationRelationDao {
    findAllForProperties(propertyIds: PropertyId[]): Promise<IApplicationRelation[]>;
    insert(applicationRelations: IApplicationRelation[], context: IContext): Promise<void>;
}
//# sourceMappingURL=ApplicationRelationDao.d.ts.map