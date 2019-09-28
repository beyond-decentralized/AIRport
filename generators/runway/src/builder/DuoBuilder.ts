import {resolveRelativePath}       from '../resolve/pathResolver'
import {ImplementationFileBuilder} from './ImplementationFileBuilder'
import {PathBuilder}               from './PathBuilder'
import {IBuilder}                  from './Builder'
import {UtilityBuilder}            from './UtilityBuilder'

export class DuoBuilder
	extends UtilityBuilder {

	constructor(
		pathBuilder: PathBuilder
	) {
		super(pathBuilder, 'Duo', false)
	}

}
