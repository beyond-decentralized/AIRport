import { JsonSchema } from '@airport/ground-control';
export * from './SqlStorage';
export * from './WebSqlDriver';
export * from './WebSqlQueryAdaptor';
export * from './WebSqlTransaction';
export declare function startDb(domainName: string, ...schemas: JsonSchema[]): Promise<void>;
export declare function closeDb(): Promise<void>;
//# sourceMappingURL=index.d.ts.map