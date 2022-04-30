import { Injected } from '@airport/direction-indicator';
import {
	BaseApplicationVersionDuo,
	IBaseApplicationVersionDuo
}                           from '../generated/generated'

export interface IApplicationVersionDuo
	extends IBaseApplicationVersionDuo {

}

@Injected()
export class ApplicationVersionDuo
	extends BaseApplicationVersionDuo
	implements IApplicationVersionDuo {

}
