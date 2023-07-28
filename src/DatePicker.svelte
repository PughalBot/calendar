<!-- src/CalendarPicker.svelte -->
<script>
  import { onMount, writable } from "svelte/store";
  import { getWeek } from "./util/date";

  export let selectedDate = null;

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  // Function to update the selected date
  function updateSelectedDate(date) {
    selectedDate = date;
  }

  // Function to change the month and year
  function changeMonthYear(month, year) {
    currentMonth = month;
    currentYear = year;
    weeks.set(getWeek(currentMonth, currentYear));
  }

  let weeks = writable([]); // Store to hold the weeks in the calendar

  onMount(() => {
    weeks.set(getWeek(currentMonth, currentYear));
  }
</script>

<!-- src/CalendarPicker.svelte -->
<style>
  .calendar {
    font-family: Arial, sans-serif;
    max-width: 320px;
    margin: 0 auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    background-color: #f0f0f0;
  }

  .header button {
    cursor: pointer;
    background: none;
    border: none;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    transition: color 0.3s;
  }

  .header button:hover {
    color: #555;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 12px;
    text-align: center;
    border: 1px solid #ccc;
    transition: background-color 0.3s;
  }

  td {
    cursor: pointer;
  }

  .current-month {
    background-color: #f0f0f0;
  }

  .other-month {
    color: #ccc;
  }

  .selected {
    background-color: #007bff;
    color: #fff;
    font-weight: bold;
  }
</style>

<div class="calendar">
  <!-- ... Rest of the component ... -->
</div>


<div class="calendar">
  <div class="header">
    <button on:click={() => changeMonthYear(currentMonth - 1, currentYear)}>
      Previous
    </button>
    <h2>{getMonthName(currentMonth)} {currentYear}</h2>
    <button on:click={() => changeMonthYear(currentMonth + 1, currentYear)}>
      Next
    </button>
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
      {#each $weeks as week}
        <tr>
          {#each week as day}
            <td
              class={day.date.getMonth() === currentMonth ? "current-month" : "other-month"}
              on:click={() => updateSelectedDate(day.date)}
            >
              {#if day.day}
                {day.day}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<script>
  // Function to get the month name
  function getMonthName(month) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[month];
  }
</script>
