import {
	getColumnFieldInterface,
	IBuilder,
	IQCoreEntityBuilder
}                from '../Builder'
import {SColumn} from '../application/SProperty'

/**
 * Created by Papa on 4/25/2016.
 */

export class QColumnBuilder
	implements IBuilder {

	constructor(
		private parentBuilder: IQCoreEntityBuilder,
		public sColumn: SColumn
	) {
	}

	buildDefinition(): string {
		let column = this.sColumn

		return `${column.name}: ${column.type};`
	}

	build(): string {
		throw new Error(`Not Implemented.`)
	}

	buildInterfaceDefinition(
		optional: boolean              = true,
		forInternalInterfaces: boolean = true
	): string {
		const column = this.sColumn
		const name   = column.name
		let type     = column.type
		if (type === 'Json') {
			type = 'string'
		}
		let operableFieldSuffix = ''
		if (forInternalInterfaces) {
			operableFieldSuffix = ' | ' + getColumnFieldInterface(column)
		}
		return `${name}${optional ? '?' : ''}: ${type}${operableFieldSuffix};`

	}

}
