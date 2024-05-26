import { DbPropertyColumn } from '@airport/ground-control'
import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from '@airport/tarmaq-entity'
import { DdlColumn } from './DdlColumn'
import { DdlProperty } from './DdlProperty'
import { DdlVersionedObject } from '../../DdlVersionedObject'

/**
 * Many-to-Many between Columns and properties
 */
@Entity()
@Table({
	name: 'DB_PROPERTY_COLUMNS'
})
export class DdlPropertyColumn
	extends DdlVersionedObject
	implements DbPropertyColumn {

	@Id()
	@ManyToOne()
	@JoinColumn({ name: 'DB_COLUMN_LID', nullable: false })
	column: DdlColumn

	@Id()
	@ManyToOne()
	@JoinColumn({ name: 'DB_PROPERTY_LID', nullable: false })
	property: DdlProperty

}
