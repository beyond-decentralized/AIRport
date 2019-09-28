import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                              from '@airport/air-control'
import {SchemaColumn}          from './SchemaColumn'
import {SchemaProperty}        from './SchemaProperty'
import {VersionedSchemaObject} from './VersionedSchemaObject'

/**
 * Many-to-Many between Columns and properties
 */
@Entity()
// TODO: rename table name to SCHEMA_PROPERTY_COLUMNS
@Table({
	name: 'SCHEMA_PROPERTY_COLUMNS'
})
export class SchemaPropertyColumn
	extends VersionedSchemaObject {

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'SCHEMA_COLUMN_ID', referencedColumnName: 'ID', nullable: false})
	column: SchemaColumn

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'SCHEMA_PROPERTY_ID', referencedColumnName: 'ID', nullable: false})
	property: SchemaProperty

}
