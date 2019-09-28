import {PathBuilder}    from './PathBuilder'
import {UtilityBuilder} from './UtilityBuilder'

export class DaoBuilder
	extends UtilityBuilder {

	constructor(
		pathBuilder: PathBuilder
	) {
		super(pathBuilder, 'Dao', false)
	}

}
