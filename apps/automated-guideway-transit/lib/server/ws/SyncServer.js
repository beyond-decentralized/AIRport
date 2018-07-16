/*
import { IBlacklist } from "../../clientConnection/Blacklist";
import { ClientSyncConnection } from "../../clientConnection/ClientSyncConnection";
import { IWebConnection } from "./IWebConnection";
import { IClientConnectionStore } from "../ClientConnectionStore";
import { IDataProcessor } from "../DataProcessor";
import { IWebServer } from "./IWebServer";
import { ILoginVerifier } from "../LoginVerifier";

export interface ISyncServer {

    start(): void;

    stop(): void;

}

export class SyncServer implements ISyncServer {

    constructor(
        private blacklist: IBlacklist,
        private dataProcessor: IDataProcessor,
        private loginVerifier: ILoginVerifier,
        private store: IClientConnectionStore,
        private webServer: IWebServer
    ) {
    }

    start(): void {
        this.webServer.on('connection', function connection(
            ws: IWebConnection,
            req
        ): void {
            const ip = req.connection.remoteAddress;
            // https://github.com/websockets/ws/#how-to-get-the-ip-address-of-the-client
            // When the server runs behind a proxy like NGINX, the de-facto standard is to use
            // the X-Forwarded-For header.
            // const ip = req.headers['x-forwarded-for'];

            if (this.blacklist.isBlacklisted(ip)) {
                ws.close(555);
                return;
            }
            const clientConnection = new ClientSyncConnection(
                this.dataProcessor, this.loginVerifier, ws, ip, this.store);
            this.clientConnectionStore.addPendingConnection(clientConnection);
        });
    }

    stop(): void {
        throw `Not Implemented`;
    }

}
*/
//# sourceMappingURL=SyncServer.js.map