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
