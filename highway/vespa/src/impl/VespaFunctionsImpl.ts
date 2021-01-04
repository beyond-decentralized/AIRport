import { VespaFieldType } from '../lingo/VespaFunctionsLingo';
import { IQEntity, IQNumberField, IQOperableField, IQStringField } from '@airport/air-control';

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer I>
    ? Array<DeepPartial<I>>
    : T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export function VespaFieldTypeBitmap<T>(
  entityConstructor: new (...args: any[]) => T,
  callback: (qEntity: IQEntity<T>) => IQOperableField<any, any, any, any>,
): VespaFieldType {
  return null;
}

export function VespaFieldTypeDocument<T>(
  entityConstructor: new (...args: any[]) => T,
  fieldContainer: DeepPartial<T>,
): VespaFieldType {
  return null;
}

export function VespaFieldTypeInt<T>(
  entityConstructor: new (...args: any[]) => T,
  callback: (qEntity: IQEntity<T>) => IQNumberField,
): VespaFieldType {
  return null;
}

export function VespaFieldTypeLong<T>(
  entityConstructor: new (...args: any[]) => T,
  callback: (qEntity: IQEntity<T>) => IQNumberField,
): VespaFieldType {
  return null;
}

export function VespaFieldTypeString<T>(
  entityConstructor: new (...args: any[]) => T,
  callback: (qEntity: IQEntity<T>) => IQStringField,
): VespaFieldType {
  return null;
}