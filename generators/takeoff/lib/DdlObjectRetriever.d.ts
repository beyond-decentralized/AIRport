import type { LastIds } from '@airport/security-check';
import { DdlObjects } from '@airport/terminal-map';
export interface IDdlObjectRetriever {
    lastIds: LastIds;
    retrieveDdlObjects(): Promise<DdlObjects>;
}
export declare class DdlObjectRetriever implements IDdlObjectRetriever {
    lastIds: LastIds;
    retrieveDdlObjects(): Promise<DdlObjects>;
}
//# sourceMappingURL=DdlObjectRetriever.d.ts.map