import {
	DI,
	IInitializable
} from '@airport/di';
import {
	ENV,
	EVENT_FACTORY
} from '../tokens';

export interface IEventFactory {

	emit(
		event: string
	): boolean

	on(
		event: string,
		listener: (...args: any[]) => void
	): IEventFactory;

	off(
		event: string | symbol,
		listener: (...args: any[]) => void
	): IEventFactory;
}

export class EventFactory
	implements IEventFactory,
	           IInitializable {

	// This wouldn't change on a device so OK to store in an instance
	isNode: boolean;
	eventEmitter;
	document;

	async init(): Promise<void> {
		const env   = await DI.db().get(ENV);
		this.isNode = env.isNode();
		if (this.isNode) {
			const { EventEmitter } = await import('events');
			this.eventEmitter      = EventEmitter;
		} else {
			this.document = document;
		}
	}

	emit(
		event: string
	): boolean {
		if (this.isNode) {
			return this.eventEmitter.emit(event);
		} else {
			return this.document.dispatchEvent(new CustomEvent(event));
		}
	}

	off(
		event: string | symbol,
		listener: (...args: any[]) => void
	): IEventFactory {
		if (this.isNode) {
			this.eventEmitter.off(event, listener);
		} else {
			this.document.removeEventListener(event, listener);
		}
		return this;
	}

	on(
		event: string,
		listener: (...args: any[]) => void
	): IEventFactory {
		if (this.isNode) {
			this.eventEmitter.on(event, listener);
		} else {
			this.document.addEventListener(event, listener);
			// const eventObject = new CustomEvent(event);
		}
		return this;
	}

}

DI.set(EVENT_FACTORY, EventFactory);
