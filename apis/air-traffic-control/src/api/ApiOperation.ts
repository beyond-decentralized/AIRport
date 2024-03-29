import { DbEntity } from "@airport/ground-control";

export interface IApiOperation {
    isAsync: boolean
    parameters: IApiParameter[]
}

export interface IApiParameter {
    isRest: boolean // only applies to the last parameter in the API method
    text: string
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
