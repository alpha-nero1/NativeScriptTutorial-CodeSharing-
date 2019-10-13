import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';
import { DayStatus } from '../day.model';

@Component({
  selector: 'ns-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.scss'],
  moduleId: module.id
})
export class DayModalComponent implements OnInit {
  /**
   * Date loaded to display in ui.
   */
  public loadedDate: Date;

  public action: string;

  constructor(private modalParams: ModalDialogParams) { }

  ngOnInit(): void {
    const params = (this.modalParams.context as { date: Date, action: string });
    this.loadedDate = params.date;
    this.action = params.action;
  }

  public onHandleInput(input: DayStatus): void {
    this.modalParams.closeCallback(input)
  }
}
