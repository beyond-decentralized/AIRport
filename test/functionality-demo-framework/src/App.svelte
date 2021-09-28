<style>
main {
  text-align: center;
  padding: 1em;
  max-width: 240px;
  margin: 0 auto;
}

h1 {
  color: #ff3e00;
  font-size: 2em;
  font-weight: 100;
  margin: 5px;
}

table {
  width: 100%;
}

td {
  width: 50%;
}

p {
  border: 1px solid black;
  height: 400px;
  overflow-y: auto;
}

iframe.app {
  height: 400px;
  width: 100%;
}

iframe.ui {
  height: 400px;
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
  let hour: any = date.getHours();
  let min: any = date.getMinutes();
  let sec: any = date.getSeconds();
  let milliseconds: any = date.getMilliseconds();

  min = (min < 10 ? '0' : '') + min;
  sec = (sec < 10 ? '0' : '') + sec;
  milliseconds =
    (milliseconds < 10 ? '00' : milliseconds < 100 ? '0' : '') + milliseconds;

  var timeString = min + ':' + sec + '.' + milliseconds;

  return timeString + ' ' + message.category;
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
  <h1>AIRport framework</h1>
  <div>Operations:</div>
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
