import { PropertyId } from '@airport/ground-control';
import { BaseSchemaRelationDao, IBaseSchemaRelationDao, ISchemaRelation } from '../generated/generated';
export interface ISchemaRelationDao extends IBaseSchemaRelationDao {
    findAllForProperties(propertyIds: PropertyId[]): Promise<ISchemaRelation[]>;
}
export declare class SchemaRelationDao extends BaseSchemaRelationDao implements ISchemaRelationDao {
    findAllForProperties(propertyIds: PropertyId[]): Promise<ISchemaRelation[]>;
}
