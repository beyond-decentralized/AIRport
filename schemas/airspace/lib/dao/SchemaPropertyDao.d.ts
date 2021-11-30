import { EntityId } from '@airport/ground-control';
import { BaseSchemaPropertyDao, IBaseSchemaPropertyDao, ISchemaProperty } from '../generated/generated';
export interface ISchemaPropertyDao extends IBaseSchemaPropertyDao {
    findAllForEntities(entityIds: EntityId[]): Promise<ISchemaProperty[]>;
    insert(schemaProperties: ISchemaProperty[]): Promise<void>;
}
export declare class SchemaPropertyDao extends BaseSchemaPropertyDao implements ISchemaPropertyDao {
    findAllForEntities(entityIds: EntityId[]): Promise<ISchemaProperty[]>;
    insert(schemaProperties: ISchemaProperty[]): Promise<void>;
}
//# sourceMappingURL=SchemaPropertyDao.d.ts.map