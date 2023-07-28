<!-- src/routes/calendar-page.svelte -->
<script lang="ts">
  import CalendarPicker from "./CalendarPicker.svelte";
  import { selectedDate } from "./CalendarPicker.svelte";
</script>

<h1>Select a date:</h1>
<input type="date" bind:value={selectedDate}>
<CalendarPicker bind:selectedDate={selectedDate} />
