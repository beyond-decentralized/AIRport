<style>
main {
  text-align: center;
  padding: 0em;
  margin: 0 auto;
}

h1 {
  color: #ff3e00;
  font-size: 2em;
  font-weight: 100;
}

.hidden {
  display: none;
}

p {
  border: 1px solid black;
  height: 100px;
  margin: 0;
  min-width: 260px;
  overflow-y: auto;
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
import { isDeleted } from '@airport/autopilot';
import { messages, repositoryListings } from './store';
import type { Level1 } from '@airport/functionality-demo-schema';
import type { DeepPartial } from '@airport/pressurization';
import { FunctionalityDemoService } from './service';
import { allLevel1Records } from './store';

let service = new FunctionalityDemoService();

let globalLevel1Values = {
  bool: false,
  num: 0,
  str: '',
};

let globalOperationsOn = false;

let newRepositoryName = '';
let currentRepository;

async function addRepository() {
  await service.addRepository(newRepositoryName);
}

function toggleGlobalOperations() {
  globalOperationsOn = !globalOperationsOn;
}

async function save(records: DeepPartial<Level1>[]) {
  await service.save(records);
}

async function updateLevel1BoolValues(): Promise<void> {
  await service.updateLevel1BoolValues(globalLevel1Values.bool);
}

async function updateLevel1NumValues(): Promise<void> {
  await service.updateLevel1NumValues(globalLevel1Values.num);
}

async function updateLevel1StrValues(): Promise<void> {
  await service.updateLevel1StrValues(globalLevel1Values.str);
}

async function addLevel1Record(records: DeepPartial<Level1>[]) {
  service.addLevel1Record(records);
}

async function addLevel2Record(level1Record: DeepPartial<Level1>) {
  service.addLevel2Record(level1Record);
}

async function del(records: any[], toDelete: any) {
  service.delete(toDelete);
}

function existingRecords(
  records: DeepPartial<Level1>[]
): DeepPartial<Level1>[] {
  return records.filter((record) => !isDeleted(record));
}

const messageExpandedState = [];

function getMessageHeader(message) {
  const date = new Date(message.__receivedTime__);
  let min: any = date.getMinutes();
  let sec: any = date.getSeconds();
  let milliseconds: any = date.getMilliseconds();

  min = (min < 10 ? '0' : '') + min;
  sec = (sec < 10 ? '0' : '') + sec;
  milliseconds =
    (milliseconds < 10 ? '00' : milliseconds < 100 ? '0' : '') + milliseconds;

  var timeString = min + ':' + sec + '.' + milliseconds;

  const suffx = message.type ? ': ' + message.type : '';

  return timeString + ' ' + message.category + suffx;
}

function expandMessage(index) {
  messageExpandedState[index] = !messageExpandedState[index];
}

function getMessageDetails(message) {
  return JSON.stringify(message);
}

function onRepositoryChange() {}
</script>

<main>
  <table>
    <tr>
      <td>
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
      </td>
      <td>
        <h1>Demo UI</h1>
      </td>
      <td>
        <select
          bind:value="{currentRepository}"
          on:change="{onRepositoryChange}"
        >
          {#each $repositoryListings as repository}
            <option value="{repository}">
              {repository.name}
            </option>
          {/each}
        </select>
        <input type="text" bind:value="{newRepositoryName}" />
        <button on:click="{addRepository}">Add Repository</button>
      </td>
    </tr>
  </table>
  {#if currentRepository}
    <table>
      <thead>
        <tr>
          <td>
            <button on:click="{toggleGlobalOperations}"> Lvl1 Id </button>
          </td>
          <td>Boolean</td>
          <td>Number</td>
          <td>String</td>
          <td
            ><button on:click="{() => addLevel1Record($allLevel1Records)}"
              >+ Lvl1</button
            ></td
          >
        </tr>
        <tr class="{globalOperationsOn ? '' : 'hidden'}">
          <td> </td>
          <td>
            <input type="checkbox" bind:checked="{globalLevel1Values.bool}" />
            <button on:click="{updateLevel1BoolValues}">=</button>
          </td>
          <td>
            <input
              style="width: 70%;"
              type="number"
              bind:value="{globalLevel1Values.num}"
            />
            <button on:click="{updateLevel1NumValues}">=</button>
          </td>
          <td>
            <input style="width: 70%;" bind:value="{globalLevel1Values.str}" />
            <button on:click="{updateLevel1StrValues}">=</button>
          </td>
          <td> </td>
        </tr>
      </thead>
      <tbody>
        {#each existingRecords($allLevel1Records) as level1Record, i}
          <tr>
            <td>{level1Record.id}</td>
            <td>
              <input type="checkbox" bind:checked="{level1Record.bool}" />
            </td>
            <td><input type="number" bind:value="{level1Record.num}" /></td>
            <td><input bind:value="{level1Record.str}" /></td>
            <td>
              <button on:click="{() => del($allLevel1Records, level1Record)}">
                - Lvl1
              </button>
            </td>
          </tr>
          <tr>
            <td colspan="5">
              <div style="margin-left: 100px;">Level2 Records</div>
              <table
                style="border: 1px solid black; margin-left: 50px; width: 100%;"
              >
                <thead>
                  <td>Lvl2 Id</td>
                  <td>Boolean</td>
                  <td>Number</td>
                  <td>String</td>
                  <td
                    ><button on:click="{() => addLevel2Record(level1Record)}"
                      >+ Lvl2</button
                    ></td
                  >
                </thead>
                <tbody>
                  {#each existingRecords(level1Record.contained) as level2Record, i}
                    <tr>
                      <td>{level2Record.id}</td>
                      <td
                        ><input
                          type="checkbox"
                          bind:checked="{level2Record.bool}"
                        /></td
                      >
                      <td
                        ><input
                          type="number"
                          bind:value="{level2Record.num}"
                        /></td
                      >
                      <td><input bind:value="{level2Record.str}" /></td>
                      <td
                        ><button
                          on:click="{() =>
                            del(level1Record.contained, level2Record)}"
                          >- Lvl2</button
                        ></td
                      >
                    </tr>
                  {/each}
                </tbody>
              </table>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
  <button on:click="{() => save($allLevel1Records)}">Save</button>
</main>
