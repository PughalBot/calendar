<script lang="ts">
  import { onMount } from 'svelte';

  let selectedDate = new Date().toISOString().substring(0, 10);
  let displayedDate = new Date();

  function prevMonth() {
    displayedDate.setMonth(displayedDate.getMonth() - 1);
    updateDays();
  }
  
  function nextMonth() {
    displayedDate.setMonth(displayedDate.getMonth() + 1);
    updateDays();
  }
  
  function selectDate(day: number) {
    let date = new Date(displayedDate.getFullYear(), displayedDate.getMonth(), day);
    selectedDate = date.toISOString().substring(0, 10);
  }

  let days = [];
  
  onMount(() => {
    updateDays();
  });

  $: displayedDate.getMonth(), displayedDate.getFullYear(), updateDays();

  function updateDays() {
    let startDay = new Date(displayedDate.getFullYear(), displayedDate.getMonth(), 1).getDay();
    let daysInMonth = 32 - new Date(displayedDate.getFullYear(), displayedDate.getMonth(), 32).getDate();

    // Adjust startDay according to the given week structure (starting on Tuesday)
    startDay = (startDay + 6) % 7;
  
    days = [];
    for(let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for(let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
  }
</script>

<div>
  <input type="date" bind:value={selectedDate}>
  
  <div>
    <button on:click={prevMonth}>Prev</button>
    <div>{displayedDate.toLocaleString('default', { month: 'long' })} {displayedDate.getFullYear()}</div>
    <button on:click={nextMonth}>Next</button>
  </div>
  
  <table>
    <thead>
      <tr>
        <th>Tue</th>
        <th>Wed</th>
        <th>Thu</th>
        <th>Fri</th>
        <th>Sat</th>
        <th>Sun</th>
        <th>Mon</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        {#each days as day, i (i)}
          {#if i % 7 === 0 && i > 0}
            </tr><tr>
          {/if}
          <td>
            {#if day !== null}
              <button on:click={() => selectDate(day)}>{day}</button>
            {/if}
          </td>
        {/each}
      </tr>
    </tbody>
  </table>
</div>
