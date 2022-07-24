import { IValidationEntity } from "./IValidationEntity";
import { IValidationField } from "./IValidationField";
import { IValidationNumber } from "./IValidationNumber";

export interface betweenFunction {
    (
        from: number,
        to: number
    ): IValidationNumber
}

export interface equalsFunction<T, F extends IValidationField<T>> {
    (
        value: T | F
    ): F
}

export interface existsFunction<T, E extends IValidationEntity<T>> {
    (
        validationSpec?: T
    ): E;
}

export interface isNullFunction<T, E extends IValidationEntity<T>> {
    (
        validationSpec?: T
    ): E
}

export interface orFunction<T, F extends IValidationField<T>> {
    (
        ...conditions: (T | F)[]
    ): F
}
