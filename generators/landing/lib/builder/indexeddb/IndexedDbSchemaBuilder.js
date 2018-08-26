"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
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
        const columnDefinitions = jsonTable.columns.map((column) => ({
            key: column.name,
            props: this.getProperties(column),
            type: this.getColumnType(column)
        }));
        nSQL(jsonTable.name).model(columnDefinitions);
    }
    getProperties(jsonColumn) {
        const properties = [];
        if (jsonColumn.)
            if (jsonColumn.isGenerated) {
                properties.push('ai');
            }
    }
    getColumnType(column) {
        switch (column.type) {
            case ground_control_1.SQLDataType.ANY:
                return 'string';
            case ground_control_1.SQLDataType.BOOLEAN:
                return 'int';
            case ground_control_1.SQLDataType.DATE:
                return 'int';
            case ground_control_1.SQLDataType.JSON:
                return 'string';
            case ground_control_1.SQLDataType.NUMBER:
                return 'int';
            case ground_control_1.SQLDataType.STRING:
                return 'string';
        }
    }
}
exports.IndexedDbSchemaBuilder = IndexedDbSchemaBuilder;
//# sourceMappingURL=IndexedDbSchemaBuilder.js.map