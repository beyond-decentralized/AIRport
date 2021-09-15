import { DbEntity, TableIndex } from "../../lingo/schema/Entity";
import { ColumnIndex } from "../../lingo/schema/Property";
import { SchemaIndex } from "../../lingo/schema/Schema";
import { ColumnMap } from "./ColumnMap";
import { TableMap } from "./TableMap";
export declare class SchemaMap {
    schemaMap: {
        [schemaVersionId: string]: TableMap;
    };
    constructor(schemaMap?: {
        [schemaVersionId: string]: TableMap;
    });
    ensureEntity(entity: DbEntity, allColumns?: boolean, TableMapConstructor?: typeof TableMap): ColumnMap;
    ensure(schemaIndex: SchemaIndex, tableIndex: TableIndex, allColumns?: boolean, TableMapConstructor?: typeof TableMap): ColumnMap;
    existsByStructure(schemaIndex: SchemaIndex, tableIndex: TableIndex, columnIndex: ColumnIndex): boolean;
}
//# sourceMappingURL=SchemaMap.d.ts.map