import { IContext } from '@airport/direction-indicator';
import { ApplicationEntity_LocalId } from '@airport/ground-control';
import { BaseApplicationColumnDao, IBaseApplicationColumnDao, IApplicationColumn } from '../generated/generated';
export interface IApplicationColumnDao extends IBaseApplicationColumnDao {
    findAllForEntities(entityIds: ApplicationEntity_LocalId[]): Promise<IApplicationColumn[]>;
    insert(applicationColumns: IApplicationColumn[], context: IContext): Promise<void>;
}
export declare class ApplicationColumnDao extends BaseApplicationColumnDao implements IApplicationColumnDao {
    findAllForEntities(entityIds: ApplicationEntity_LocalId[]): Promise<IApplicationColumn[]>;
    insert(applicationColumns: IApplicationColumn[], context: IContext): Promise<void>;
}
//# sourceMappingURL=ApplicationColumnDao.d.ts.map