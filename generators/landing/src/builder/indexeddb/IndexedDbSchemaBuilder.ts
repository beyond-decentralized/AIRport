import {
	JsonSchema,
	JsonSchemaColumn,
	JsonSchemaEntity,
	SQLDataType
}                       from '@airport/ground-control'
import {
	DataModel,
	nSQL
} from 'nano-sql'
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

		const

		const columnDefinitions: DataModel[] = jsonTable.columns.map((
			column
		) => ({
			key: column.name,
			props: this.getProperties(column),
			type: this.getColumnType(column)
		}))

		nSQL(jsonTable.name).model(columnDefinitions)
	}

	getProperties(
		jsonTable: JsonSchemaEntity,
		jsonColumn: JsonSchemaColumn
	): string[] {
		const properties = []
		if (jsonColumn.isGenerated) {
			properties.push('ai')
		}

		for(const index of jsonTable.tableConfig.indexes) {
			for(const column of index.columnList) {
				if(column === jsonColumn.name)
			}
		}
		for(const propertyRef of jsonColumn.propertyRefs) {

		}
	}

	getColumnType(
		column: JsonSchemaColumn
	): string {
		switch (column.type) {
			case SQLDataType.ANY:
				return 'any'
			case SQLDataType.BOOLEAN:
				return 'bool'
			case SQLDataType.DATE:
				return 'number'
			case SQLDataType.JSON:
				return 'string'
			case SQLDataType.NUMBER:
				return 'number'
			case SQLDataType.STRING:
				return 'string'
		}
	}

}