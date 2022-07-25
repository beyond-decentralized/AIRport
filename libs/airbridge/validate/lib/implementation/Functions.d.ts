import { IValidationEntity } from "../definition/IValidationEntity";
import { IValidationField } from "../definition/IValidationField";
import { IValidationNumber } from "../definition/IValidationNumber";
export declare const and: <T, F extends IValidationField<T>>(...conditions: (T | F)[]) => F;
export declare const between: (from: number, to: number) => IValidationNumber;
export declare const equals: <T, F extends IValidationField<T>>(value: T | F) => F;
export declare const exists: <T, E extends IValidationEntity<T>>(validationSpec?: T) => E;
export declare const isNull: <T, E extends IValidationEntity<T>>(validationSpec?: boolean) => E;
export declare const or: <T, F extends IValidationField<T>>(...conditions: (T | F)[]) => F;
//# sourceMappingURL=Functions.d.ts.map