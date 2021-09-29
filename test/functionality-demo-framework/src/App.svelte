<style>
main {
  text-align: center;
  padding: 0.5em;
  max-width: 240px;
  margin: 0 auto;
}

h1 {
  color: #ff3e00;
  font-size: 1.5em;
  font-weight: 100;
  margin: 0px;
  padding: 0px;
}

table {
  width: 100%;
}

td {
  width: 50%;
}

p {
  border: 1px solid black;
  height: 200px;
  margin: 0;
  overflow-y: auto;
}

iframe.app {
  height: 200px;
  width: 100%;
}

iframe.ui {
  height: 670px;
  width: 100%;
}

@media (min-width: 640px) {
  main {
    max-width: none;
  }
}

div.log {
  text-align: left;
}
button {
  padding: 0;
  margin: 0;
}

.hidden {
  display: none;
}
</style>

<script lang="ts">
import { messages } from './store';
// message.__receivedTime__ = `${receivedDate.getHours()}:${receivedDate.getMinutes()}.${receivedDate.getMilliseconds()}`

const messageExpandedState = []

function getMessageHeader(message) {
  const date = new Date(message.__receivedTime__);
  let min: any = date.getMinutes();
  let sec: any = date.getSeconds();
  let milliseconds: any = date.getMilliseconds();

  min = (min < 10 ? '0' : '') + min;
  sec = (sec < 10 ? '0' : '') + sec;
  milliseconds =
    (milliseconds < 10 ? '00' : milliseconds < 100 ? '0' : '') + milliseconds;

  const timeString = min + ':' + sec + '.' + milliseconds;

  const suffx = message.type ? ': ' + message.type : ''

  return timeString + ' ' + message.category + suffx;
}

function expandMessage(index) {
  messageExpandedState[index] = !messageExpandedState[index]
}

function getMessageDetails(message) {
  return JSON.stringify(message)
}

// export let name: string;
</script>

<main>
  <h1>AIRport core functionality demo</h1>
  <div>messages:</div>
  <table>
    <tr>
      <td>
        <p>
          {#each $messages as message, i}
            <div class="log">
              {getMessageHeader(message)}
              <button
              on:click={() => expandMessage(i)}
              >&nbsp;&nbsp;i&nbsp;&nbsp;</button>
            </div>
            <div class={messageExpandedState[i] ? 'log' : 'hidden log'}>
              {getMessageDetails(message)}
            </div>
          {/each}
        </p>
      </td>
      <td>
        <iframe
          id="app"
          class="app"
          name="functionality-demo-schema"
          src="http://localhost:4000/"
          title="application-frame"></iframe>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <iframe
          id="ui"
          class="ui"
          title="application-frame"
          src="http://localhost:8000/"></iframe>
      </td>
    </tr>
  </table>
</main>
