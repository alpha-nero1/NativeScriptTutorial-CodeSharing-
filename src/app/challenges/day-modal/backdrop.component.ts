import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ns-backdrop',
  template: `
    <div class="backdrop"></div>
  `,
  styles: [`
    .backdrop {
      position: fixed;
      width: 100vh;
      height: 100vh;
      top: 0;
      left: 0;
      z-index: 99;
      background: rgba(0, 0, 0, 0.75)
    }
  `]
})
export class BackdropComponent { }
