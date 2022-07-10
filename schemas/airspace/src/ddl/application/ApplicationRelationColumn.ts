import {
	Column,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from '@airport/tarmaq-entity'
import { ApplicationColumn } from './ApplicationColumn'
import { ApplicationRelation } from './ApplicationRelation'
import { VersionedApplicationObject } from './VersionedApplicationObject'

export type ApplicationRelationColumn_LocalId = number;

@Entity()
@Table({
	name: 'APPLICATION_RELATION_COLUMNS'
})
export class ApplicationRelationColumn
	extends VersionedApplicationObject {

	@Id()
	@Column({ name: 'APPLICATION_RELATION_COLUMN_LID' })
	_localId: ApplicationRelationColumn_LocalId

	@ManyToOne()
	@JoinColumn({
		name: 'MANY_APPLICATION_COLUMN_LID',
		referencedColumnName: 'APPLICATION_COLUMN_LID',
		nullable: false
	})
	manyColumn: ApplicationColumn

	@ManyToOne()
	@JoinColumn({
		name: 'ONE_APPLICATION_COLUMN_LID',
		referencedColumnName: 'APPLICATION_COLUMN_LID', nullable: false
	})
	oneColumn: ApplicationColumn

	@ManyToOne()
	@JoinColumn({
		name: 'MANY_APPLICATION_RELATION_LID',
		referencedColumnName: 'APPLICATION_RELATION_LID'
	})
	manyRelation?: ApplicationRelation

	@ManyToOne()
	@JoinColumn({
		name: 'ONE_APPLICATION_RELATION_LID',
		referencedColumnName: 'APPLICATION_RELATION_LID'
	})
	oneRelation?: ApplicationRelation

	@ManyToOne()
	@JoinColumn({
		name: 'PARENT_RELATION_LID',
		referencedColumnName: 'APPLICATION_RELATION_LID'
	})
	parentRelation: ApplicationRelation

}
