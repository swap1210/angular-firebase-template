import { HttpClient } from '@angular/common/http';
import { Target } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  fileName = '';
  fileContent: any;
  public onChange(fileList: any): void {
    let file = fileList.files[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function (x) {
      self.fileContent = fileReader.result;
    };
    fileReader.readAsText(file);
  }
}
