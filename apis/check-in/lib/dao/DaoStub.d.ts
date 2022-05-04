import { IEntityCreateProperties } from '@airport/air-traffic-control';
import { DaoFindOneStub } from './DaoFindOneStub';
import { DaoFindStub } from './DaoFindStub';
import { DaoSearchOneStub } from './DaoSearchOneStub';
import { DaoSearchStub } from './DaoSearchStub';
export declare class DaoStub<Entity, EntityCreate extends IEntityCreateProperties> {
    Find: DaoFindStub<Entity, Entity[]>;
    FindOne: DaoFindOneStub<Entity>;
    Search: DaoSearchStub<Entity, Entity[]>;
    SearchOne: DaoSearchOneStub<Entity>;
    save<EntityInfo extends EntityCreate | EntityCreate[]>(entity: EntityInfo): Promise<number>;
}
//# sourceMappingURL=DaoStub.d.ts.map