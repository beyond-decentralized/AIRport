export * from './DDLManager';
export * from './PostgreQueryAdaptor';
export * from './PostgreSchemaBuilder';
export * from './PostgreSqlDriver';
export * from './PostgreSqlSchemaBuilder';
export * from './PostgreTransaction';
export declare function startDb(domainName: string, connectionString: string): Promise<void>;
export declare function closeDb(): Promise<void>;
//# sourceMappingURL=index.d.ts.map