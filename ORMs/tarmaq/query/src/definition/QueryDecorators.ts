import { PropertyDecorator } from '@airport/direction-indicator';
import {
	JSONBaseOperation
} from '@airport/ground-control';
import { FunctionsAndOperators } from './core/FunctionsAndOperators';
import { IQEntity } from './core/entity/Entity';

/**
 * Function used to add a clause to a Join
 */
export interface AddToJoinFunction<QOtm extends IQEntity, QMto extends IQEntity> {
	(
		otm: QOtm, // One-to-Many IQEntity
		mto: QMto, // Many-to-One IQEntity
		// db: IAirportDatabase, // Reference to the Airport functionality
		f: FunctionsAndOperators // Reference to all available functions and operators
	): JSONBaseOperation;
}

/**
 * Modified equivalent of Hibernate Annotation
 */
// export interface WhereJoinTableDecorator<QOtm extends IQEntity, QMto extends IQEntity>
// { ( addToJoinFunction: AddToJoinFunction<QOtm, QMto>, // Function to add to the join
// joinFunctionWithOperator?: andOperator | orOperator // How to add the function to the
// join ): PropertyDecorator; }

/**
 * Defines a sub-query that can be joined to
 */
export interface SubQueryDecorator<QOtm extends IQEntity, QMto extends IQEntity> {
	(
		addToJoinFunction: AddToJoinFunction<QOtm, QMto>, // Function to add to the join
	): PropertyDecorator;
}
