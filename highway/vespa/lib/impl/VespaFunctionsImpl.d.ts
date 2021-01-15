import { VespaFieldType } from '../lingo/VespaFunctionsLingo';
export declare type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer I> ? Array<DeepPartial<I>> : T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export declare function DocumentField<T>(entityConstructor: new (...args: any[]) => T, fieldContainer: DeepPartial<T>): VespaFieldType;
//# sourceMappingURL=VespaFunctionsImpl.d.ts.map