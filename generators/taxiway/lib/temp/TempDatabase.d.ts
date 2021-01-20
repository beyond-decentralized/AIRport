import { JsonSchema } from '@airport/ground-control';
export interface ITempDatabase {
    initialize(schemas: JsonSchema[]): Promise<void>;
}
export declare class TempDatabase implements ITempDatabase {
    private tempDbInitialized;
    initialize(schemas: JsonSchema[]): Promise<void>;
}
//# sourceMappingURL=TempDatabase.d.ts.map