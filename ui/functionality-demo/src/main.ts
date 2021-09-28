import { LOCAL_API_CLIENT } from '@airport/autopilot';
import { IOC } from '@airport/di';
import App from './App.svelte';
import { messages } from './store';

const app = new App({
	target: document.body
});

const allMessages = []

IOC.getSync(LOCAL_API_CLIENT).onMessage((
	message: any
) => {
	allMessages.push(message)
	messages.set(allMessages)
})

export default app;
