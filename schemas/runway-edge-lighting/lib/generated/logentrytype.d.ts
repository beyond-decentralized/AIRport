import { IApplicationPackage, IPackagedUnit } from '@airport/territory';
import { ILogEntry } from './logentry';
export interface ILogEntryType {
    id: number;
    level?: string;
    text?: string;
    applicationPackage?: IApplicationPackage;
    packagedUnit?: IPackagedUnit;
    logEntries?: ILogEntry[];
}
//# sourceMappingURL=logentrytype.d.ts.map