<style type="text/css">
</style>

<script lang="ts">
import { onMount } from 'svelte';
import page  from 'page'

page('/:uiPath', (context) => {
  console.log(context);
})
page()

onMount(async () => {
});
</script>

<iframe
  id="app"
  class="app"
  name="votecube"
  src="http://localhost:4000/"
  style="display: none;"
  title="votecube"></iframe>

