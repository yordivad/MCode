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
var FlowThumb = (function (_super) {
    __extends(FlowThumb, _super);
    function FlowThumb() {
        _super.apply(this, arguments);
    }
    FlowThumb.prototype.created = function () {
        this.edgeColors = [
            "white",
            "hsl(  0, 100%, 46%)",
            "hsl( 35, 100%, 46%)",
            "hsl( 60, 100%, 46%)",
            "hsl(135, 100%, 46%)",
            "hsl(160, 100%, 46%)",
            "hsl(185, 100%, 46%)",
            "hsl(210, 100%, 46%)",
            "hsl(285, 100%, 46%)",
            "hsl(310, 100%, 46%)",
            "hsl(335, 100%, 46%)"
        ];
    };
    FlowThumb.prototype.ready = function () {
        this.thumbrectangle = [0, 0, 500, 500];
        this.viewrectangle = [0, 0, 200, 150];
    };
    FlowThumb.prototype.attached = function () {
        this.style.width = this.width + "px";
        this.style.height = this.height + "px";
        this.themeChanged();
    };
    FlowThumb.prototype.themeChanged = function () {
        if (this.theme === "dark") {
            this.fillStyle = "hsl(184, 8%, 10%)";
            this.strokeStyle = "hsl(180, 11%, 70%)";
            this.edgeColors = [
                "white",
                "hsl(  0, 100%, 46%)",
                "hsl( 35, 100%, 46%)",
                "hsl( 60, 100%, 46%)",
                "hsl(135, 100%, 46%)",
                "hsl(160, 100%, 46%)",
                "hsl(185, 100%, 46%)",
                "hsl(210, 100%, 46%)",
                "hsl(285, 100%, 46%)",
                "hsl(310, 100%, 46%)",
                "hsl(335, 100%, 46%)"
            ];
        }
        else {
            this.fillStyle = "hsl(184, 8%, 75%)";
            this.strokeStyle = "hsl(180, 11%, 20%)";
            this.edgeColors = [
                "hsl(  0,   0%, 50%)",
                "hsl(  0, 100%, 40%)",
                "hsl( 29, 100%, 40%)",
                "hsl( 47, 100%, 40%)",
                "hsl(138, 100%, 40%)",
                "hsl(160,  73%, 50%)",
                "hsl(181, 100%, 40%)",
                "hsl(216, 100%, 40%)",
                "hsl(260, 100%, 40%)",
                "hsl(348, 100%, 50%)",
                "hsl(328, 100%, 40%)"
            ];
        }
        this.redrawGraph();
    };
    FlowThumb.prototype.drawEdge = function (context, scale, source, target, route) {
        try {
            context.strokeStyle = this.edgeColors[0];
            if (route) {
                context.strokeStyle = this.edgeColors[route];
            }
            var fromX = Math.round(source.metadata.x * scale) - 0.5;
            var fromY = Math.round(source.metadata.y * scale) - 0.5;
            var toX = Math.round(target.metadata.x * scale) - 0.5;
            var toY = Math.round(target.metadata.y * scale) - 0.5;
            context.beginPath();
            context.moveTo(fromX, fromY);
            context.lineTo(toX, toY);
            context.stroke();
        }
        catch (error) {
        }
    };
    FlowThumb.prototype.redrawGraph = function () {
        var _this = this;
        if (!this.graph) {
            return;
        }
        var context = this.$.canvas.getContext("2d");
        if (!context) {
            setTimeout(this.redrawGraph.bind(this), 500);
            return;
        }
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, this.width, this.height);
        context.lineWidth = this.lineWidth;
        var toDraw = [];
        var minX = Infinity;
        var minY = Infinity;
        var maxX = -Infinity;
        var maxY = -Infinity;
        var nodes = {};
        this.graph.nodes.forEach((function (process) {
            if (process.metadata && !isNaN(process.metadata.x) && !isNaN(process.metadata.y)) {
                toDraw.push(process);
                nodes[process.id] = process;
                minX = Math.min(minX, process.metadata.x);
                minY = Math.min(minY, process.metadata.y);
                maxX = Math.max(maxX, process.metadata.x);
                maxY = Math.max(maxY, process.metadata.y);
            }
        }).bind(this));
        if (this.graph.inports) {
            Object.keys(this.graph.inports).forEach((function (key) {
                var exp = _this.graph.inports[key];
                if (exp.metadata && !isNaN(exp.metadata.x) && !isNaN(exp.metadata.y)) {
                    toDraw.push(exp);
                    minX = Math.min(minX, exp.metadata.x);
                    minY = Math.min(minY, exp.metadata.y);
                    maxX = Math.max(maxX, exp.metadata.x);
                    maxY = Math.max(maxY, exp.metadata.y);
                }
            }).bind(this));
        }
        if (this.graph.outports) {
            Object.keys(this.graph.outports).forEach((function (key) {
                var exp = _this.graph.outports[key];
                if (exp.metadata && !isNaN(exp.metadata.x) && !isNaN(exp.metadata.y)) {
                    toDraw.push(exp);
                    minX = Math.min(minX, exp.metadata.x);
                    minY = Math.min(minY, exp.metadata.y);
                    maxX = Math.max(maxX, exp.metadata.x);
                    maxY = Math.max(maxY, exp.metadata.y);
                }
            }).bind(this));
        }
        if (!isFinite(minX) || !isFinite(minY) || !isFinite(maxX) || !isFinite(maxY)) {
            return;
        }
        minX -= this.nodeSize;
        minY -= this.nodeSize;
        maxX += this.nodeSize * 2;
        maxY += this.nodeSize * 2;
        var w = maxX - minX;
        var h = maxY - minY;
        this.thumbrectangle[0] = minX;
        this.thumbrectangle[1] = minY;
        this.thumbrectangle[2] = w;
        this.thumbrectangle[3] = h;
        var scale = (w > h) ? this.width / w : this.height / h;
        this.thumbscale = scale;
        var size = Math.round(this.nodeSize * scale);
        var sizeHalf = size / 2;
        context.setTransform(1, 0, 0, 1, 0 - minX * scale, 0 - minY * scale);
        if (this.graph.inports) {
            Object.keys(this.graph.inports).forEach((function (key) {
                var exp = _this.graph.inports[key];
                if (exp.metadata && !isNaN(exp.metadata.x) && !isNaN(exp.metadata.y)) {
                    var target = nodes[exp.process];
                    if (!target) {
                        return;
                    }
                    _this.drawEdge(context, scale, exp, target, 2);
                }
            }).bind(this));
        }
        if (this.graph.outports) {
            Object.keys(this.graph.outports).forEach((function (key) {
                var exp = _this.graph.outports[key];
                if (exp.metadata && !isNaN(exp.metadata.x) && !isNaN(exp.metadata.y)) {
                    var source = nodes[exp.process];
                    if (!source) {
                        return;
                    }
                    _this.drawEdge(context, scale, source, exp, 5);
                }
            }).bind(this));
        }
        this.graph.edges.forEach((function (connection) {
            var source = nodes[connection.from.node];
            var target = nodes[connection.to.node];
            if (!source || !target) {
                return;
            }
            _this.drawEdge(context, scale, source, target, connection.metadata.route);
        }).bind(this));
        var self = this;
        toDraw.forEach((function (node) {
            var x = Math.round(node.metadata.x * scale);
            var y = Math.round(node.metadata.y * scale);
            context.strokeStyle = self.strokeStyle;
            context.fillStyle = self.fillStyle;
            context.beginPath();
            if (node.process && !node.component) {
                context.arc(x, y, sizeHalf / 2, 0, 2 * Math.PI, false);
            }
            else {
                context.arc(x, y, sizeHalf, 0, 2 * Math.PI, false);
            }
            context.fill();
            context.stroke();
            context.beginPath();
            var smallRadius = Math.max(sizeHalf - 1.5, 1);
            if (node.process && !node.component) {
                context.arc(x, y, smallRadius / 2, 0, 2 * Math.PI, false);
            }
            else {
                context.arc(x, y, smallRadius, 0, 2 * Math.PI, false);
            }
            context.fill();
        }).bind(this));
    };
    FlowThumb.prototype.graphChanged = function (oldGraph, newGraph) {
        if (!this.listener) {
            this.listener = this.redrawGraph.bind(this);
        }
        if (oldGraph) {
            oldGraph.removeListener('endTransaction', this.listener);
        }
        if (!this.graph) {
            return;
        }
        this.graph.on('endTransaction', this.listener);
        this.redrawGraph();
    };
    FlowThumb.prototype.widthChanged = function () {
        this.style.width = this.width + "px";
        this.redrawGraph();
    };
    FlowThumb.prototype.heightChanged = function () {
        this.style.height = this.height + "px";
        this.redrawGraph();
    };
    FlowThumb.prototype.toDataURL = function () {
        return this.$.canvas.toDataURL();
    };
    __decorate([
        property({ type: Number, value: 200 }), 
        __metadata('design:type', Number)
    ], FlowThumb.prototype, "width", void 0);
    __decorate([
        property({ type: Number, value: 150 }), 
        __metadata('design:type', Number)
    ], FlowThumb.prototype, "height", void 0);
    __decorate([
        property({ type: Number, value: 1 }), 
        __metadata('design:type', Number)
    ], FlowThumb.prototype, "thumbscale", void 0);
    __decorate([
        property({ type: Number, value: 60 }), 
        __metadata('design:type', Number)
    ], FlowThumb.prototype, "nodeSize", void 0);
    __decorate([
        property({ type: String, value: "hsl(184, 8%, 10%)" }), 
        __metadata('design:type', String)
    ], FlowThumb.prototype, "fillStyle", void 0);
    __decorate([
        property({ type: String, value: "hsl(180, 11%, 70%)" }), 
        __metadata('design:type', String)
    ], FlowThumb.prototype, "strokeStyle", void 0);
    __decorate([
        property({ type: Number, value: 0.75 }), 
        __metadata('design:type', Number)
    ], FlowThumb.prototype, "lineWidth", void 0);
    __decorate([
        property({ type: String, value: "dark" }), 
        __metadata('design:type', String)
    ], FlowThumb.prototype, "theme", void 0);
    FlowThumb = __decorate([
        component("flow-thumb"), 
        __metadata('design:paramtypes', [])
    ], FlowThumb);
    return FlowThumb;
})(polymer.Base);
FlowThumb.register();
