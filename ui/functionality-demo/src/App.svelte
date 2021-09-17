<style>
main {
  text-align: center;
  padding: 1em;
  max-width: 240px;
  margin: 0 auto;
}

h1 {
  color: #ff3e00;
  text-transform: uppercase;
  font-size: 4em;
  font-weight: 100;
}

@media (min-width: 640px) {
  main {
    max-width: none;
  }
}
</style>

<script lang="ts">
import type { Parent } from '@airport/functionality-demo-schema';
import { DeepPartial, FunctionalityDemoService } from './service';

let service = new FunctionalityDemoService();

let allRecordsPromise = service.getAllRecords();

async function save(records: DeepPartial<Parent>[]) {
  await service.save(records);
  allRecordsPromise = service.getAllRecords();
}

async function addParent(records: DeepPartial<Parent>[]) {
  service.addParent(records);
  allRecordsPromise = service.getAllRecords();
}

async function addChild(parentRecord: DeepPartial<Parent>) {
  service.addChild(parentRecord);
  allRecordsPromise = service.getAllRecords();
}

async function del(records: any[], toDelete: any) {
  service.delete(records, toDelete);
  allRecordsPromise = service.getAllRecords();
}

</script>

<main>
  <h1>AIRport CRUD functionality demo</h1>
  <p>
    {#await allRecordsPromise}
      <p>...loading data</p>
    {:then parentRecords}
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Boolean</td>
            <td>Number</td>
            <td>String</td>
            <td><button on:click="{() => addParent(parentRecords)}">Add Parent</button></td>
          </tr>
        </thead>
        <tbody>
          {#each parentRecords as parentRecord, i}
            <tr>
              <td>{parentRecord.id}</td>
              <td
                ><input
                  type="checkbox"
                  bind:checked="{parentRecord.bool}"
                /></td
              >
              <td><input type="number" bind:value="{parentRecord.num}" /></td>
              <td><input bind:value="{parentRecord.str}" /></td>
              <td><button on:click="{() => del(parentRecords, parentRecord)}">Delete</button></td>
            </tr>
            <tr rowspan="5">
              <div style="margin-left: 100px;">Child Records</div>
              <table
                style="border: 1px solid black; margin-left: 50px; width: 100%;"
              >
                <thead>
                  <td>Child Id</td>
                  <td>Boolean</td>
                  <td>Number</td>
                  <td>String</td>
                  <td><button on:click="{() => addChild(parentRecord)}">Add Child</button></td>
                </thead>
                <tbody>
                  {#each parentRecord.children as childRecord, i}
                    <tr>
                      <td>{childRecord.id}</td>
                      <td
                        ><input
                          type="checkbox"
                          bind:checked="{childRecord.bool}"
                        /></td
                      >
                      <td
                        ><input
                          type="number"
                          bind:value="{childRecord.num}"
                        /></td
                      >
                      <td><input bind:value="{childRecord.str}" /></td>
                      <td><button on:click="{() => del(parentRecord.children, childRecord)}">Delete</button></td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </tr>
          {/each}
        </tbody>
      </table>
      <button on:click="{() => save(parentRecords)}">Save</button>
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  </p>
</main>
