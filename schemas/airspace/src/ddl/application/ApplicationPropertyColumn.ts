import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from '@airport/tarmaq-entity'
import { ApplicationColumn } from './ApplicationColumn'
import { ApplicationProperty } from './ApplicationProperty'
import { VersionedApplicationObject } from './VersionedApplicationObject'

/**
 * Many-to-Many between Columns and properties
 */
@Entity()
// TODO: rename table name to APPLICATION_PROPERTY_COLUMNS
@Table({
	name: 'APPLICATION_PROPERTY_COLUMNS'
})
export class ApplicationPropertyColumn
	extends VersionedApplicationObject {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'APPLICATION_COLUMN_LID',
		referencedColumnName: 'APPLICATION_COLUMN_LID', nullable: false
	})
	column: ApplicationColumn

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'APPLICATION_PROPERTY_LID',
		referencedColumnName: 'APPLICATION_PROPERTY_LID', nullable: false
	})
	property: ApplicationProperty

}
