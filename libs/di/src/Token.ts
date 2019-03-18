export type Token = number

export interface DiToken<Injectable> {
}

export interface GenericDependencyInjectionError {

	DiTokenMustBeGenerisizedWithTypeOfInjectedObject(): void

}

let diTokenSeq = -1

export function diToken<I = GenericDependencyInjectionError>():DiToken<I> {
	diTokenSeq++;

	return diTokenSeq
}
