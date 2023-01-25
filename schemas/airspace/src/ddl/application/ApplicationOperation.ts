import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	Json,
	ManyToOne,
	Table
} from '@airport/tarmaq-entity'
import {
	DbOperation,
	Operation_LocalId,
	Operation_Name,
	Operation_Rule,
	Operation_Type
} from '@airport/ground-control'
import { ApplicationEntity } from './ApplicationEntity'
import { VersionedApplicationObject } from './VersionedApplicationObject'

@Entity()
@Table({
	name: 'APPLICATION_OPERATIONS'
})
export class ApplicationOperation
	extends VersionedApplicationObject
	implements DbOperation {

	@Id()
	@GeneratedValue()
	@DbNumber()
	@Column({ name: 'APPLICATION_OPERATION_LID', nullable: false })
	_localId: Operation_LocalId

	@Column({
		name: 'TYPE',
		nullable: false
	})
	@DbNumber()
	type?: Operation_Type

	@ManyToOne()
	@JoinColumn({
		name: 'APPLICATION_ENTITY_LID',
		referencedColumnName: 'APPLICATION_ENTITY_LID',
		nullable: false
	})
	entity?: ApplicationEntity

	@Column({ name: 'NAME', nullable: false })
	@DbString()
	name?: Operation_Name

	@Column({ name: 'RULE', nullable: false })
	@Json()
	rule?: Operation_Rule

}
