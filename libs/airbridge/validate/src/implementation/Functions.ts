import { IEntityVDescriptor } from "../definition/IEntityVDescriptor";
import { IValidationField } from "../definition/IValidationField";
import { IVNumberField } from "../definition/IVNumberField";
import { IVStringField } from "../definition/IVStringField";

export const and = function <T, F extends IValidationField<T>>(
    ...conditions: F[]
): F {
    throw Error('Implement')
}

export const between = function (
    from: number,
    to: number
): IVNumberField {
    throw Error('Implement')
}

export const byId = function <T, E extends IEntityVDescriptor<T>>(): E {
    throw Error('Implement')
}

export const equals = function <T, E extends IEntityVDescriptor<T>>(
    valueOrTyped?: E,
    valueIfTyped?: E
): E {
    throw Error('Implement')
}

export const exists = function <T, E extends IEntityVDescriptor<T>>(
    valueOrTyped?: E,
    valueIfTyped?: E
): E {
    throw Error('Implement')
}

export const isInteger = function (
    field: IVNumberField
): IVNumberField {
    throw Error('Implement')
}

export const isNotNull = function <T, E extends IEntityVDescriptor<T>>(
    validationSpec?: boolean
): E {
    throw Error('Implement')
}

export const isNull = function <T, E extends IEntityVDescriptor<T>>(
    validationSpec?: boolean
): E {
    throw Error('Implement')
}

export const length = function (
    from: number,
    to: number
): IVNumberField {
    throw Error('Implement')
}

export const oneOfNumbers = function <T>(
    ...values: number[]
): IVNumberField {
    throw Error('Implement')
}

export const oneOfStrings = function <T>(
    ...values: string[]
): IVStringField {
    throw Error('Implement')
}

export const or = function <T, F extends IValidationField<T>>(
    ...conditions: F[]
): F {
    throw Error('Implement')
}

export const typed = function <T, E extends IEntityVDescriptor<T>>(
    options?: {}
): E {
    throw Error('Implement')
}

export const uniqueIn = function <T, F extends IValidationField<T>>(
    value: T
): F {
    throw Error('Implement')
}

export const value = function <T, F extends IValidationField<T>>(
    value: T
): F {
    throw Error('Implement')
}
