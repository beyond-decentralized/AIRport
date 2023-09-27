import {
	Column,
	DbNumber,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from '@airport/tarmaq-entity'
import { IApplicationReference_Index, IApplicationReference } from '@airport/ground-control'
import { DdlApplicationVersion } from './DdlApplicationVersion'
import { DdlVersionedObject } from '../DdlVersionedObject'

@Entity()
@Table({
	name: 'DB_APPLICATION_REFERENCES'
})
export class DdlApplicationReference
	extends DdlVersionedObject
	implements IApplicationReference {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'OWN_DB_APPLICATION_VERSION_LID',
		referencedColumnName: 'DB_APPLICATION_VERSION_LID', nullable: false
	})
	ownApplicationVersion: DdlApplicationVersion

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'REFERENCED_DB_APPLICATION_VERSION_LID',
		referencedColumnName: 'DB_APPLICATION_VERSION_LID', nullable: false
	})
	referencedApplicationVersion: DdlApplicationVersion

	@Column({ name: 'DB_APPLICATION_REFERENCE_INDEX', nullable: false })
	@DbNumber()
	index: IApplicationReference_Index

}
