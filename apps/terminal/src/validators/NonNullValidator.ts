import {DI}                 from '@airport/di'
import {
	DbColumn,
	DbEntity,
	JsonInsertValues,
	repositoryEntity
}                           from '@airport/ground-control'
import {NON_NULL_VALIDATOR} from '../diTokens'

export interface INonNullValidator {

	validate(
		entity: any,
		jsonInsertValues: JsonInsertValues,
		dbEntity: DbEntity
	): void

}

export class NonNullValidator
	implements INonNullValidator {

	validate(
		entity: any,
		jsonInsertValues: JsonInsertValues,
		dbEntity: DbEntity
	): void {
		const values  = jsonInsertValues.V
		const columns = dbEntity.columns

		const columnMapByIndex: { [index: number]: DbColumn } = {}
		for (const column of columns) {
			columnMapByIndex[column.index] = column
		}

		let draftColumnIndex: number

		const presentColumns: DbColumn[] = jsonInsertValues.C.map(
			columnIndex => {
				const column = columnMapByIndex[columnIndex]

				if (column.name === repositoryEntity.IS_DRAFT) {
					draftColumnIndex = columnIndex
				}

				return columnMapByIndex[columnIndex]
			})

		for (let i = 0; i < values.length; i++) {
			const entityValues       = values[i]
			let isDraft              = false
			let hasNonNullViolations = false

			for (let j = 0; j < presentColumns.length; j++) {

				const column = presentColumns[j]
				if (column.isGenerated) {
					continue
				}

				const value = entityValues[j]

				if (j === draftColumnIndex) {
					isDraft = value
				}

				if (column.notNull
					&& value === null || value === undefined) {
					hasNonNullViolations = true
				}
			}

			if (hasNonNullViolations && !isDraft) {
				throw new Error(`Entity ${i} has null values for "NOT NULL" columns is not a "draft".`)
			}
		}

	}

}

DI.set(NON_NULL_VALIDATOR, NonNullValidator)
