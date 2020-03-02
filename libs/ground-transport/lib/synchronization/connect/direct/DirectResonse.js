"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DirectResponse {
    constructor(callback) {
        this.callback = callback;
        this.data = {
            agtSharingMessageId: null,
            protocolVersion: 0,
            targetAgtTerminalIds: [],
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