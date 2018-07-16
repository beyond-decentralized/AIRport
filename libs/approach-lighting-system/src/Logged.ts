import {
	LogLevel,
	SetLogLevel
} from "@airport/runway-edge-lighting";

export interface ILogged {

	level: SetLogLevel;

}

export abstract class Logged
	implements ILogged {

	protected _level: SetLogLevel;

	constructor(
		level: SetLogLevel = LogLevel.INFO
	) {
		this._level = level;
	}

	get level(): SetLogLevel {
		return this._level;
	}

	set level(
		newLevel: SetLogLevel
	) {
		this._level = newLevel;
	}

}