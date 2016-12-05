var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('fileapi');
var core_1 = require('@angular/core');
var FileDropDirective = (function () {
    function FileDropDirective(element) {
        this.fileOver = new core_1.EventEmitter();
        this.onFileDrop = new core_1.EventEmitter();
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
        if (event.currentTarget === (this))
            as;
        any;
        element[0];
        {
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
        for (var i = 0; i < transfer.files.length; i++) {
            this.readFile(transfer.files[i]);
        }
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
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof EventEmitter !== 'undefined' && EventEmitter) || Object)
    ], FileDropDirective.prototype, "fileOver");
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof EventEmitter !== 'undefined' && EventEmitter) || Object)
    ], FileDropDirective.prototype, "onFileDrop");
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FileDropDirective.prototype, "options");
    Object.defineProperty(FileDropDirective.prototype, "onDragOver",
        __decorate([
            core_1.HostListener('dragover', [
                '$event',
            ]), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [Object]), 
            __metadata('design:returntype', void 0)
        ], FileDropDirective.prototype, "onDragOver", Object.getOwnPropertyDescriptor(FileDropDirective.prototype, "onDragOver")));
    Object.defineProperty(FileDropDirective.prototype, "onDragLeave",
        __decorate([
            core_1.HostListener('dragleave', [
                '$event',
            ]), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [Object]), 
            __metadata('design:returntype', void 0)
        ], FileDropDirective.prototype, "onDragLeave", Object.getOwnPropertyDescriptor(FileDropDirective.prototype, "onDragLeave")));
    Object.defineProperty(FileDropDirective.prototype, "onDrop",
        __decorate([
            core_1.HostListener('drop', [
                '$event',
            ]), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [Object]), 
            __metadata('design:returntype', void 0)
        ], FileDropDirective.prototype, "onDrop", Object.getOwnPropertyDescriptor(FileDropDirective.prototype, "onDrop")));
    FileDropDirective = __decorate([
        core_1.Directive({ selector: '[fileDrop]' }), 
        __metadata('design:paramtypes', [(typeof ElementRef !== 'undefined' && ElementRef) || Object])
    ], FileDropDirective);
    return FileDropDirective;
})();
exports.FileDropDirective = FileDropDirective;
//# sourceMappingURL=file-drop.js.map