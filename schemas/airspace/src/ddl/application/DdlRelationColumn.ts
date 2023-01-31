import { DbRelationColumn, DbRelationColumn_LocalId } from '@airport/ground-control';
import {
	Column,
	DbNumber,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from '@airport/tarmaq-entity'
import { DdlColumn } from './DdlColumn'
import { DdlRelation } from './DdlRelation'
import { DdlVersionedObject } from './DdlVersionedObject'

@Entity()
@Table({
	name: 'DB_RELATION_COLUMNS'
})
export class DdlRelationColumn
	extends DdlVersionedObject
	implements DbRelationColumn {

	@Id()
	@Column({ name: 'DB_RELATION_COLUMN_LID' })
	@DbNumber()
	_localId: DbRelationColumn_LocalId

	@ManyToOne()
	@JoinColumn({
		name: 'MANY_DB_COLUMN_LID',
		referencedColumnName: 'DB_COLUMN_LID',
		nullable: false
	})
	manyColumn?: DdlColumn

	@ManyToOne()
	@JoinColumn({
		name: 'ONE_DB_COLUMN_LID',
		referencedColumnName: 'DB_COLUMN_LID', nullable: false
	})
	oneColumn?: DdlColumn

	@ManyToOne()
	@JoinColumn({
		name: 'MANY_DB_RELATION_LID',
		referencedColumnName: 'DB_RELATION_LID'
	})
	manyRelation?: DdlRelation

	@ManyToOne()
	@JoinColumn({
		name: 'ONE_DB_RELATION_LID',
		referencedColumnName: 'DB_RELATION_LID'
	})
	oneRelation?: DdlRelation

	@ManyToOne()
	@JoinColumn({
		name: 'PARENT_DB_RELATION_LID',
		referencedColumnName: 'DB_RELATION_LID'
	})
	parentRelation?: DdlRelation

}
