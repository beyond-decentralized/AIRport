import { BaseSchemaVersionDao, IBaseSchemaVersionDao, ISchemaVersion } from '../generated/generated';
export interface ISchemaVersionDao extends IBaseSchemaVersionDao {
    findAllActiveOrderBySchemaIndexAndId(): Promise<ISchemaVersion[]>;
    findByDomainNamesAndSchemaNames(domainNames: string[], schemaNames: string[]): Promise<ISchemaVersion[]>;
    insert(schemaVersions: ISchemaVersion[]): Promise<void>;
}
export declare class SchemaVersionDao extends BaseSchemaVersionDao implements ISchemaVersionDao {
    findAllActiveOrderBySchemaIndexAndId(): Promise<ISchemaVersion[]>;
    findByDomainNamesAndSchemaNames(domainNames: string[], schemaNames: string[]): Promise<ISchemaVersion[]>;
    insert(schemaVersions: ISchemaVersion[]): Promise<void>;
}
//# sourceMappingURL=SchemaVersionDao.d.ts.map