import { PropertyDocEntry } from '../parser/DocEntry';
/**
 * Created by Papa on 4/25/2016.
 */
export interface IBuilder {
    build(...args: any[]): string;
}
export interface MemberData {
    definitions: string;
}
export declare function getPropertyFieldType(//
propertyDocEntry: PropertyDocEntry): string;
export declare function getPropertyJSONOperationInterface(//
propertyDocEntry: PropertyDocEntry): string;
export declare function getPropertyTypedOperationInterface(//
propertyDocEntry: PropertyDocEntry): string;
export declare function getRelationFieldType(//
entityProperty: PropertyDocEntry): string;
//# sourceMappingURL=Builder.d.ts.map