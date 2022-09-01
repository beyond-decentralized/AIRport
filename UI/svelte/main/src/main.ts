import { initFramework } from '@airport/web-airport'

import App from './App.svelte';

initFramework().then();

const app = new App({
	target: document.body,
	props: {
	}
});

export default app;
