/**
 * Response handler for a built-in AGT (in P2P setup)
 */
import { MessageToTM } from "@airport/arrivals-n-departures";
export declare class DirectResponse {
    private callback;
    statusCode: number;
    private data;
    constructor(callback: {
        (statusCode: number, data: any): void;
    });
    writeHead(statusCode: number, headers: any): void;
    write(data: MessageToTM): void;
    end(): void;
}
