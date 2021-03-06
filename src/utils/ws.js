/* @flow */

import EventEmitter from 'events';

// Define the global WebSocket class found on the native browser
// declare class WebSocket {
//     onclose?: Function;
//     onopen?: Function;
//     onerror?: Function;
//     onmessage?: Function;
//     readyState: number;
//     constructor(url: string)
//     close();
//     send(message: string);
// }

/**
 * Provides `EventEmitter` interface for native browser `WebSocket`,
 * same, as `ws` package provides.
 * From: https://github.com/ripple/ripple-lib/blob/develop/src/common/wswrapper.ts
 */
class WS extends EventEmitter {

    _ws: WebSocket;
    static CONNECTING = 0
    static OPEN = 1
    static CLOSING = 2
    static CLOSED = 3

    constructor(url: string, _protocols: any, _websocketOptions: any) {
        super();

        console.warn("WS FAKE", WebSocket)

        this._ws = new WebSocket(url);

        this._ws.onclose = () => {
            this.emit('close');
        }

        this._ws.onopen = () => {
            this.emit('open');
        }

        this._ws.onerror = error => {
            console.warn("ON ERROR", error)
            this.emit('error', error);
        }

        this._ws.onmessage = message => {
            this.emit('message', message.data);
        }
    }

    close() {
        if (this.readyState === 1) {
            this._ws.close();
        }
    }

    send(message: any) {
        this._ws.send(message);
    }

    get readyState() {
        return this._ws.readyState;
    }

}

export default WS;
