import {
	ILoggedApplication,
	ILoggedPackage,
	LoggedApplication,
	LoggedPackage
}                 from '@airport/approach-lighting-system'
import {LogLevel} from '@airport/runway-edge-lighting'


export const TerminalLogger: ILoggedPackage
	             = new LoggedPackage('terminal', LogLevel.TRACE)

export const TerminalAppLogger: ILoggedApplication
	             = new LoggedApplication('Airport')
TerminalAppLogger.addPackage(TerminalLogger)