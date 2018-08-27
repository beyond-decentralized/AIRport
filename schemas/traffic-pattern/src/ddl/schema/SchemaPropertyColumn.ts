import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                        from '@airport/air-control'
import {ISchemaColumn}   from '../../generated/schema/qschemacolumn'
import {ISchemaProperty} from '../../generated/schema/qschemaproperty'

/**
 * Many-to-Many between Columns and properties
 */
@Entity()
@Table({
	name: 'SCHEMA_COLUMN_PROPERTIES'
})
export class SchemaPropertyColumn {

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'COLUMN_ID', referencedColumnName: 'ID'})
	column: ISchemaColumn

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'PROPERTY_ID', referencedColumnName: 'ID'})
	property: ISchemaProperty

}