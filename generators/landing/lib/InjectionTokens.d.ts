import { Token } from 'typedi/Token';
import { ISchemaBuilder } from './builder/ISchemaBuilder';
import { ISchemaChecker } from './checker/SchemaChecker';
import { ISchemaInitializer } from './SchemaInitializer';
export declare const SchemaBuilderToken: Token<ISchemaBuilder>;
export declare const SchemaCheckerToken: Token<ISchemaChecker>;
export declare const SchemaInitializerToken: Token<ISchemaInitializer>;
export declare const SchemaLocatorToken: Token<ISchemaBuilder>;
