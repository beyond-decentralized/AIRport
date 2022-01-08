import { initAIRportApp } from './airportApp';
import App from './App.svelte';
import { marker } from './frame'

var test = marker

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

initAIRportApp().then();

export default app;