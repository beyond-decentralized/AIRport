import { VespaFieldType } from '../lingo/VespaFunctionsLingo';
import { IQEntity, IQNumberField, IQOperableField, IQStringField } from '@airport/air-control';
export declare type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer I> ? Array<DeepPartial<I>> : T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export declare function VespaFieldTypeBitmap<T>(entityConstructor: new (...args: any[]) => T, callback: (qEntity: IQEntity<T>) => IQOperableField<any, any, any, any>): VespaFieldType;
export declare function VespaFieldTypeDocument<T>(entityConstructor: new (...args: any[]) => T, fieldContainer: DeepPartial<T>): VespaFieldType;
export declare function VespaFieldTypeInt<T>(entityConstructor: new (...args: any[]) => T, callback: (qEntity: IQEntity<T>) => IQNumberField): VespaFieldType;
export declare function VespaFieldTypeLong<T>(entityConstructor: new (...args: any[]) => T, callback: (qEntity: IQEntity<T>) => IQNumberField): VespaFieldType;
export declare function VespaFieldTypeString<T>(entityConstructor: new (...args: any[]) => T, callback: (qEntity: IQEntity<T>) => IQStringField): VespaFieldType;
//# sourceMappingURL=VespaFunctionsImpl.d.ts.map