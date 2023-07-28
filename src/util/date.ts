// src/util/date.ts
export function getWeek(month: number, year: number): Array<Array<{ date: Date; day: number | null }>> {
    // Function to get the number of days in a month
    function getDaysInMonth(month: number, year: number): number {
      return new Date(year, month + 1, 0).getDate();
    }
  
    // Function to get the day of the week (0-6, starting from Sunday)
    function getDayOfWeek(date: Date): number {
      return date.getDay() === 0 ? 6 : date.getDay() - 1;
    }
  
    const firstDay = new Date(year, month, 1);
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayOfWeek = getDayOfWeek(firstDay);
  
    let currentDay = 1;
    let weeks: Array<Array<{ date: Date; day: number | null }>> = [];
  
    while (currentDay <= daysInMonth) {
      const week = new Array(7).fill(null).map((_, index) => {
        const dayIndex = currentDay + index - firstDayOfWeek;
        const date = new Date(year, month, dayIndex);
        return {
          date,
          day: dayIndex > 0 && dayIndex <= daysInMonth ? dayIndex : null,
        };
      });
      weeks.push(week);
      currentDay += 7;
    }
  
    return weeks;
  }
  