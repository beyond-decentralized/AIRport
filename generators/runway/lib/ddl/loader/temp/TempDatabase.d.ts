import { JsonApplication } from '@airport/ground-control';
import { JsonApplicationWithLastIds } from '@airport/apron';
export interface ITempDatabase {
    initialize(applications: JsonApplication[]): Promise<void>;
}
export declare class TempDatabase implements ITempDatabase {
    private tempDbInitialized;
    initialize(applications: JsonApplicationWithLastIds[]): Promise<void>;
}
//# sourceMappingURL=TempDatabase.d.ts.map