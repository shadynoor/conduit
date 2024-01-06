import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { BackendErrors } from '../../../auth/inetrfaces/auth.interface';
import { ErrorMsgComponent } from '../error-msg/error-msg.component';
import { FormConfig } from '../../helpers/form-config.interface';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  imports: [
    CommonModule,
    SpinnerComponent,
    ErrorMsgComponent,
    ReactiveFormsModule,
  ],
})
export class DynamicFormBuilderComponent {
  dynamicForm!: FormGroup;

  @Input() buttonText = 'Submit';
  @Input() formClass = '';
  @Input() inputClass = '';
  @Input() labelClass = '';
  @Input() buttonClass = '';
  @Input() isDisabled!: boolean | null;
  @Input() error!: BackendErrors | null;
  @Input() formConfig!: FormConfig[];
  @Output() getFormValue = new EventEmitter<any>();

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.dynamicForm = this.createFromGroup(this.formConfig);
  }

  createFromGroup(config: any[]) {
    const group = this._fb.group({});
    config.forEach((field) => {
      let control;
      if (field.isRequired) {
        control = new FormControl(field.value || '', [
          Validators.required,
          Validators.pattern(field.pattern),
        ]);
      } else {
        control = new FormControl(field.value || '', Validators.nullValidator);
      }
      group.addControl(field.name, control);
    });

    return group;
  }

  onSubmit() {
    this.getFormValue.emit(this.dynamicForm);
  }
}
