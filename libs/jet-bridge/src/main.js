import App from './App.svelte';

const jetBridge = new App({
    target: document.body,
    props: {
        name: 'world'
    }
});

window.jetBridge = jetBridge;

export default jetBridge;