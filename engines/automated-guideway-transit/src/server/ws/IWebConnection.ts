/*
import * as WebSocket from "ws";
import * as http from 'http';

export interface IWebConnection {

	// binaryType: string;
	// bufferedAmount: number;
	// bytesReceived: number;
	// extensions: {};
	// protocol: string;
	// protocolVersion: number;
	// readyState: number;
	// url: string;

	// CONNECTING: number;
	// OPEN: number;
	// CLOSING: number;
	// CLOSED: number;

	// onopen: (event: { target: WebSocket }) => void;
	// onerror: (err: Error) => void;
	// onclose: (event: { wasClean: boolean; code: number; reason: string; target: WebSocket }) => void;
	// onmessage: (event: { data: WebSocket.Data; type: string; target: WebSocket }) => void;

	// constructor(address: string, options?: WebSocket.ClientOptions);
	// constructor(address: string, protocols?: string | string[], options?: WebSocket.ClientOptions);

	close(code?: number, data?: string): void;
	// pause(): void;
	// resume(): void;
	// ping(data?: any, mask?: boolean, failSilently?: boolean): void;
	// pong(data?: any, mask?: boolean, failSilently?: boolean): void;
	send(data: any, cb?: (err: Error) => void): void;
	// send(data: any, options: { mask?: boolean; binary?: boolean }, cb?: (err: Error) => void): void;
	// stream(options: { mask?: boolean; binary?: boolean }, cb?: (err: Error, final: boolean) => void): void;
	// stream(cb?: (err: Error, final: boolean) => void): void;
	// terminate(): void;

	// HTML5 WebSocket events
	// addEventListener(method: 'message', cb?: (event: { data: any; type: string; target: WebSocket }) => void): void;
	// addEventListener(method: 'close', cb?: (event: {
	// 	wasClean: boolean; code: number;
	// 	reason: string; target: WebSocket
	// }) => void): void;
	// addEventListener(method: 'error', cb?: (err: Error) => void): void;
	// addEventListener(method: 'open', cb?: (event: { target: WebSocket }) => void): void;
	// addEventListener(method: string, messageListener?: () => void): void;

	// Events
	// on(event: 'close', messageListener: (code: number, reason: string) => void): this;
	// on(event: 'error', messageListener: (err: Error) => void): this;
	// on(event: 'headers', messageListener: (headers: {}, request: http.IncomingMessage) => void): this;
	on(event: 'message', listener: (data: WebSocket.Data) => void): this;
	// on(event: 'open' , messageListener: () => void): this;
	// on(event: 'ping' | 'pong', messageListener: (data: Buffer) => void): this;
	// on(event: 'unexpected-response', messageListener: (request: http.ClientRequest, response: http.IncomingMessage) => void): this;
	// on(event: string | symbol, messageListener: (...args: any[]) => void): this;

	// addListener(event: 'close', messageListener: (code: number, message: string) => void): this;
	// addListener(event: 'error', messageListener: (err: Error) => void): this;
	// addListener(event: 'headers', messageListener: (headers: {}, request: http.IncomingMessage) => void): this;
	// addListener(event: 'message', messageListener: (data: WebSocket.Data) => void): this;
	// addListener(event: 'open' , messageListener: () => void): this;
	// addListener(event: 'ping' | 'pong', messageListener: (data: Buffer) => void): this;
	// addListener(event: 'unexpected-response', messageListener: (request: http.ClientRequest, response: http.IncomingMessage) => void): this;
	// addListener(event: string | symbol, messageListener: (...args: any[]) => void): this;
}
*/
