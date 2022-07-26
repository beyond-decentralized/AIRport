import { IValidationEntity } from "../definition/IValidationEntity";
import { IValidationField } from "../definition/IValidationField";
import { IVNumberField } from "../definition/IVNumberField";

export const and = function <T, F extends IValidationField<T>>(
    ...conditions: (T | F)[]
): F {
    return null
}

export const between = function (
    from: number,
    to: number
): IVNumberField {
    return null
}

export const equals = function <T, F extends IValidationField<T>>(
    value: T | F
): F {
    return null
}

export const exists = function <T, E extends IValidationEntity<T>>(
    validationSpec?: T
): E {
    return null
}

export const isNull = function <T, E extends IValidationEntity<T>>(
    validationSpec?: boolean
): E {
    return null
}

export const or = function <T, F extends IValidationField<T>>(
    ...conditions: (T | F)[]
): F {
    return null
}
