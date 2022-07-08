import { JSONBaseOperation } from '@airport/ground-control';
import { FunctionsAndOperators } from './core/FunctionsAndOperators';
import { PropertyDecorator } from './core/metadata/decorators';
import { IQEntity } from './core/entity/Entity';
/**
 * Function used to add a clause to a Join
 */
export interface AddToJoinFunction<QOtm extends IQEntity, QMto extends IQEntity> {
    (otm: QOtm, // One-to-Many IQEntity
    mto: QMto, // Many-to-One IQEntity
    f: FunctionsAndOperators): JSONBaseOperation;
}
/**
 * Modified equivalent of Hibernate Annotation
 */
/**
 * Defines a sub-query that can be joined to
 */
export interface SubQueryDecorator<QOtm extends IQEntity, QMto extends IQEntity> {
    (addToJoinFunction: AddToJoinFunction<QOtm, QMto>): PropertyDecorator;
}
//# sourceMappingURL=QueryDecorators.d.ts.map