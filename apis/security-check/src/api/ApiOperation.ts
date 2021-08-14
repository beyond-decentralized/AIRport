import { DbEntity } from "@airport/ground-control";

export interface IApiOperation {
    parameters: IApiParameter[]
}

export interface IApiParameter {
    kind: ApiObjectKind
    isRest: boolean // only applies to the last parameter in the API method
}

export interface IApiTypeUnionParameter
    extends IApiParameter {
    unionTypes: IApiParameter[]
}

export interface IApiArrayParameter
    extends IApiParameter {
    ofType: IApiParameter
}

export interface IApiObjectParameter
    extends IApiParameter {
    properties: IApiObjectPropertyParameter[]
}

export interface IApiObjectPropertyParameter
    extends IApiParameter {
    propertyName: string
    propertyType: IApiParameter
}

export interface IApiDbEntityParameter
    extends IApiParameter {
    dbEntity: DbEntity
}

export interface IApiValueParameter<V = boolean | number | string>
    extends IApiParameter {
    value: V
}

export enum ApiObjectKind {
    ARRAY,
    BOOLEAN,
    BOOLEAN_VALUE,
    DATE,
    DB_ENTITY,
    NUMBER,
    NUMBER_VALUE,
    OBJECT,
    STRING,
    STRING_VALUE,
    TYPE_UNION
}
