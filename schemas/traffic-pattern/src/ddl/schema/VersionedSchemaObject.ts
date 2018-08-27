import {MappedSuperclass} from '@airport/air-control'

@MappedSuperclass()
export class VersionedSchemaObject {

	sinceVersion: ObjectSinceVersion
	untilVersion: ObjectUtilVersion

}