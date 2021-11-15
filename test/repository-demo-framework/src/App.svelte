<style type="text/css">
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

#content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0px;
}
</style>

<script lang="ts">
let name;
</script>

<iframe
  id="app"
  class="app"
  name="repository-demo-app"
  src="http://localhost:4000/"
  style="display: none;"
  title="repository-demo-app"></iframe>

<div id="content">
  <iframe
    id="ui"
    class="ui"
    name="repository-demo-ui"
    src="http://localhost:8000/"
    style="width: 100%; height: 100%;"
    title="repository-demo-ui"></iframe>
</div>
