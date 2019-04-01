export interface DiToken<Injectable> {
}
export interface GenericDependencyInjectionError {
    DiTokenMustBeGenerisizedWithTypeOfInjectedObject(): void;
}
export declare function diToken<I = GenericDependencyInjectionError>(): DiToken<I>;
