import { IEntityVDescriptor } from "../definition/IEntityVDescriptor";
import { IValidationField } from "../definition/IValidationField";
import { IVNumberField } from "../definition/IVNumberField";
export declare const and: <T, F extends IValidationField<T>>(...conditions: F[]) => F;
export declare const between: (from: number, to: number) => IVNumberField;
export declare const value: <T, F extends IValidationField<T>>(value: T) => F;
export declare const equals: <T, E extends IEntityVDescriptor<T>>(valueOrTyped: E, valueIfTyped?: E) => E;
export declare const exists: <T, E extends IEntityVDescriptor<T>>(valueOrTyped?: E, valueIfTyped?: E) => E;
export declare const typed: <T, E extends IEntityVDescriptor<T>>(options?: {}) => E;
export declare const isNull: <T, E extends IEntityVDescriptor<T>>(validationSpec?: boolean) => E;
export declare const or: <T, F extends IValidationField<T>>(...conditions: F[]) => F;
//# sourceMappingURL=Functions.d.ts.map