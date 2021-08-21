import {
	DatabaseId,
	RepositoryId,
	SyncRecordAddDatetime,
	SyncRecordTransactionData
} from "@airport/guideway";
import { ClientInMessage } from "./ClientInMessage";

export const MILLIS_IN_DAY = 24 * 60 * 60 * 1000;

export interface ConnectionDataCallback {
	(
		databaseId: DatabaseId,
		// token: JwtToken,
		writeHeaders: boolean,
		data: [RepositoryId, SyncRecordAddDatetime, SyncRecordTransactionData],
		forwardToServerAddress?: string,
		mesageId?: ClientInMessage,
	): void;
}


export interface ClientOutMessage {

}