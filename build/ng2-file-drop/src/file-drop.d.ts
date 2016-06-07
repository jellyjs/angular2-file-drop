/// <reference path="../../../typings/main.d.ts" />
import 'fileapi';
import { EventEmitter, ElementRef } from '@angular/core';
export interface Options {
    readAs?: string;
}
export declare class FileDropDirective {
    fileOver: EventEmitter<boolean>;
    onFileDrop: EventEmitter<File>;
    options: Options;
    private element;
    constructor(element: ElementRef);
    onDragOver(event: DragEvent): void;
    onDragLeave(event: DragEvent): void;
    onDrop(event: DragEvent): void;
    private readFile(file);
    private emitFileOver(isOver);
    private emitFileDrop(file);
    private pickStrategy();
    private hasStrategy(type);
    private getDataTransfer(event);
    private preventAndStop(event);
    private haveFiles(types);
}
