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
export const SubQuery = function (addToJoinFunction) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
//# sourceMappingURL=QueryDecorators.js.map