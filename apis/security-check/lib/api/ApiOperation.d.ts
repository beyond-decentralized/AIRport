import { DbEntity } from "@airport/ground-control";
export interface IApiOperation {
    parameters: IApiParameter[];
}
export interface IApiParameter {
    kind: ApiObjectKind;
    isRest: boolean;
}
export interface IApiTypeUnionParameter extends IApiParameter {
    unionTypes: IApiParameter[];
}
export interface IApiArrayParameter extends IApiParameter {
    ofType: IApiParameter;
}
export interface IApiObjectParameter extends IApiParameter {
    properties: IApiObjectPropertyParameter[];
}
export interface IApiObjectPropertyParameter extends IApiParameter {
    propertyName: string;
    propertyType: IApiParameter;
}
export interface IApiDbEntityParameter extends IApiParameter {
    dbEntity: DbEntity;
}
export interface IApiValueParameter<V = boolean | number | string> extends IApiParameter {
    value: V;
}
export declare enum ApiObjectKind {
    ARRAY = 0,
    BOOLEAN = 1,
    BOOLEAN_VALUE = 2,
    DATE = 3,
    DB_ENTITY = 4,
    NUMBER = 5,
    NUMBER_VALUE = 6,
    OBJECT = 7,
    STRING = 8,
    STRING_VALUE = 9,
    TYPE_UNION = 10
}
//# sourceMappingURL=ApiOperation.d.ts.map