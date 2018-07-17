/**
 * Created by Papa on 8/20/2016.
 */
export const Id = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
export const Column = function (columnConfiguration) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
export const JoinColumn = function (joinColumnConfiguration) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
export const JoinColumns = function (joinColumnConfigurations) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
/**
 * Function used to add a clause to a Join
 export interface AddToJoinFunction<QOtm extends IQEntity, QMto extends IQEntity> {
    (
        otm: QOtm, // One-to-Many IQEntity
        mto: QMto // Many-to-One IQEntity
    ): JSONBaseOperation;
}
 */
// export const WhereJoinTable: WhereJoinTableDecorator<any, any> = function <QOtm extends IQEntityInternal, QMto extends IQEntityInternal>(
// 	addToJoinFunction: AddToJoinFunction<QOtm, QMto>, // Function to add to the join
// 	joinFunctionWithOperator?: andOperator | orOperator // How to add the function to the join
// ) {
// 	return function (
// 		targetObject: any,
// 		propertyKey: string
// 	) {
// 		// No runtime logic required.
// 	}
// };
export const SubQuery = function (addToJoinFunction) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
export const RJoinColumn = function (rJoinColumnConfiguration) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
export const RJoinColumns = function (joinColumnConfigurations) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
export const Json = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
export const DbAny = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
export const DbBoolean = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
export const DbDate = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
export const DbNumber = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
export const DbString = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
export const Transient = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
export const ManyToOne = function (elements) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
export const OneToMany = function (elements) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
export const GeneratedValue = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
//# sourceMappingURL=ColumnDecorators.js.map