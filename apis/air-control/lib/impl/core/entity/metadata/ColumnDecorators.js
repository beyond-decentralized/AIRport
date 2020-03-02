"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Papa on 8/20/2016.
 */
exports.Id = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
exports.Column = function (columnConfiguration) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
exports.JoinColumn = function (joinColumnConfiguration) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
exports.JoinColumns = function (joinColumnConfigurations) {
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
// export const WhereJoinTable: WhereJoinTableDecorator<any, any> = function <QOtm extends
// IQEntityInternal, QMto extends IQEntityInternal>( addToJoinFunction: AddToJoinFunction<QOtm,
// QMto>, // Function to add to the join joinFunctionWithOperator?: andOperator | orOperator //
// How to add the function to the join ) { return function ( targetObject: any, propertyKey:
// string ) { // No runtime logic required. } };
exports.SubQuery = function (addToJoinFunction) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
exports.RJoinColumn = function (rJoinColumnConfiguration) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
exports.RJoinColumns = function (joinColumnConfigurations) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
exports.Json = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
exports.DbAny = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
exports.DbBoolean = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
exports.DbDate = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
exports.DbNumber = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
exports.DbString = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
exports.Transient = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
exports.ManyToOne = function (elements) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
exports.OneToMany = function (elements) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
exports.GeneratedValue = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
exports.SequenceGenerator = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
exports.TraditionalServerSeq = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
//# sourceMappingURL=ColumnDecorators.js.map