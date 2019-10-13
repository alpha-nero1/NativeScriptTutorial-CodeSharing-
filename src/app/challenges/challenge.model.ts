import { Day, DayStatus } from './day.model';

export class Challenge {

  constructor(
    public title: string,
    public description: string,
    public year?: number,
    public month?: number,
    private _days: Day[] = []
  ) {
    if (_days.length > 0) {
      return;
    }

    if (!year) {
      this.year = new Date().getFullYear();
    }
    if (!month) {
      this.month = new Date().getMonth();
    }
    // Generate our array of days.
    //thiqs.currentYear = new Date().getFullYear()
    //this.currentMonth = new Date().getMonth()
    // Little bitty of trickery.
    const daysInMonth = new Date(this.year, (this.month + 1), 0).getDate();
    for (let i = 1; i < daysInMonth + 1; i++) {
      const date = new Date(this.year, this.month, i);
      const dayInWeek = date.getDay()
      this._days.push({
        dayInMonth: i,
        dayInWeek,
        date,
        status: DayStatus.Open
      })
    }
  }

  /**
   * Finesse, finesse, finesse
   */
  get currentDay(): Day {
    if (this.year && this.month) {
      return this._days.find(day => day.dayInMonth === new Date().getDate());
    }
    return null;
  }

  get days(): Day[] {
    return [...this._days];
  }
}
