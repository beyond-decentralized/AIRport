import {DI} from '@airport/di'
import {DatastructureUtils} from '@airport/ground-control'
import {
	AIR_DB,
	Q_METADATA_UTILS,
	UTILS
} from '../diTokens'
import {IAirportDatabase} from '../lingo/AirportDatabase'
import {IEntityUtils} from '../lingo/utils/EntityUtils'
import {IFieldUtils} from '../lingo/utils/FieldUtils'
import {IQMetadataUtils} from '../lingo/utils/QMetadataUtils'
import {IQueryUtils} from '../lingo/utils/QueryUtils'
import {ISchemaUtils} from '../lingo/utils/SchemaUtils'
import {IUtils} from '../lingo/utils/Utils'
import {EntityUtils} from './utils/EntityUtils'
import {FieldUtils} from './utils/FieldUtils'
import {QueryUtils} from './utils/QueryUtils'
import {SchemaUtils} from './utils/SchemaUtils'

export class Utils
	extends DatastructureUtils
	implements IUtils {

	private airportDb: IAirportDatabase
	Entity: IEntityUtils
	Field: IFieldUtils
	Metadata: IQMetadataUtils
	Query: IQueryUtils
	Schema: ISchemaUtils

	constructor() {
		super()

		DI.get(
			(
				airportDb,
				Metadata
			) => {
				this.airportDb = airportDb
				this.Metadata  = Metadata
				this.Entity    = new EntityUtils(this)
				this.Field     = new FieldUtils(this)
				this.Query     = new QueryUtils(this)
				this.Schema    = new SchemaUtils(this.airportDb, this)
			}, AIR_DB, Q_METADATA_UTILS)

	}

	strsToNums(
		strings: string[]
	): number[] {
		return strings.map(
			str => parseInt(str))
	}

	objectExists(
		object: any
	): boolean {
		return object !== null && object !== undefined
	}

	valuesEqual(
		value1: any,
		value2: any,
		checkChildObjects: boolean = false
	): boolean {
		if (typeof value1 === 'object') {
			if (value1 instanceof Date) {
				if (value2 instanceof Date) {
					return value1.getTime() === value2.getTime()
				} else {
					return false
				}
			} else {
				if (typeof value2 !== 'object') {
					return false
				}
				if (!checkChildObjects) {
					// Skip child objects
					return true
				}
				let checkedKeys = {}
				for (let key in value1) {
					checkedKeys[key] = true
					if (!this.valuesEqual(value1[key], value2[key], checkChildObjects)) {
						return false
					}
				}
				for (let key in value2) {
					if (!checkedKeys[key]) {
						return false
					}
				}
				return true
			}
		}
		if (!value1) {
			if (value1 === '') {
				return value2 === ''
			} else if (value1 === false) {
				return value2 === false
			} else if (value1 === 0) {
				return value2 === 0
			}
			if (value2 === '' || value2 === false || value2 === 0) {
				return false
			}
			// treat undefined and null as same value
			return (!value2)
		}
		if (!value2) {
			return false
		}

		return value1 === value2
	}

	compareNumbers(
		number1: number,
		number2: number
	): -1 | 0 | 1 {
		if (number1 < number2) {
			return -1
		}
		if (number1 > number2) {
			return 1
		}

		return 0
	}

}

DI.set(UTILS, Utils)
