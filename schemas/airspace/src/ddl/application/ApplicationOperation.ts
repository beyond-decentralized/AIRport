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
}                              from '@airport/air-control'
import {
	Operation_Id,
	Operation_Name,
	Operation_Rule,
	Operation_Type
}                              from '@airport/ground-control'
import {ApplicationEntity}          from './ApplicationEntity'
import {VersionedApplicationObject} from './VersionedApplicationObject'

@Entity()
@Table({
	name: 'SCHEMA_OPERATIONS'
})
export class ApplicationOperation
	extends VersionedApplicationObject {

	@Id()
	@GeneratedValue()
	@DbNumber()
	id: Operation_Id

	@Column({
		name: 'TYPE',
		nullable: false
	})
	@DbNumber()
	type: Operation_Type

	@ManyToOne()
	@JoinColumn({
		name: 'SCHEMA_ENTITY_ID',
		referencedColumnName: 'ID',
		nullable: false
	})
	entity: ApplicationEntity

	@Column({name: 'NAME', nullable: false})
	@DbString()
	name: Operation_Name

	@Column({name: 'RULE', nullable: false})
	@Json()
	rule: Operation_Rule

}
