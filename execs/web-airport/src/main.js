import App from './App.svelte';
import { initFramework } from './framework';
const app = new App({
    target: document.body,
    props: {}
});
initFramework().then();
export default app;
//# sourceMappingURL=main.js.map