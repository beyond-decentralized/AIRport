import {
	ILoggedApplication,
	ILoggedPackage,
	LoggedApplication,
	LoggedPackage
}                 from '@airport/approach-lighting-system'
import {LogLevel} from '@airport/runway-edge-lighting'

export const TERMINAL_LOG: ILoggedPackage
	             = new LoggedPackage('terminal', LogLevel.TRACE)

export const TERMINAL_APP_LOG: ILoggedApplication
	             = new LoggedApplication('Airport')

TERMINAL_APP_LOG.addPackage(TERMINAL_LOG)
