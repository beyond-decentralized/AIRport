import * as WebSocket from 'ws';
import {IWebServer} from "./server/ws/IWebServer";

const wss: IWebServer = <any>new WebSocket.Server({port: 8080});