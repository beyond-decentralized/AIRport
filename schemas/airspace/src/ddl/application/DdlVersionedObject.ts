import { DbVersionedObject } from '@airport/ground-control'
import {
	JoinColumn,
	ManyToOne,
	MappedSuperclass
} from '@airport/tarmaq-entity'
import { DdlApplicationVersion } from './DdlApplicationVersion'

@MappedSuperclass()
export class DdlVersionedObject
	implements DbVersionedObject {

	@ManyToOne()
	@JoinColumn({
		name: 'DEPRECATED_SINCE_DB_APPLICATION_VERSION_LID',
		referencedColumnName: 'DB_APPLICATION_VERSION_LID'
	})
	deprecatedSinceVersion?: DdlApplicationVersion

	@ManyToOne()
	@JoinColumn({
		name: 'REMOVED_IN_DB_APPLICATION_VERSION_LID',
		referencedColumnName: 'DB_APPLICATION_VERSION_LID'
	})
	removedInVersion?: DdlApplicationVersion

	@ManyToOne()
	@JoinColumn({
		name: 'SINCE_DB_APPLICATION_VERSION_LID',
		referencedColumnName: 'DB_APPLICATION_VERSION_LID', nullable: false
	})
	sinceVersion: DdlApplicationVersion

}
