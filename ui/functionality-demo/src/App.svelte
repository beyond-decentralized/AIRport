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
import { isDeleted } from '@airport/autopilot';

import type { Parent } from '@airport/functionality-demo-schema';
import type { DeepPartial } from '@airport/pressurization';
import { FunctionalityDemoService } from './service';
import { allParentRecords } from './store';

let service = new FunctionalityDemoService();

async function save(records: DeepPartial<Parent>[]) {
  await service.save(records);
}

async function addParent(records: DeepPartial<Parent>[]) {
  service.addParent(records);
}

async function addChild(parentRecord: DeepPartial<Parent>) {
  service.addChild(parentRecord);
}

async function del(records: any[], toDelete: any) {
  service.delete(toDelete);
}

function existingRecords(
  records: DeepPartial<Parent>[]
): DeepPartial<Parent>[] {
  return records.filter((record) => !isDeleted(record));
}
</script>

<main>
  <h1>AIRport CRUD functionality demo</h1>
  <table>
    <thead>
      <tr>
        <td>Id</td>
        <td>Boolean</td>
        <td>Number</td>
        <td>String</td>
        <td
          ><button on:click="{() => addParent($allParentRecords)}"
            >Add Parent</button
          ></td
        >
      </tr>
    </thead>
    <tbody>
      {#each existingRecords($allParentRecords) as parentRecord, i}
        <tr>
          <td>{parentRecord.id}</td>
          <td>
            <input type="checkbox" bind:checked="{parentRecord.bool}" />
          </td>
          <td><input type="number" bind:value="{parentRecord.num}" /></td>
          <td><input bind:value="{parentRecord.str}" /></td>
          <td
            ><button on:click="{() => del($allParentRecords, parentRecord)}"
              >Delete</button
            ></td
          >
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
              <td
                ><button on:click="{() => addChild(parentRecord)}"
                  >Add Child</button
                ></td
              >
            </thead>
            <tbody>
              {#each existingRecords(parentRecord.children) as childRecord, i}
                <tr>
                  <td>{childRecord.id}</td>
                  <td
                    ><input
                      type="checkbox"
                      bind:checked="{childRecord.bool}"
                    /></td
                  >
                  <td><input type="number" bind:value="{childRecord.num}" /></td
                  >
                  <td><input bind:value="{childRecord.str}" /></td>
                  <td
                    ><button
                      on:click="{() => del(parentRecord.children, childRecord)}"
                      >Delete</button
                    ></td
                  >
                </tr>
              {/each}
            </tbody>
          </table>
        </tr>
      {/each}
    </tbody>
  </table>
  <button on:click="{() => save($allParentRecords)}">Save</button>
</main>
