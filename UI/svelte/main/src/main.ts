import { initFramework } from '@airport/server'

import App from './App.svelte';

initFramework().then();

const app = new App({
	target: document.body,
	props: {
	}
});

export default app;
