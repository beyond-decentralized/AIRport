import { DatabaseIndexConfiguration } from "./DatabaseIndexConfiguration";
export interface DatabaseObjectConfiguration<DIC extends DatabaseIndexConfiguration> {
    name: string;
    indexes?: DatabaseIndexConfiguration[];
    schema?: string;
    primaryKey?: string[];
}
//# sourceMappingURL=DatabaseObjectConfiguration.d.ts.map