import {system}            from '@airport/di'
import {ISchemaBuilder}     from './builder/ISchemaBuilder'
import {ISchemaChecker}     from './checker/SchemaChecker'
import {ISchemaLocator}     from './locator/SchemaLocator'
import {ISchemaComposer}    from './recorder/SchemaComposer'
import {ISchemaRecorder}    from './recorder/SchemaRecorder'
import {ISchemaInitializer} from './SchemaInitializer'

const landing = system('airport').lib('landing')

export const SCHEMA_BUILDER     = landing.token<ISchemaBuilder>('ISchemaBuilder')
export const SCHEMA_CHECKER     = landing.token<ISchemaChecker>('ISchemaChecker')
export const SCHEMA_COMPOSER    = landing.token<ISchemaComposer>('ISchemaComposer')
export const SCHEMA_INITIALIZER = landing.token<ISchemaInitializer>('ISchemaInitializer')
export const SCHEMA_LOCATOR     = landing.token<ISchemaLocator>('ISchemaLocator')
export const SCHEMA_RECORDER    = landing.token<ISchemaRecorder>('ISchemaRecorder')
