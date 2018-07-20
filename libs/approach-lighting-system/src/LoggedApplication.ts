import {LogLevel, SetLogLevel} from "@airport/runway-edge-lighting";
import {ApplicationName, IApplication, PackageName} from "@airport/territory";
import {ILogged, Logged} from "./Logged";
import {ILoggedPackage} from "./LoggedPackage";

export interface ILoggedApplication
	extends ILogged {

	application: IApplication;
	packageMap: Map<PackageName, ILoggedPackage>;

	addPackage(
		loggedPackage: ILoggedPackage
	): void;

}

export class LoggedApplication
	extends Logged
	implements ILoggedApplication {

	application: IApplication;
	packageMap: Map<PackageName, ILoggedPackage> = new Map();

	constructor(
		applicationName: ApplicationName,
		level: SetLogLevel = LogLevel.INFO
	) {
		super(level);
		this.application = {
			name: applicationName
		};
	}

	set level(
		newLevel: SetLogLevel
	) {
		super.level = newLevel;
		for (const aPackage of this.packageMap.values()) {
			aPackage.level = newLevel;
		}
	}

	addPackage(
		loggedPackage: ILoggedPackage
	): void {
		loggedPackage.applicationPackage = {
			application: this.application
		};
		this.packageMap.set(loggedPackage.applicationPackage.package.name, loggedPackage);
		// loggedPackage.level = this.level;
	}

}