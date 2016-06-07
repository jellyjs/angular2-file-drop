/// <reference path="../typings/main.d.ts" />

import 'fileapi';

import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output,
} from '@angular/core';

export interface Options {
  readAs?: string;
}

@Directive({ selector: '[fileDrop]' })
export class FileDropDirective {
  @Output() public fileOver: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public onFileDrop: EventEmitter<File> = new EventEmitter<File>();
  @Input() public options: Options;

  private element: ElementRef;

  public constructor(
    element: ElementRef
  ) {
    this.element = element;
  }

  @HostListener('dragover', [
    '$event',
  ])
  public onDragOver(event: DragEvent): void {
    const transfer = this.getDataTransfer(event);

    if (!this.haveFiles(transfer.types)) {
      return;
    }

    transfer.dropEffect = 'copy';
    this.preventAndStop(event);
    this.emitFileOver(true);
  }

  @HostListener('dragleave', [
    '$event',
  ])
  public onDragLeave(event: DragEvent): void {
    if (event.currentTarget === (this as any).element[0]) {
      return;
    }

    this.preventAndStop(event);
    this.emitFileOver(false);
  }

  @HostListener('drop', [
    '$event',
  ])
  public onDrop(event: DragEvent): void {
    const transfer = this.getDataTransfer(event);

    if (!transfer) {
      return;
    }

    this.preventAndStop(event);
    this.emitFileOver(false);
    this.readFile(transfer.files[0]);
  }

  private readFile(file: File): void {
    const strategy = this.pickStrategy();

    if (!strategy) {
      this.emitFileDrop(file);
    } else {
      // XXX Waiting for angular/zone.js#358
      const method = `readAs${strategy}`;

      FileAPI[method](file, (event) => {
        if (event.type === 'load') {
          this.emitFileDrop(event.result);
        } else if (event.type === 'error') {
          throw new Error(`Couldn't read file '${file.name}'`);
        }
      });
    }
  }

  private emitFileOver(isOver: boolean): void {
    this.fileOver.emit(isOver);
  }

  private emitFileDrop(file: any): void {
    this.onFileDrop.emit(file);
  }

  private pickStrategy(): string | void {
    if (!this.options) {
      return;
    }

    if (this.hasStrategy(this.options.readAs)) {
      return this.options.readAs;
    }
  }

  private hasStrategy(type: string): boolean {
    return [
      'DataURL',
      'BinaryString',
      'ArrayBuffer',
      'Text',
    ].indexOf(type) !== -1;
  }

  private getDataTransfer(event: DragEvent | any): DataTransfer {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private preventAndStop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  private haveFiles(types: any): boolean {
    if (!types) {
      return false;
    }

    if (types.indexOf) {
      return types.indexOf('Files') !== -1;
    }

    if (types.contains) {
      return types.contains('Files');
    }

    return false;
  }
}
