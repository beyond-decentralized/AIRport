import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                              from '@airport/air-control'
import {ApplicationColumn}          from './ApplicationColumn'
import {ApplicationProperty}        from './ApplicationProperty'
import {VersionedApplicationObject} from './VersionedApplicationObject'

/**
 * Many-to-Many between Columns and properties
 */
@Entity()
// TODO: rename table name to SCHEMA_PROPERTY_COLUMNS
@Table({
	name: 'SCHEMA_PROPERTY_COLUMNS'
})
export class ApplicationPropertyColumn
	extends VersionedApplicationObject {

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'SCHEMA_COLUMN_ID', referencedColumnName: 'ID', nullable: false})
	column: ApplicationColumn

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'SCHEMA_PROPERTY_ID', referencedColumnName: 'ID', nullable: false})
	property: ApplicationProperty

}
