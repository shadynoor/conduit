import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendErrors } from '../../../auth/inetrfaces/auth.interface';

@Component({
  selector: 'app-error-msg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.scss',
})
export class ErrorMsgComponent {
  @Input() errorObj: BackendErrors = {};

  errorMsgs: string[] = [];

  ngOnInit(): void {
    this.errorMsgs = Object.keys(this.errorObj).map((name) => {
      const messages = this.errorObj[name].join(' ');
      return `${name} ${messages}`;
    });
  }
}
