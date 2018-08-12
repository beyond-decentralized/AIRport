import {
	JsonSchema,
	JsonSchemaColumn,
	JsonSchemaEntity,
	SQLDataType
}                       from '@airport/ground-control'
import {ISchemaBuilder} from '../ISchemaBuilder'

export class IndexedDbSchemaBuilder
	implements ISchemaBuilder {

	async build(
		jsonSchema: JsonSchema
	): Promise<void> {

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

	async buildTable(
		jsonTable: JsonSchemaEntity
	): Promise<void> {

		const columnDefinitions = jsonTable.columns.map((
			column
		) => ({
			key: column.name,
			props: this.getProperties(column),
			type: this.getColumnType(column)
		}))

		nSQL(jsonTable.name).model(columnDefinitions)
	}

	getProperties(
		jsonColumn: JsonSchemaColumn
	): string[] {
		const properties = [];
		if(jsonColumn.)
		if(jsonColumn.isGenerated) {
			properties.push('ai')
		}
	}

	getColumnType(
		column: JsonSchemaColumn
	): string {
		switch (column.type) {
			case SQLDataType.ANY:
				return 'string'
			case SQLDataType.BOOLEAN:
				return 'int'
			case SQLDataType.DATE:
				return 'int'
			case SQLDataType.JSON:
				return 'string'
			case SQLDataType.NUMBER:
				return 'int'
			case SQLDataType.STRING:
				return 'string'
		}
	}

}