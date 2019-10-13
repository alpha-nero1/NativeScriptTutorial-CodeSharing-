import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DayStatus } from '../day.model';
import { InvokeFunctionExpr } from '@angular/compiler';

@Component({
  selector: 'ns-challenge-actions',
  templateUrl: './challenge-actions.component.html',
  styleUrls: ['./challenge-actions.component.scss']
})
export class ChallengeActionsComponent implements OnInit {

  @Input() public cancelText = 'Cancel';

  @Output() public actionSelect = new EventEmitter<DayStatus>();

  @Input() public action: 'fail' | 'success' = null;

  public done = false;

  constructor() { }

  ngOnInit(): void { }

  public onAction(event: 'fail' | 'success' | 'cancel'): void {
    this.done = true;
    let status = DayStatus.Open;
    if (event === 'success') {
      status = DayStatus.Completed;
      this.action = 'success';
    } else if (event === 'fail') {
      status = DayStatus.Failed;
      this.action = 'fail';
    } else {
      this.action = null;
      this.done = false;
    }
    this.actionSelect.emit(status);
  }
}
