import { IApplicationPackage, IPackagedUnit } from '@airport/territory';
import { ILogEntry } from './logentry';
export interface ILogEntryType {
    id: number;
    level?: number;
    text?: string;
    applicationPackage?: IApplicationPackage;
    packagedUnit?: IPackagedUnit;
    logEntries?: ILogEntry[];
}
//# sourceMappingURL=logentrytype.d.ts.map