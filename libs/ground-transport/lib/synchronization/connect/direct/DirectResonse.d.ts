import { MessageToTM } from "@airport/ground-control";
/**
 * Response handler for a built-in AGT (in P2P setup)
 */
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
