import { JsonSchema } from '@airport/ground-control';
export * from './DDLManager';
export * from './MySqlDriver';
export * from './MySqlQueryAdaptor';
export * from './MySqlSchemaBuilder';
export * from './MySqlSequenceGenerator';
export * from './MySqlTransaction';
export declare function startDb(domainName: string, ...schemas: JsonSchema[]): Promise<void>;
export declare function closeDb(): Promise<void>;
//# sourceMappingURL=index.d.ts.map