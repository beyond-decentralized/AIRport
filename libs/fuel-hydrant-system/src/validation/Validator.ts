import {DEPENDENCY_INJECTION}          from '@airport/direction-indicator'
import {
	ColumnIndex,
	DbColumn,
	DbEntity,
	JSONRelation,
	ApplicationIndex,
	TableIndex
}                    from '@airport/ground-control'
import {Q_VALIDATOR} from '../tokens'

/**
 * Created by Papa on 11/1/2016.
 */

export interface IValidator {

	validateReadFromEntity(
		relation: JSONRelation
	): void;

	validateReadProperty(
		dbColumn: DbColumn,
	): void;

	validateUpdateProperty(
		propertyName: string,
		dbEntity: DbEntity,
	): void;

	validateUpdateColumn(
		dbColumn: DbColumn,
	): void;

	validateInsertQEntity(
		dbEntity: DbEntity,
	): void;

	validateReadQEntityProperty(
		applicationIndex: ApplicationIndex,
		tableIndex: TableIndex,
		columnIndex: ColumnIndex,
	): void;

	validateReadQEntityManyToOneRelation(
		applicationIndex: ApplicationIndex,
		tableIndex: TableIndex,
		columnIndex: ColumnIndex,
	): void;

	addFunctionAlias(functionAlias: string): void;

	addSubQueryAlias(subQueryAlias: string): void;

	validateAliasedFieldAccess(fieldAlias: string): void;
}

export class QValidator
	implements IValidator {

	validateInsertQEntity(
		dbEntity: DbEntity
	): void {
	}

	validateReadFromEntity(relation: JSONRelation) {
	}

	validateReadProperty(
		dbColumn: DbColumn,
	): void {
	}

	validateUpdateProperty(
		propertyName: string,
		dbEntity: DbEntity,
	): void {
	}

	validateUpdateColumn(
		dbColumn: DbColumn,
	): void {
	}

	validateReadQEntityProperty(
		applicationIndex: ApplicationIndex,
		tableIndex: TableIndex,
		columnIndex: ColumnIndex,
	): void {
	}

	validateReadQEntityManyToOneRelation(
		applicationIndex: ApplicationIndex,
		tableIndex: TableIndex,
		columnIndex: ColumnIndex,
	): void {
	}

	addFunctionAlias(functionAlias: string): void {
	}

	addSubQueryAlias(subQueryAlias: string): void {
	}

	validateAliasedFieldAccess(fieldAlias: string): void {
	}

}

DEPENDENCY_INJECTION.set(Q_VALIDATOR, QValidator)
