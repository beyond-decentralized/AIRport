"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Response handler for a built-in AGT (in P2P setup)
 */
class DirectResponse {
    constructor(callback) {
        this.callback = callback;
        this.data = {
            protocolVersion: 0,
            messages: []
        };
    }
    writeHead(statusCode, headers) {
        this.statusCode = statusCode;
    }
    write(data) {
        this.data.messages.push(data);
    }
    end() {
        this.callback(this.statusCode, this.data);
    }
}
exports.DirectResponse = DirectResponse;
//# sourceMappingURL=DirectResonse.js.map