import { DbEntity } from "@airport/ground-control";
export interface IApiOperation {
    isAsync: boolean;
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
    ARRAY = "ARRAY",
    BOOLEAN = "BOOLEAN",
    BOOLEAN_VALUE = "BOOLEAN_VALUE",
    DATE = "DATE",
    DB_ENTITY = "DB_ENTITY",
    NUMBER = "NUMBER",
    NUMBER_VALUE = "NUMBER_VALUE",
    OBJECT = "OBJECT",
    STRING = "STRING",
    STRING_VALUE = "STRING_VALUE",
    TYPE_UNION = "TYPE_UNION"
}
//# sourceMappingURL=ApiOperation.d.ts.map