<style>
main {
  margin: 0px;
  padding: 0px;
  text-align: center;
  width: 100%;
}

h1 {
  color: #ff3e00;
  font-size: 1.2em;
  font-weight: 100;
  margin: 3px;
}

p {
  border: 1px solid black;
  height: 155px;
  margin: 0;
  overflow-y: auto;
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

const messageExpandedState = [];

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
  messageExpandedState[index] = !messageExpandedState[index];
}

function getMessageDetails(message) {
  return JSON.stringify(message);
}
</script>

<main>
  <h1>Demo App</h1>
  <p>
    {#each $messages as message, i}
      <div class="log">
        {getMessageHeader(message)}
        <button on:click="{() => expandMessage(i)}"
          >&nbsp;&nbsp;i&nbsp;&nbsp;</button
        >
      </div>
      <div class="{messageExpandedState[i] ? 'log' : 'hidden log'}">
        {getMessageDetails(message)}
      </div>
    {/each}
  </p>
</main>
