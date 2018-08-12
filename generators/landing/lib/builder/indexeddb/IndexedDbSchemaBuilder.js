"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const nano_sql_1 = require("nano-sql");
class IndexedDbSchemaBuilder {
    async build(jsonSchema) {
        /*
        // Or declare database models and store data in nanoSQL, using it as a self contained RDBMS
nSQL('users') //  "users" is our table name.
.model([ // Declare data model
    {key:'id',type:'int',props:['pk','ai']}, // pk == primary key, ai == auto incriment
    {key:'name',type:'string'},
    {key:'age', type:'int'}
])
.connect() // Init the data store for usage. (only need to do this once)
         */
    }
    async buildTable(jsonTable) {
        const ;
        const columnDefinitions = jsonTable.columns.map((column) => ({
            key: column.name,
            props: this.getProperties(column),
            type: this.getColumnType(column)
        }));
        nano_sql_1.nSQL(jsonTable.name).model(columnDefinitions);
    }
    getProperties(jsonTable, jsonColumn) {
        const properties = [];
        if (jsonColumn.isGenerated) {
            properties.push('ai');
        }
        for (const index of jsonTable.tableConfig.indexes) {
            for (const column of index.columnList) {
                if (column === jsonColumn.name)
                    ;
            }
        }
        for (const propertyRef of jsonColumn.propertyRefs) {
        }
    }
    getColumnType(column) {
        switch (column.type) {
            case ground_control_1.SQLDataType.ANY:
                return 'any';
            case ground_control_1.SQLDataType.BOOLEAN:
                return 'bool';
            case ground_control_1.SQLDataType.DATE:
                return 'number';
            case ground_control_1.SQLDataType.JSON:
                return 'string';
            case ground_control_1.SQLDataType.NUMBER:
                return 'number';
            case ground_control_1.SQLDataType.STRING:
                return 'string';
        }
    }
}
exports.IndexedDbSchemaBuilder = IndexedDbSchemaBuilder;
//# sourceMappingURL=IndexedDbSchemaBuilder.js.map