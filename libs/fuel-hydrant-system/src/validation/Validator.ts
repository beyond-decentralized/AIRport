import {
	Injected
} from '@airport/direction-indicator'
import {
	DbColumn_Index,
	DbColumn,
	DbEntity,
	QueryRelation,
	Application_Index,
	DbEntity_TableIndex
} from '@airport/ground-control'

/**
 * Created by Papa on 11/1/2016.
 */

export interface IValidator {

	validateReadFromEntity(
		queryRelation: QueryRelation
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
		applicationIndex: Application_Index,
		entityIndex: DbEntity_TableIndex,
		columnIndex: DbColumn_Index,
	): void;

	validateReadQEntityManyToOneRelation(
		applicationIndex: Application_Index,
		entityIndex: DbEntity_TableIndex,
		columnIndex: DbColumn_Index,
	): void;

	addFunctionAlias(functionAlias: string): void;

	addSubQueryAlias(subQueryAlias: string): void;

	validateAliasedFieldAccess(fieldAlias: string): void;
}

@Injected()
export class QValidator
	implements IValidator {

	validateInsertQEntity(
		dbEntity: DbEntity
	): void {
	}

	validateReadFromEntity(
		queryRelation: QueryRelation
	) {
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
		applicationIndex: Application_Index,
		entityIndex: DbEntity_TableIndex,
		columnIndex: DbColumn_Index,
	): void {
	}

	validateReadQEntityManyToOneRelation(
		applicationIndex: Application_Index,
		entityIndex: DbEntity_TableIndex,
		columnIndex: DbColumn_Index,
	): void {
	}

	addFunctionAlias(functionAlias: string): void {
	}

	addSubQueryAlias(subQueryAlias: string): void {
	}

	validateAliasedFieldAccess(fieldAlias: string): void {
	}

}
