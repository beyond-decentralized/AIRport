import {DI}                 from '@airport/di'
import {SCHEMA_VERSION_DUO} from '../tokens'
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

DI.set(SCHEMA_VERSION_DUO, ApplicationVersionDuo)
