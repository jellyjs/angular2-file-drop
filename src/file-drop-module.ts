import {NgModule} from '@angular/core';
import {FileDropDirective} from './file-drop';

@NgModule({
  declarations: [
    FileDropDirective,
  ],
  exports: [
    FileDropDirective,
  ],
})
export class FileDropModule {}
