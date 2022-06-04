import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.scss'],
})
export class SuggestComponent implements OnInit {
  private formbuilder: FormBuilder = new FormBuilder();
  searched = false;
  spFormGroup: FormGroup = new FormGroup({});
  displayedColumns: string[] = [
    'Name',
    'Compound Number',
    'Soul Number',
    'Personality Number',
    'Destiny Number',
    'Domain Name Availability',
  ];

  dataSource: MatTableDataSource<Numerology>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  @ViewChild('fgGroupDirective')
  fgGroupDirective: FormGroupDirective | undefined;
  fetchedData: Numerology[] = [];
  constructor(private route: ActivatedRoute) {
    this.dataSource = new MatTableDataSource(this.fetchedData);
  }

  ngOnInit(): void {
    this.spFormGroup = this.formbuilder.group({
      s_n: new FormControl('', [Validators.required]),
      p_n: new FormControl('', [Validators.required]),
      d_n: new FormControl('', [Validators.required]),
      prefix: new FormControl('', [Validators.required]),
      suffix: new FormControl('', [Validators.required]),
      // tolerance: new FormControl('', [Validators.required]),
    });
    this.route.queryParams.subscribe((val) => {
      console.log(val);
      this.spFormGroup.patchValue(val, { emitEvent: false, onlySelf: true });
    });
  }

  fetchSuggestions = () => {
    this.searched = true;
  };

  back = () => {
    this.searched = false;
  };
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

interface Numerology {
  name: string;
  c_n: number;
  s_n: number;
  p_n: number;
  d_n: number;
  d_nm: string;
}
