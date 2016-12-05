# angular2-file-drop

Angular2 component with Drag and Drop support for files

## Install

```bash
npm install angular2-file-drop --save
```

## Usage

### Import the module
```TypeScript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileDropModule } from 'angular2-file-drop'; // <-- import the module
import { MyComponent } from './my.component';

@NgModule({
    imports: [BrowserModule,
              FileDropModule // <-- include it in your app module
             ],
    declarations: [MyComponent],  
    bootstrap: [MyComponent]
})
export class MyAppModule {}
```

## Use it
```ts
import { Component, Output } from '@angular/core';

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
})
export class PartiesUpload {
  public fileIsOver: boolean = false;
  @Output() public options = {
    readAs: 'ArrayBuffer'
  };

  private file: File;

  public fileOver(fileIsOver: boolean): void {
    this.fileIsOver = fileIsOver;
  }

  public onFileDrop(file: File): void {
    console.log('Got file:', file);
  }
}

```

## Options

- **readAs?** : `DataURL`, `ArrayBuffer`, `BinaryString` or `Text`
