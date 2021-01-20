import { DbColumn, DbProperty } from '@airport/ground-control';
import { VespaAttributeConfiguration } from '../VespaDecoratorsLingo';
export interface IVespaIndexing {
    attribute?: boolean;
    index?: boolean;
    summary?: boolean;
}
export interface IVespaField {
    attribute?: VespaAttributeConfiguration;
    indexing?: IVespaIndexing;
    name: string;
}
export interface IVespaFieldWithDbInfo extends IVespaField {
    dbColumn: DbColumn;
    dbProperty: DbProperty;
}
//# sourceMappingURL=VespaField.d.ts.map