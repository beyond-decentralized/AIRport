import {DEPENDENCY_INJECTION}                 from '@airport/direction-indicator'
import {APPLICATION_VERSION_DUO} from '../tokens'
import {
	BaseApplicationVersionDuo,
	IBaseApplicationVersionDuo
}                           from '../generated/generated'

export interface IApplicationVersionDuo
	extends IBaseApplicationVersionDuo {

}

export class ApplicationVersionDuo
	extends BaseApplicationVersionDuo
	implements IApplicationVersionDuo {

}

DEPENDENCY_INJECTION.set(APPLICATION_VERSION_DUO, ApplicationVersionDuo)
