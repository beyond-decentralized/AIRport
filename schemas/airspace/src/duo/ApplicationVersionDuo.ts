import {DI}                 from '@airport/di'
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

DI.set(APPLICATION_VERSION_DUO, ApplicationVersionDuo)
