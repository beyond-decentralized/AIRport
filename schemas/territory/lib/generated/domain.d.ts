import { DbSchema } from '@airport/ground-control';
import { IApplication } from './application';
export interface IDomain {
    id: number;
    name?: string;
    applications?: IApplication[];
    schemas?: DbSchema[];
}
//# sourceMappingURL=domain.d.ts.map