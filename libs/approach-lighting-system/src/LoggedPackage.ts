import {LogLevel, SetLogLevel} from "@airport/runway-edge-lighting";
import {IPackage, PackagedUnitName} from "@airport/territory";
import {IApplicationPackage} from "@airport/territory/lib/generated/qapplicationpackage";
import {ApproachLightingSystemLogger} from "./InjectionTokens";
import {ILogged, Logged} from "./Logged";
import {ILogger, Logger} from "./Logger";

export interface ILoggedPackage
	extends ILogged {

	loggerMap: Map<PackagedUnitName, ILogger>;
	applicationPackage: IApplicationPackage;

	addLogger(
		logger: ILogger
	): void;

	add(
		packagedUnitName: PackagedUnitName
	): ILogger;

}

const log = ApproachLightingSystemLogger.add('LoggedPackage');

export class LoggedPackage
	extends Logged
	implements ILoggedPackage {

	loggerMap: Map<PackagedUnitName, ILogger> = new Map();
	private package: IPackage;

	constructor(
		packageName: string,
		level: SetLogLevel = LogLevel.INFO
	) {
		super(level);
		this.package = {
			id: null,
			name: packageName,
			applicationPackages: []
		};
		// loggedApplication.addPackage(this);
	}

	_applicationPackage: IApplicationPackage;

	get applicationPackage(): IApplicationPackage {
		return this._applicationPackage;
	}

	set applicationPackage(
		applicationPackage: IApplicationPackage
	) {
		applicationPackage.package = this.package;
		this._applicationPackage = applicationPackage;
	}

	set level(
		newLevel: SetLogLevel
	) {
		super.level = newLevel;
		for (const logger of this.loggerMap.values()) {
			logger.level = newLevel;
		}
	}

	addLogger(
		logger: ILogger
	): void {
		this.loggerMap.set(logger.unit.name, logger);
		// logger.level = this.level;
	}

	add(
		packagedUnitName: PackagedUnitName
	): ILogger {
		if (this.loggerMap.get(packagedUnitName)) {
			log.throw('Logger {1} already exists in package {2}',
				packagedUnitName, this.package.name);
		}
		const logger = new Logger(this, packagedUnitName, this.level);
		this.loggerMap.set(packagedUnitName, logger);

		return logger;
	}

}