import {IQEntityInternal} from '../../../../lingo/core/entity/Entity'
import {
	AddToJoinFunction,
	ColumnConfiguration,
	ColumnDecorator,
	CoreJoinColumnConfiguration,
	GeneratedValueDecorator,
	IdDecorator,
	JoinColumnConfiguration,
	JoinColumnDecorator,
	JoinColumnsDecorator,
	ManyToOneDecorator,
	ManyToOneElements,
	OneToManyDecorator,
	OneToManyElements,
	SequenceGeneratorDecorator,
	SubQueryDecorator,
	TraditionalServerSeqDecorator,
	TransientDecorator
} from '../../../../lingo/core/entity/metadata/ColumnDecorators'

/**
 * Created by Papa on 8/20/2016.
 */

export const Id: IdDecorator = function () {
	return function (
		targetObject: any,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}


export const Column: ColumnDecorator = function (columnConfiguration: ColumnConfiguration) {
	return function (
		targetObject: any,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}

export const JoinColumn: JoinColumnDecorator = function (joinColumnConfiguration: JoinColumnConfiguration) {
	return function (
		targetObject: any,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}

export const JoinColumns: JoinColumnsDecorator = function (joinColumnConfigurations: CoreJoinColumnConfiguration[]) {
	return function (
		targetObject: any,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}

/**
 * Function used to add a clause to a Join
 export interface AddToJoinFunction<QOtm extends IQEntity, QMto extends IQEntity> {
	(
		otm: QOtm, // One-to-Many IQEntity
		mto: QMto // Many-to-One IQEntity
	): JSONBaseOperation;
}
 */

// export const WhereJoinTable: WhereJoinTableDecorator<any, any> = function <QOtm extends
// IQEntityInternal, QMto extends IQEntityInternal>( addToJoinFunction: AddToJoinFunction<QOtm,
// QMto>, // Function to add to the join joinFunctionWithOperator?: andOperator | orOperator //
// How to add the function to the join ) { return function ( targetObject: any, propertyKey:
// string ) { // No runtime logic required. } };

export const SubQuery: SubQueryDecorator<any, any> = function <QOtm extends IQEntityInternal, QMto extends IQEntityInternal>(
	addToJoinFunction: AddToJoinFunction<QOtm, QMto>, // Function to add to the join
) {
	return function (
		targetObject: any,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}


/**
 * Non-JPA decorator.
 *
 * Marks an object property as a join column
 * with a repository join column attached automatically.
 */
export interface RJoinColumnDecorator {
	(rJoinColumnConfiguration: JoinColumnConfiguration): PropertyDecorator;
}

export const RJoinColumn: RJoinColumnDecorator = function (rJoinColumnConfiguration: JoinColumnConfiguration) {
	return function (
		targetObject: any,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}

export const RJoinColumns: JoinColumnsDecorator = function (joinColumnConfigurations: CoreJoinColumnConfiguration[]) {
	return function (
		targetObject: any,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}

/**
 * Non-JPA decorator.
 *
 * Marks the column as a json object. Internally stored as a string.
 * During retrieves, the value will be parsed using JSON.parse.
 * During persists, the value will be serialized using JSON.stringify.
 */
export interface JsonDecorator {
	(): PropertyDecorator;
}

export const Json: JsonDecorator = function () {
	return function (
		targetObject: any,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}

/**
 * Non-JPA decorator.
 *
 * Marks the column as a "any" terminal type.
 */
export interface DbAnyDecorator {
	(): PropertyDecorator;
}

export const DbAny: DbAnyDecorator = function () {
	return function (
		targetObject: any,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}

/**
 * Non-JPA decorator.
 *
 * Marks the column as a "boolean" type.
 */
export interface DbBooleanDecorator {
	(): PropertyDecorator;
}

export const DbBoolean: DbBooleanDecorator = function () {
	return function (
		targetObject: any,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}

/**
 * Non-JPA decorator.
 *
 * Marks the column as a boolean type.
 */
export interface DbDateDecorator {
	(): PropertyDecorator;
}

export const DbDate: DbDateDecorator = function () {
	return function (
		targetObject: any,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}

/**
 * Non-JPA decorator.
 *
 * Marks the column as a boolean type.
 */
export interface DbNumberDecorator {
	(): PropertyDecorator;
}

export const DbNumber: DbNumberDecorator = function () {
	return function (
		targetObject: any,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}

/**
 * Non-JPA decorator.
 *
 * Marks the column as a boolean type.
 */
export interface DbStringDecorator {
	(): PropertyDecorator;
}

export const DbString: DbStringDecorator = function () {
	return function (
		targetObject: any,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}


export const Transient: TransientDecorator = function () {
	return function (
		targetObject: any,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}

export const ManyToOne: ManyToOneDecorator = function (elements?: ManyToOneElements) {
	return function (
		targetObject: any,
		propertyKey: string
	) {
		// No runtime logic required.
	}

}

export const OneToMany: OneToManyDecorator = function (elements?: OneToManyElements) {
	return function (
		targetObject: any,
		propertyKey: string
	) {
		// No runtime logic required.
	}

}

export const GeneratedValue: GeneratedValueDecorator = function () {
	return function (
		targetObject: any,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}

export const SequenceGenerator: SequenceGeneratorDecorator = function () {
	return function (
		targetObject: any,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}

export const TraditionalServerSeq: TraditionalServerSeqDecorator = function () {
	return function (
		targetObject: any,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}
