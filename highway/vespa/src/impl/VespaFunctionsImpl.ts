import { VespaFieldType } from '../lingo/VespaFunctionsLingo';

export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends Array<infer I>
	                 ? Array<DeepPartial<I>>
	                 : T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export function DocumentField<T>(
	entityConstructor: new (...args: any[]) => T,
	fieldContainer: DeepPartial<T>,
): VespaFieldType {
	return null;
}
