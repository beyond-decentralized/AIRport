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
  height: 800px;
  overflow-y: auto;
}

iframe {
  height: 800px;
  width: 100%;
}

@media (min-width: 640px) {
  main {
    max-width: none;
  }
}
</style>

<script lang="ts">
import { operations } from "./store";

export let name: string;


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
        <iframe src="http://localhost:4000/"></iframe>
      </td>
    </tr>
  </table>
</main>
