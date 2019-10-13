import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DayStatus } from '../day.model';

@Component({
  selector: 'app-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.scss'],
})
export class DayModalComponent implements OnInit {
  /**
   * Date loaded to display in ui.
   */
  public loadedDate: Date;

  public action: string;

  @Input() public selectedDay: Date;

  @Input() public selectedStatus: string;

  @Output() public actionSelect = new EventEmitter<DayStatus>();

  constructor() { }

  ngOnInit(): void {
    this.loadedDate = this.selectedDay;
    this.action = this.selectedStatus;
  }

  public onHandleInput(input: DayStatus): void {
    this.actionSelect.emit(input);
  }
}
