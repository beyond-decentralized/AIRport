import { DbEntity } from '@airport/ground-control';
import { MappedEntityArray } from '../../lingo/query/MappedEntityArray';
import { ISchemaUtils } from '../../lingo/utils/SchemaUtils';
/**
 * Created by Papa on 10/14/2016.
 */
export declare function newMappedEntityArray<E>(schemaUtils: ISchemaUtils, dbEntity: DbEntity): MappedEntityArray<E>;
