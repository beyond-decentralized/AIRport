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
</style>

<script lang="ts">
import { operations } from './store';

// export let name: string;
</script>

<main>
  <h1>AIRport framework</h1>
  <div>Operations:</div>
  <table>
    <tr>
      <td>
        <p>
          {#each $operations as operation, i}
            <div>{operation}</div>
          {/each}
        </p>
      </td>
      <td>
        <iframe
          id="app"
          class="app"
          title="application-frame"
          src="http://localhost:4000/"></iframe>
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
