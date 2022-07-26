import { IEntityVDescriptor } from "../definition/IEntityVDescriptor";
import { IValidationField } from "../definition/IValidationField";
import { IVNumberField } from "../definition/IVNumberField";

export const and = function <T, F extends IValidationField<T>>(
    ...conditions: F[]
): F {
    return null
}

export const between = function (
    from: number,
    to: number
): IVNumberField {
    return null
}

export const value = function <T, F extends IValidationField<T>>(
    value: T
): F {
    return null
}

export const equals = function <T, F extends IEntityVDescriptor<T>>(
    value: F
): F {
    return null
}

export const exists = function <T, E extends IEntityVDescriptor<T>>(
    validationSpec?: E
): E {
    return null
}

export const isNull = function <T, E extends IEntityVDescriptor<T>>(
    validationSpec?: boolean
): E {
    return null
}

export const or = function <T, F extends IValidationField<T>>(
    ...conditions: F[]
): F {
    return null
}
