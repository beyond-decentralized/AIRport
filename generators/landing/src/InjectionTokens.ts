import {Token}              from 'typedi/Token'
import {ISchemaBuilder}     from './builder/ISchemaBuilder'
import {ISchemaChecker}     from './checker/SchemaChecker'
import {ISchemaInitializer} from './SchemaInitializer'

export const SchemaBuilderToken     = new Token<ISchemaBuilder>()
export const SchemaCheckerToken     = new Token<ISchemaChecker>()
export const SchemaInitializerToken = new Token<ISchemaInitializer>()
export const SchemaLocatorToken     = new Token<ISchemaBuilder>()
