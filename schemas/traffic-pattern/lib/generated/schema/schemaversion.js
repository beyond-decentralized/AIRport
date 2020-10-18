import { SchemaEntity, } from '../../ddl/schema/SchemaEntity';
import { SchemaReference, } from '../../ddl/schema/SchemaReference';
{
    [entityName, string];
    SchemaEntity;
}
;
referencesMapByName ?  : I;
{
    [schemaName, string];
    SchemaReference;
}
;
referencedByMapByName ?  : I;
{
    [schemaName, string];
    SchemaReference;
}
;
//# sourceMappingURL=schemaversion.js.map