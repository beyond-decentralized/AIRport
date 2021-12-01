import {system}            from '@airport/di'
import {IApplicationBuilder}     from './builder/IApplicationBuilder'
import {IApplicationChecker}     from './checker/ApplicationChecker'
import {IApplicationLocator}     from './locator/ApplicationLocator'
import {IApplicationComposer}    from './recorder/ApplicationComposer'
import {IApplicationRecorder}    from './recorder/ApplicationRecorder'
import {IApplicationInitializer} from './ApplicationInitializer'

const landing = system('airport').lib('landing')

export const APPLICATION_BUILDER     = landing.token<IApplicationBuilder>('IApplicationBuilder')
export const APPLICATION_CHECKER     = landing.token<IApplicationChecker>('IApplicationChecker')
export const APPLICATION_COMPOSER    = landing.token<IApplicationComposer>('IApplicationComposer')
export const APPLICATION_INITIALIZER = landing.token<IApplicationInitializer>('IApplicationInitializer')
export const APPLICATION_LOCATOR     = landing.token<IApplicationLocator>('IApplicationLocator')
export const APPLICATION_RECORDER    = landing.token<IApplicationRecorder>('IApplicationRecorder')
