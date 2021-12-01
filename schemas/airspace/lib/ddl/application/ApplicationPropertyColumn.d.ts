import { ApplicationColumn } from './ApplicationColumn';
import { ApplicationProperty } from './ApplicationProperty';
import { VersionedApplicationObject } from './VersionedApplicationObject';
/**
 * Many-to-Many between Columns and properties
 */
export declare class ApplicationPropertyColumn extends VersionedApplicationObject {
    column: ApplicationColumn;
    property: ApplicationProperty;
}
//# sourceMappingURL=ApplicationPropertyColumn.d.ts.map