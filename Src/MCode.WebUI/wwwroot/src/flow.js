var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Flow = (function (_super) {
    __extends(Flow, _super);
    function Flow() {
        _super.apply(this, arguments);
    }
    Flow.prototype.ready = function () {
        var _this = this;
        this.editor = document.getElementById("editor");
        window.loadGraph = function (json) {
            var graph = json;
            _this.editor.graph = graph;
            _this.editor.graphChanged();
            _this.nav = document.getElementById("nav");
            _this.nav.editor = _this.editor;
            _this.thumb = document.getElementById("thumb");
            _this.thumb.graph = _this.editor.nofloGraph;
            _this.thumb.redrawGraph();
        };
        var body = document.querySelector("body");
        var script = document.createElement("script");
        script.type = "application/javascript";
        script.src = "photobooth.json.js";
        body.appendChild(script);
        var resize = function () {
            _this.editor.setAttribute("width", window.innerWidth.toString());
            _this.editor.setAttribute("height", window.innerHeight.toString());
        };
        window.addEventListener("resize", resize);
        resize();
    };
    Flow.prototype.nodeSelected = function (nodes) {
        alert(nodes);
    };
    __decorate([
        listen("nodes"), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Flow.prototype, "nodeSelected", null);
    Flow = __decorate([
        component("flow-element"), 
        __metadata('design:paramtypes', [])
    ], Flow);
    return Flow;
})(polymer.Base);
Flow.register();
