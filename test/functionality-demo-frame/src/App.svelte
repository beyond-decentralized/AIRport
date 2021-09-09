<style>
main {
  margin: 0px;
  padding: 0px;
  text-align: center;
  width: 100%;
}

h1 {
  color: #ff3e00;
  font-size: 1.5em;
  font-weight: 100;
  margin: 3px;
}

p {
  border: 1px solid black;
  height: 700px;
  overflow-y: auto;
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

export let name: string;
</script>

<main>
  <h1>Demo App</h1>
  <p>
    {#each $operations as operation, i}
      <div>{operation}</div>
    {/each}
  </p>
</main>
