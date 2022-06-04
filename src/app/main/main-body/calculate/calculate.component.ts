import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { Util } from 'src/app/services/Util';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss'],
})
export class CalculateComponent implements OnInit {
  formError = '';
  public charToVal = Util.charToVal;
  public fg: FormGroup = new FormGroup({});
  public nums = { s_n: 0, d_n: 0, p_n: 0 };
  private formbuilder: FormBuilder = new FormBuilder();
  constructor(private be: BackendService) {}

  @ViewChild('fgGroupDirective')
  fgGroupDirective: FormGroupDirective | undefined;

  ngOnInit(): void {
    this.fg = this.formbuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern("['A-Za-z ']+$"),
      ]),
    });

    this.fg.valueChanges.subscribe((val) => {
      if (this.fg.valid) {
        this.calculate(val.name);
      } else {
        this.calculate('');
      }
    });
  }

  calculate = (p_name: string) => {
    this.nums = this.be.calculateNums(p_name);
  };

  charToValFunc(ch: string) {
    return this.charToVal[ch.toLowerCase() as keyof typeof this.charToVal];
  }

  getErrorMessage() {
    return "Name must be all characters and can't be empty";
  }
}
