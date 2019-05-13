import {diToken}            from '@airport/di'
import {ISchemaBuilder}     from './builder/ISchemaBuilder'
import {ISchemaChecker}     from './checker/SchemaChecker'
import {ISchemaLocator}     from './locator/SchemaLocator'
import {ISchemaComposer}    from './recorder/SchemaComposer'
import {ISchemaRecorder}    from './recorder/SchemaRecorder'
import {ISchemaInitializer} from './SchemaInitializer'

export const SCHEMA_BUILDER     = diToken<ISchemaBuilder>()
export const SCHEMA_CHECKER     = diToken<ISchemaChecker>()
export const SCHEMA_COMPOSER    = diToken<ISchemaComposer>()
export const SCHEMA_INITIALIZER = diToken<ISchemaInitializer>()
export const SCHEMA_LOCATOR     = diToken<ISchemaLocator>()
export const SCHEMA_RECORDER    = diToken<ISchemaRecorder>()
