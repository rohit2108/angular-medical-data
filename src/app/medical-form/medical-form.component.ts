import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-medical-form',
  templateUrl: './medical-form.component.html',
  styleUrls: ['./medical-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalFormComponent implements OnChanges {
  //take input from app component
  @Input() drugHistoryData: any;
  //to store drug data
  drugData: any;
  // to get error messsage
  errorMessage: string;

  //medical form to store user's innput
  medicalForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}

  /**
   * Nglifecycle hook
   * @param changes Simple Change
   * @returns void
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.drugHistoryData.firstChange) {
      this.buildForm(this.drugHistoryData);
    }
  }

  /**
   * Method to create medical history form
   * @param controlName
   */
  buildForm(controlName: any) {
    for (const control of controlName) {
      if (control.isRequired) {
        this.errorMessage = `${control.key} is required`;
        this.medicalForm.addControl(
          control.key,
          this.fb.control('', Validators.required)
        );
      } else {
        this.medicalForm.addControl(control.key, this.fb.control(''));
      }
    }
  }

  /**
   * Method to submit user form
   */
  onSubmit() {
    if (this.medicalForm.valid) {
      this.drugData = this.medicalForm;
    }
  }
}
