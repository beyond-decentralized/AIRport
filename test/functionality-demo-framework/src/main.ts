import App from './App.svelte';
import { initFramework } from './framework';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

initFramework().then();

export default app;
