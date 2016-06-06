# angular2-file-drop

Angular2 component with Drag and Drop support for files

## Install

```bash
npm install angular2-file-drop
```

## Usage

```ts
import { Component, Output } from '@angular/core';
import { FileDropDirective } from 'angular2-file-drop';

@Component({
  selector: 'upload',
  template: `
    <div fileDrop
      [ngClass]="{'file-is-over': fileIsOver}"
      [options]="options"
      (fileOver)="fileOver($event)"
      (onFileDrop)="onFileDrop($event)">
      Drop file here
    </div>
  `,
  directives: [ FileDropDirective ]
})
export class PartiesUpload {
  public fileIsOver: boolean = false;
  @Output() public options = {
    readAs; 'ArrayBuffer'
  };

  private file: File;

  public fileOver(fileIsOver: boolean): void {
    this.fileIsOver = fileIsOver;
  }

  public onFileDrop(file: File): void {
    console.log('Got file!');
  }
}

```

## Options

- **readAs?** : `DataURL`, `ArrayBuffer`, `BinaryString` or `Text`
