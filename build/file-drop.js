var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'fileapi';
import { Directive, EventEmitter, ElementRef, HostListener, Input, Output, } from '@angular/core';
var FileDropDirective = (function () {
    function FileDropDirective(element) {
        this.fileOver = new EventEmitter();
        this.onFileDrop = new EventEmitter();
        this.element = element;
    }
    FileDropDirective.prototype.onDragOver = function (event) {
        var transfer = this.getDataTransfer(event);
        if (!this.haveFiles(transfer.types)) {
            return;
        }
        transfer.dropEffect = 'copy';
        this.preventAndStop(event);
        this.emitFileOver(true);
    };
    FileDropDirective.prototype.onDragLeave = function (event) {
        if (event.currentTarget === this.element[0]) {
            return;
        }
        this.preventAndStop(event);
        this.emitFileOver(false);
    };
    FileDropDirective.prototype.onDrop = function (event) {
        var transfer = this.getDataTransfer(event);
        if (!transfer) {
            return;
        }
        this.preventAndStop(event);
        this.emitFileOver(false);
        this.readFile(transfer.files[0]);
    };
    FileDropDirective.prototype.readFile = function (file) {
        var _this = this;
        var strategy = this.pickStrategy();
        if (!strategy) {
            this.emitFileDrop(file);
        }
        else {
            // XXX Waiting for angular/zone.js#358
            var method = "readAs" + strategy;
            FileAPI[method](file, function (event) {
                if (event.type === 'load') {
                    _this.emitFileDrop(event.result);
                }
                else if (event.type === 'error') {
                    throw new Error("Couldn't read file '" + file.name + "'");
                }
            });
        }
    };
    FileDropDirective.prototype.emitFileOver = function (isOver) {
        this.fileOver.emit(isOver);
    };
    FileDropDirective.prototype.emitFileDrop = function (file) {
        this.onFileDrop.emit(file);
    };
    FileDropDirective.prototype.pickStrategy = function () {
        if (!this.options) {
            return;
        }
        if (this.hasStrategy(this.options.readAs)) {
            return this.options.readAs;
        }
    };
    FileDropDirective.prototype.hasStrategy = function (type) {
        return [
            'DataURL',
            'BinaryString',
            'ArrayBuffer',
            'Text',
        ].indexOf(type) !== -1;
    };
    FileDropDirective.prototype.getDataTransfer = function (event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    };
    FileDropDirective.prototype.preventAndStop = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    FileDropDirective.prototype.haveFiles = function (types) {
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
    };
    return FileDropDirective;
}());
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], FileDropDirective.prototype, "fileOver", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], FileDropDirective.prototype, "onFileDrop", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FileDropDirective.prototype, "options", void 0);
__decorate([
    HostListener('dragover', [
        '$event',
    ]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileDropDirective.prototype, "onDragOver", null);
__decorate([
    HostListener('dragleave', [
        '$event',
    ]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileDropDirective.prototype, "onDragLeave", null);
__decorate([
    HostListener('drop', [
        '$event',
    ]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileDropDirective.prototype, "onDrop", null);
FileDropDirective = __decorate([
    Directive({ selector: '[fileDrop]' }),
    __metadata("design:paramtypes", [ElementRef])
], FileDropDirective);
export { FileDropDirective };
//# sourceMappingURL=file-drop.js.map