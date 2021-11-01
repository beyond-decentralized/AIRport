import { DatabaseIndexConfiguration } from "./DatabaseIndexConfiguration";
export interface DatabaseObjectConfiguration<DIC extends DatabaseIndexConfiguration> {
    name: string;
    indexes?: PropertyIndexConfiguration | DIC[];
}
export interface PropertyIndexConfiguration {
    (entity: any): APropertyIndexConfiguration[];
}
export interface APropertyIndexConfiguration {
    property: any;
    unique: boolean;
}
export interface JsonDatabaseObjectConfiguration<DIC extends DatabaseIndexConfiguration> {
    name: string;
    columnIndexes: DIC;
    propertyIndexes: AJsonPropertyIndexConfiguration[];
}
export interface AJsonPropertyIndexConfiguration {
    propertyIndex: number;
    unique: boolean;
}
//# sourceMappingURL=DatabaseObjectConfiguration.d.ts.map