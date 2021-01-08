import { DI } from '@airport/di';
import { ENV, EVENT_FACTORY } from '../tokens';
export class EventFactory {
    async init() {
        const env = await DI.db().get(ENV);
        this.isNode = env.isNode();
        if (this.isNode) {
            const { EventEmitter } = await import('events');
            this.eventEmitter = EventEmitter;
        }
        else {
            this.document = document;
        }
    }
    emit(event) {
        if (this.isNode) {
            return this.eventEmitter.emit(event);
        }
        else {
            return this.document.dispatchEvent(new CustomEvent(event));
        }
    }
    off(event, listener) {
        if (this.isNode) {
            this.eventEmitter.off(event, listener);
        }
        else {
            this.document.removeEventListener(event, listener);
        }
        return this;
    }
    on(event, listener) {
        if (this.isNode) {
            this.eventEmitter.on(event, listener);
        }
        else {
            this.document.addEventListener(event, listener);
            // const eventObject = new CustomEvent(event);
        }
        return this;
    }
}
DI.set(EVENT_FACTORY, EventFactory);
//# sourceMappingURL=EventFactory.js.map