import { BaseSchemaVersionDao, IBaseSchemaVersionDao, ISchemaVersion } from '../generated/generated';
export interface ISchemaVersionDao extends IBaseSchemaVersionDao {
    findAllActiveOrderBySchemaIndexAndId(): Promise<ISchemaVersion[]>;
}
export declare class SchemaVersionDao extends BaseSchemaVersionDao implements ISchemaVersionDao {
    private schemaVersionDuo;
    constructor();
    findAllActiveOrderBySchemaIndexAndId(): Promise<ISchemaVersion[]>;
}
