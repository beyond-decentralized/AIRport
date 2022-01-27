<style type="text/css">
</style>

<script lang="ts">
import { onMount } from 'svelte';
import page from 'page';

page('/:uiPath', (context) => {
  console.log(context);
});
page();

onMount(async () => {});
</script>
