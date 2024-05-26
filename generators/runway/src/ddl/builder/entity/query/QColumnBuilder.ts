import {
	IBuilder,
} from '../../Builder'
import { SColumn } from '../../application/SProperty'
import { getQColumnFieldInterface, IQCoreEntityBuilder } from './common'

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

		return `${this.ensureValidName(column.name)}: ${column.type}`
	}

	build(): string {
		throw new Error(`Not Implemented.`)
	}

	buildInterfaceDefinition(
		optional: boolean = true,
		forInternalInterfaces: boolean = true
	): string {
		const column = this.sColumn
		const name = this.ensureValidName(column.name)
		let type = column.type
		if (type === 'Json') {
			type = 'string'
		}
		let operableFieldSuffix = ''
		if (forInternalInterfaces) {
			operableFieldSuffix = ' | ' + getQColumnFieldInterface(column)
		}
		return `${name}${optional ? '?' : ''}: ${type}${operableFieldSuffix}`

	}

	private ensureValidName(
		columnName: string
	): string {
		if (/[0-9]/.test(columnName.substring(0, 1))) {
			return '_' + columnName
		}
		return columnName
	}

}
