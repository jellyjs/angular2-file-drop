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
var core_1 = require('@angular/core');
var file_drop_1 = require('./file-drop');
var FileDropModule = (function () {
    function FileDropModule() {
    }
    FileDropModule = __decorate([
        core_1.NgModule({
            declarations: [
                file_drop_1.FileDropDirective,
            ],
            exports: [file_drop_1.FileDropDirective],
            imports: [],
            providers: [],
        }), 
        __metadata('design:paramtypes', [])
    ], FileDropModule);
    return FileDropModule;
})();
exports.FileDropModule = FileDropModule;
//# sourceMappingURL=file-drop-module.js.map