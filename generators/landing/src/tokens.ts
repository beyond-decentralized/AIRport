import {system}            from '@airport/di'
import {IApplicationBuilder}     from './builder/IApplicationBuilder'
import {IApplicationChecker}     from './checker/ApplicationChecker'
import {IApplicationLocator}     from './locator/ApplicationLocator'
import {IApplicationComposer}    from './recorder/ApplicationComposer'
import {IApplicationRecorder}    from './recorder/ApplicationRecorder'
import {IApplicationInitializer} from './ApplicationInitializer'

const landing = system('airport').lib('landing')

export const SCHEMA_BUILDER     = landing.token<IApplicationBuilder>('IApplicationBuilder')
export const SCHEMA_CHECKER     = landing.token<IApplicationChecker>('IApplicationChecker')
export const SCHEMA_COMPOSER    = landing.token<IApplicationComposer>('IApplicationComposer')
export const SCHEMA_INITIALIZER = landing.token<IApplicationInitializer>('IApplicationInitializer')
export const SCHEMA_LOCATOR     = landing.token<IApplicationLocator>('IApplicationLocator')
export const SCHEMA_RECORDER    = landing.token<IApplicationRecorder>('IApplicationRecorder')
