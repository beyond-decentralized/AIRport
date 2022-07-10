import {
	Column,
	DbNumber,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from '@airport/tarmaq-entity'
import { ApplicationReference_Index } from '@airport/ground-control'
import { ApplicationVersion } from './ApplicationVersion'
import { VersionedApplicationObject } from './VersionedApplicationObject'

@Entity()
@Table({
	name: 'APPLICATION_REFERENCES'
})
export class ApplicationReference
	extends VersionedApplicationObject {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'OWN_APPLICATION_VERSION_LID',
		referencedColumnName: 'APPLICATION_VERSION_LID', nullable: false
	})
	ownApplicationVersion: ApplicationVersion

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'REFERENCED_APPLICATION_VERSION_LID',
		referencedColumnName: 'APPLICATION_VERSION_LID', nullable: false
	})
	referencedApplicationVersion: ApplicationVersion

	@Column({ name: 'APPLICATION_REFERENCE_INDEX', nullable: false })
	@DbNumber()
	index: ApplicationReference_Index

}
