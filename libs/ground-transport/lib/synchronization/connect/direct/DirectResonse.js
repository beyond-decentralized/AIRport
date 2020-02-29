export class DirectResponse {
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
//# sourceMappingURL=DirectResonse.js.map