import { IApplicationVersion } from "./IApplication"

export type AppApiClass_LocalId = number
export type AppApiClass_Name = string

export interface AppApiClass {

    _localId: AppApiClass_LocalId
    applicationVersion: IApplicationVersion
    name: AppApiClass_Name
    operationMapByName?: { [operationName: AppApiOperation_Name]: AppApiOperation }
    operations: AppApiOperation[]

}

export type AppApiOperation_LocalId = number
export type AppApiOperation_IsAsync = boolean
export type AppApiOperation_Name = string

export interface AppApiOperation {

    _localId: AppApiOperation_LocalId
    isAsync: AppApiOperation_IsAsync
    apiClass: AppApiClass
    name: AppApiOperation_Name
    parameters: AppApiParameter[]
    returnType: AppApiReturnType[]

}

export type AppApiParameter_Index = number
export type AppApiParameter_IsArray = boolean
export type AppApiParameter_IsRest = boolean
export type AppApiParameter_LocalId = number
export type AppApiParameter_Optional = boolean
export type AppApiParameter_Text = string

export interface AppApiParameter {

    _localId: AppApiParameter_LocalId
    index: AppApiParameter_Index
    isRest: AppApiParameter_IsRest
    operation: AppApiOperation
    text: AppApiParameter_Text

}

export type AppApiReturnType_IsArray = boolean
export type AppApiReturnType_LocalId = number
export type AppApiReturnType_Type = string

export interface AppApiReturnType {

    _localId: AppApiReturnType_LocalId
    isArray: AppApiReturnType_IsArray
    operation: AppApiOperation
    type: AppApiReturnType_Type

}
