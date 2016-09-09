"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('fileapi');
const core_1 = require('@angular/core');
let FileDropDirective = class FileDropDirective {
    constructor(element) {
        this.fileOver = new core_1.EventEmitter();
        this.onFileDrop = new core_1.EventEmitter();
        this.element = element;
    }
    onDragOver(event) {
        const transfer = this.getDataTransfer(event);
        if (!this.haveFiles(transfer.types)) {
            return;
        }
        transfer.dropEffect = 'copy';
        this.preventAndStop(event);
        this.emitFileOver(true);
    }
    onDragLeave(event) {
        if (event.currentTarget === this.element[0]) {
            return;
        }
        this.preventAndStop(event);
        this.emitFileOver(false);
    }
    onDrop(event) {
        const transfer = this.getDataTransfer(event);
        if (!transfer) {
            return;
        }
        this.preventAndStop(event);
        this.emitFileOver(false);
        this.readFile(transfer.files[0]);
    }
    readFile(file) {
        const strategy = this.pickStrategy();
        if (!strategy) {
            this.emitFileDrop(file);
        }
        else {
            // XXX Waiting for angular/zone.js#358
            const method = `readAs${strategy}`;
            FileAPI[method](file, (event) => {
                if (event.type === 'load') {
                    this.emitFileDrop(event.result);
                }
                else if (event.type === 'error') {
                    throw new Error(`Couldn't read file '${file.name}'`);
                }
            });
        }
    }
    emitFileOver(isOver) {
        this.fileOver.emit(isOver);
    }
    emitFileDrop(file) {
        this.onFileDrop.emit(file);
    }
    pickStrategy() {
        if (!this.options) {
            return;
        }
        if (this.hasStrategy(this.options.readAs)) {
            return this.options.readAs;
        }
    }
    hasStrategy(type) {
        return [
            'DataURL',
            'BinaryString',
            'ArrayBuffer',
            'Text',
        ].indexOf(type) !== -1;
    }
    getDataTransfer(event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    }
    preventAndStop(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    haveFiles(types) {
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
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', core_1.EventEmitter)
], FileDropDirective.prototype, "fileOver", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', core_1.EventEmitter)
], FileDropDirective.prototype, "onFileDrop", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], FileDropDirective.prototype, "options", void 0);
__decorate([
    core_1.HostListener('dragover', [
        '$event',
    ]), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [DragEvent]), 
    __metadata('design:returntype', void 0)
], FileDropDirective.prototype, "onDragOver", null);
__decorate([
    core_1.HostListener('dragleave', [
        '$event',
    ]), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [DragEvent]), 
    __metadata('design:returntype', void 0)
], FileDropDirective.prototype, "onDragLeave", null);
__decorate([
    core_1.HostListener('drop', [
        '$event',
    ]), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [DragEvent]), 
    __metadata('design:returntype', void 0)
], FileDropDirective.prototype, "onDrop", null);
FileDropDirective = __decorate([
    core_1.Directive({ selector: '[fileDrop]' }), 
    __metadata('design:paramtypes', [core_1.ElementRef])
], FileDropDirective);
exports.FileDropDirective = FileDropDirective;
//# sourceMappingURL=file-drop.js.map