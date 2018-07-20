import { ShardId } from "@airport/airport-code/lib/ddl/Shard";
import { DatabaseInfo } from "../../model/ClientInMessage";
import { ServerErrorType } from "../../model/ServerErrorType";

export type ErroneousEntityInfo = [ShardId, number];

export interface IErrorLogger {

	logError(
		errorType: ServerErrorType,
		databaseInfo: DatabaseInfo,
		erroneousEntityInfo: ErroneousEntityInfo
	): Promise<void>;

}

export class ErrorLogger
	implements IErrorLogger {

	async logError(
		errorType: ServerErrorType,
		databaseInfo: DatabaseInfo,
		erroneousEntityInfo: ErroneousEntityInfo
	): Promise<void> {

	}

}