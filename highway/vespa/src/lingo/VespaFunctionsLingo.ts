import { IQOperableField } from '@airport/air-control';

export interface VespaFieldType {

}

type VespaFieldTypeBitmap<T> = (
  entityConstructor: new (...args: any[]) => T,
  fieldContainer: Partial<T>
) => VespaFieldType
type VespaFieldTypeDocument<T> = (
  entityConstructor: new (...args: any[]) => T,
  fieldContainer: Partial<T>
) => VespaFieldType
type VespaFieldTypeInt<T> = (
  entityConstructor: new (...args: any[]) => T,
  fieldContainer: Partial<T>
) => VespaFieldType
type VespaFieldTypeLong<T> = (
  entityConstructor: new (...args: any[]) => T,
  fieldContainer: Partial<T>
) => VespaFieldType
type VespaFieldTypeString<T> = (
  entityConstructor: new (...args: any[]) => T,
  fieldContainer: Partial<T>
) => VespaFieldType