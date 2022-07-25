import {PathBuilder}               from './PathBuilder'
import {UtilityBuilder}            from './UtilityBuilder'

export class DvoBuilder
	extends UtilityBuilder {

	constructor(
		pathBuilder: PathBuilder
	) {
		super(pathBuilder, 'Dvo', false)
	}

}
