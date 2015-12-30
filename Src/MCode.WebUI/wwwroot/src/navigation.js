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
var Navigation = (function (_super) {
    __extends(Navigation, _super);
    function Navigation() {
        _super.apply(this, arguments);
    }
    Navigation.prototype.ready = function () {
        this.viewrectangle = [0, 0, 500, 500];
        this.scaledviewrectangle = [0, 0, 200, 150];
    };
    Navigation.prototype.attached = function () {
        var _this = this;
        this.style.overflow = "hidden";
        this.style.cursor = "move";
        this.style.width = this.width + "px";
        this.style.height = this.height + "px";
        var noop = function () { };
        PolymerGestures.addEventListener(this, "track", noop);
        PolymerGestures.addEventListener(this, "trackend", noop);
        PolymerGestures.addEventListener(this, "tap", noop);
        this.addEventListener("track", (function (event) {
            if (!_this.editor) {
                return;
            }
            event.stopPropagation();
            var x = _this.editor.pan[0];
            var y = _this.editor.pan[1];
            var panscale = _this.thumbscale / _this.editor.scale;
            x -= event.ddx / panscale;
            y -= event.ddy / panscale;
            _this.editor.pan = [Math.round(x), Math.round(y)];
            event.preventTap();
        }).bind(this));
        this.addEventListener("trackend", (function (event) {
            event.stopPropagation();
        }).bind(this));
        this.addEventListener("tap", function () {
            if (!_this.editor) {
                return;
            }
            _this.editor.triggerFit();
        });
    };
    Navigation.prototype.editorChanged = function (oldEditor, newEditor) {
    };
    Navigation.prototype.editorPanChanged = function () {
        if (!this.editor.pan) {
            return;
        }
        var x = this.editor.pan[0];
        var y = this.editor.pan[1];
        this.viewrectangle[0] = -x;
        this.viewrectangle[1] = -y;
    };
    Navigation.prototype.editorWidthChanged = function () {
        this.viewrectangle[2] = parseInt(this.editor.width, 10);
    };
    Navigation.prototype.editorHeightChanged = function () {
        this.viewrectangle[3] = parseInt(this.editor.height, 10);
    };
    Navigation.prototype.editorScaleChanged = function () {
        this.scale = this.editor.scale;
    };
    Navigation.prototype.editorThemeChanged = function () {
        if (this.editor.theme === "dark") {
            this.viewBoxBorder = "hsla(190, 100%, 80%, 0.4)";
            this.viewBoxBorder2 = "hsla( 10,  60%, 32%, 0.3)";
            this.outsideFill = "hsla(0, 0%, 0%, 0.4)";
            this.backgroundColor = "hsla(0, 0%, 0%, 0.9)";
        }
        else {
            this.viewBoxBorder = "hsla(190, 100%, 20%, 0.8)";
            this.viewBoxBorder2 = "hsla( 10,  60%, 80%, 0.8)";
            this.outsideFill = "hsla(0, 0%, 100%, 0.4)";
            this.backgroundColor = "hsla(0, 0%, 100%, 0.9)";
        }
        this.style.backgroundColor = this.backgroundColor;
        this.viewrectangleChanged();
    };
    Navigation.prototype.viewrectangleChanged = function () {
        var context = this.$.outcanvas.getContext('2d');
        context.clearRect(0, 0, this.width, this.height);
        context.fillStyle = this.outsideFill;
        var x = Math.round((this.viewrectangle[0] / this.scale - this.thumbrectangle[0]) * this.thumbscale);
        var y = Math.round((this.viewrectangle[1] / this.scale - this.thumbrectangle[1]) * this.thumbscale);
        var w = Math.round(this.viewrectangle[2] * this.thumbscale / this.scale);
        var h = Math.round(this.viewrectangle[3] * this.thumbscale / this.scale);
        if (x < 0 && y < 0 && w > this.width - x && h > this.height - y) {
            this.hide = true;
            return;
        }
        else {
            this.hide = false;
        }
        if (x < 0) {
            w += x;
            x = 0;
            this.$.viewrect.style.borderLeftColor = this.viewBoxBorder2;
        }
        else {
            this.$.viewrect.style.borderLeftColor = this.viewBoxBorder;
            context.fillRect(0, 0, x, this.height);
        }
        if (y < 0) {
            h += y;
            y = 0;
            this.$.viewrect.style.borderTopColor = this.viewBoxBorder2;
        }
        else {
            this.$.viewrect.style.borderTopColor = this.viewBoxBorder;
            context.fillRect(x, 0, w, y);
        }
        if (w > this.width - x) {
            w = this.width - x;
            this.$.viewrect.style.borderRightColor = this.viewBoxBorder2;
        }
        else {
            this.$.viewrect.style.borderRightColor = this.viewBoxBorder;
            context.fillRect(x + w, 0, this.width - (x + w), this.height);
        }
        if (h > this.height - y) {
            h = this.height - y;
            this.$.viewrect.style.borderBottomColor = this.viewBoxBorder2;
        }
        else {
            this.$.viewrect.style.borderBottomColor = this.viewBoxBorder;
            context.fillRect(x, y + h, w, this.height - (y + h));
        }
        this.$.viewrect.style.left = x + "px";
        this.$.viewrect.style.top = y + "px";
        this.$.viewrect.style.width = w + "px";
        this.$.viewrect.style.height = h + "px";
    };
    Navigation.prototype.hideChanged = function () {
        if (this.hide) {
            this.style.display = "none";
        }
        else {
            this.style.display = "block";
        }
    };
    Navigation.prototype.thumbscaleChanged = function () {
        this.viewrectangleChanged();
    };
    Navigation.prototype.thumbrectangleChanged = function () {
        var w = this.thumbrectangle[2];
        var h = this.thumbrectangle[3];
        this.thumbscale = (w > h) ? this.width / w : this.height / h;
    };
    __decorate([
        property({ type: Number, value: 200 }), 
        __metadata('design:type', Number)
    ], Navigation.prototype, "width", void 0);
    __decorate([
        property({ type: Number, value: 150 }), 
        __metadata('design:type', Number)
    ], Navigation.prototype, "height", void 0);
    __decorate([
        property({ type: Boolean, value: false }), 
        __metadata('design:type', Boolean)
    ], Navigation.prototype, "hide", void 0);
    __decorate([
        property({ type: Number, value: 1 }), 
        __metadata('design:type', Number)
    ], Navigation.prototype, "thumbscale", void 0);
    __decorate([
        property({ type: String, value: "hsla(184, 8%, 75%, 0.9)" }), 
        __metadata('design:type', String)
    ], Navigation.prototype, "backgroundColor", void 0);
    __decorate([
        property({ type: String, value: "hsla(0, 0%, 0%, 0.4)" }), 
        __metadata('design:type', String)
    ], Navigation.prototype, "outsideFill", void 0);
    __decorate([
        property({ type: String, value: "dark" }), 
        __metadata('design:type', String)
    ], Navigation.prototype, "theme", void 0);
    __decorate([
        observe("editor.pan"), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], Navigation.prototype, "editorPanChanged", null);
    __decorate([
        observe("editor.width"), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], Navigation.prototype, "editorWidthChanged", null);
    __decorate([
        observe("editor.height"), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], Navigation.prototype, "editorHeightChanged", null);
    Navigation = __decorate([
        component("flow-navigation"), 
        __metadata('design:paramtypes', [])
    ], Navigation);
    return Navigation;
})(polymer.Base);
Navigation.register();
