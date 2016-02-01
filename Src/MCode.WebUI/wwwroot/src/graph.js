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
window.TheGraph = window.TheGraph || {};
var GraphElement = (function (_super) {
    __extends(GraphElement, _super);
    function GraphElement() {
        _super.apply(this, arguments);
    }
    GraphElement.prototype.created = function () {
        this.library = {};
        this.pan = [0, 0];
        this.autolayouter = klayNoflo.init({
            onSuccess: this.applyAutolayout.bind(this),
            workerScript: "/lib/klayjs/klay.js"
        });
    };
    GraphElement.prototype.ready = function () {
        this.themeChanged();
    };
    GraphElement.prototype.themeChanged = function () {
        this.$.svgcontainer.className = "the-graph-" + this.theme;
    };
    GraphElement.prototype.graphChanged = function (oldGraph, newGraph) {
        if (oldGraph && oldGraph.removeListener) {
            oldGraph.removeListener("endTransaction", this.fireChanged);
        }
        this.graph.on("endTransactions", this.fireChanged.bind(this));
        if (this.autolayout) {
            this.graph.on("addNode", this.triggerAutolayout.bind(this));
            this.graph.on("removeNode", this.triggerAutolayout.bind(this));
            this.graph.on("addInport", this.triggerAutolayout.bind(this));
            this.graph.on("removeInport", this.triggerAutolayout.bind(this));
            this.graph.on("addOutport", this.triggerAutolayout.bind(this));
            this.graph.on("removeOutport", this.triggerAutolayout.bind(this));
            this.graph.on("addEdge", this.triggerAutolayout.bind(this));
            this.graph.on("removeEdge", this.triggerAutolayout.bind(this));
        }
        if (this.appView) {
            React.unmountComponentAtNode(this.$.svgcontainer);
        }
        this.$.svgcontainer.innerHTML = "";
        this.appView = React.render(window.TheGraph.App({
            graph: this.graph,
            width: this.width,
            height: this.height,
            minZoom: this.minZoom,
            maxZoom: this.maxZoom,
            library: this.library,
            menus: this.menus,
            editable: this.editable,
            onEdgeSelection: this.onEdgeSelection.bind(this),
            onNodeSelection: this.onNodeSelection.bind(this),
            onPaseScale: this.onPaneScale.bind(this),
            getMenuDef: this.getMenuDef,
            displaySelectuibGroup: this.displaySelectionGroup,
            forceSelection: this.forceSelection,
            offsetX: this.offsetX,
            offsetY: this.offsetY
        }), this.$.svgcontainer);
        this.graphView = this.appView.refs.graph;
    };
    GraphElement.prototype.onPaneScale = function (x, y, scale) {
        this.pan[0] = x;
        this.pan[1] = y;
        this.scale = scale;
    };
    GraphElement.prototype.onEdgeSelection = function (itemKey, item, toggle) {
        if (itemKey === undefined) {
            if (this.selectedEdges.length > 0) {
                this.selectedEdges = [];
            }
            this.fire("edge", this.selectedEdges);
            return;
        }
        if (toggle) {
            var index = this.selectedEdges.indexOf(item);
            var isSelected = (index !== -1);
            var shallowClone = this.selectedEdges.slice();
            if (isSelected) {
                shallowClone.splice(index, 1);
                this.selectedEdges = shallowClone;
            }
            else {
                shallowClone.push(item);
                this.selectedEdges = shallowClone;
            }
        }
        else {
            this.selectedEdges = [item];
        }
        this.fire('edges', this.selectedEdges);
    };
    GraphElement.prototype.onNodeSelection = function (itemKey, item, toggle) {
        if (itemKey === undefined) {
            this.selectedNodes = [];
        }
        else if (toggle) {
            var index = this.selectedNodes.indexOf(item);
            var isSelected = (index !== -1);
            if (isSelected) {
                this.selectedNodes.splice(index, 1);
            }
            else {
                this.selectedNodes.push(item);
            }
        }
        else {
            this.selectedNodes = [item];
        }
        this.fire('nodes', this.selectedNodes);
    };
    GraphElement.prototype.selectedNodesChanged = function () {
        var selectedNodesHash = {};
        for (var i = 0, len = this.selectedNodes.length; i < len; i++) {
            selectedNodesHash[this.selectedNodes[i].id] = true;
        }
        this.selectedNodesHash = selectedNodesHash;
        this.fire('nodes', this.selectedNodes);
    };
    GraphElement.prototype.selectedNodesHashChanged = function () {
        if (!this.graphView) {
            return;
        }
        this.graphView.setSelectedNodes(this.selectedNodesHash);
    };
    GraphElement.prototype.errorNodesChanged = function () {
        if (!this.graphView) {
            return;
        }
        this.graphView.setErrorNodes(this.errorNodes);
    };
    GraphElement.prototype.selectedEdgesChanged = function () {
        if (!this.graphView) {
            return;
        }
        this.graphView.setSelectedEdges(this.selectedEdges);
        this.fire('edges', this.selectedEdges);
    };
    GraphElement.prototype.animatedEdgesChanged = function () {
        if (!this.graphView) {
            return;
        }
        this.graphView.setAnimatedEdges(this.animatedEdges);
    };
    GraphElement.prototype.fireChanged = function (event) {
        this.fire("changed", this);
    };
    GraphElement.prototype.autolayoutChanged = function () {
        if (!this.graph) {
            return;
        }
        if (this.autolayout) {
            this.graph.on('addNode', this.triggerAutolayout.bind(this));
            this.graph.on('removeNode', this.triggerAutolayout.bind(this));
            this.graph.on('addInport', this.triggerAutolayout.bind(this));
            this.graph.on('removeInport', this.triggerAutolayout.bind(this));
            this.graph.on('addOutport', this.triggerAutolayout.bind(this));
            this.graph.on('removeOutport', this.triggerAutolayout.bind(this));
            this.graph.on('addEdge', this.triggerAutolayout.bind(this));
            this.graph.on('removeEdge', this.triggerAutolayout.bind(this));
        }
        else {
            this.graph.removeListener('addNode', this.triggerAutolayout);
            this.graph.removeListener('removeNode', this.triggerAutolayout);
            this.graph.removeListener('addInport', this.triggerAutolayout);
            this.graph.removeListener('removeInport', this.triggerAutolayout);
            this.graph.removeListener('addOutport', this.triggerAutolayout);
            this.graph.removeListener('removeOutport', this.triggerAutolayout);
            this.graph.removeListener('addEdge', this.triggerAutolayout);
            this.graph.removeListener('removeEdge', this.triggerAutolayout);
        }
    };
    GraphElement.prototype.triggerAutolayout = function (event) {
        var graph = this.graph;
        var portInfo = this.graphView ? this.graphView.portInfo : null;
        this.autolayouter.layout({
            "graph": graph,
            "portInfo": portInfo,
            "direction": "RIGHT",
            "options": {
                "intCoordinates": true,
                "algorithm": "de.cau.cs.kieler.klay.layered",
                "layoutHierarchy": true,
                "spacing": 36,
                "borderSpacing": 20,
                "edgeSpacingFactor": 0.2,
                "inLayerSpacingFactor": 2.0,
                "nodePlace": "BRANDES_KOEPF",
                "nodeLayering": "NETWORK_SIMPLEX",
                "edgeRouting": "POLYLINE",
                "crossMin": "LAYER_SWEEP",
                "direction": "RIGHT"
            }
        });
    };
    GraphElement.prototype.applyAutolayout = function (layoutedKGraph) {
        this.graph.startTransaction("autolayout");
        var children = layoutedKGraph.children.slice();
        var i, len;
        for (i = 0, len = children.length; i < len; i++) {
            var klayNode = children[i];
            var nofloNode = this.graph.getNode(klayNode.id);
            if (klayNode.children) {
                var klayChildren = klayNode.children;
                var idx;
                for (idx in klayChildren) {
                    var klayChild = klayChildren[idx];
                    if (klayChild.id) {
                        this.graph.setNodeMetadata(klayChild.id, {
                            x: Math.round((klayNode.x + klayChild.x) / this.snap) * this.snap,
                            y: Math.round((klayNode.y + klayChild.y) / this.snap) * this.snap
                        });
                    }
                }
            }
            if (nofloNode) {
                this.graph.setNodeMetadata(klayNode.id, {
                    x: Math.round(klayNode.x / this.snap) * this.snap,
                    y: Math.round(klayNode.y / this.snap) * this.snap
                });
            }
            else {
                var idSplit = klayNode.id.split(":::");
                var expDirection = idSplit[0];
                var expKey = idSplit[1];
                if (expDirection === "inport" && this.graph.inports[expKey]) {
                    this.graph.setInportMetadata(expKey, {
                        x: Math.round(klayNode.x / this.snap) * this.snap,
                        y: Math.round(klayNode.y / this.snap) * this.snap
                    });
                }
                else if (expDirection === "outport" && this.graph.outports[expKey]) {
                    this.graph.setOutportMetadata(expKey, {
                        x: Math.round(klayNode.x / this.snap) * this.snap,
                        y: Math.round(klayNode.y / this.snap) * this.snap
                    });
                }
            }
        }
        this.graph.endTransaction("autolayout");
        this.triggerFit();
    };
    GraphElement.prototype.triggerFit = function () {
        if (this.appView) {
            this.appView.triggerFit();
        }
    };
    GraphElement.prototype.widthChanged = function () {
        if (!this.appView) {
            return;
        }
        this.appView.setState({
            width: this.width
        });
    };
    GraphElement.prototype.heightChanged = function () {
        if (!this.appView) {
            return;
        }
        this.appView.setState({
            height: this.height
        });
    };
    GraphElement.prototype.updateIcon = function (nodeId, icon) {
        if (!this.graphView) {
            return;
        }
        this.graphView.updateIcon(nodeId, icon);
    };
    GraphElement.prototype.rerender = function (options) {
        if (!this.graphView) {
            return;
        }
        this.graphView.markDirty(options);
    };
    GraphElement.prototype.addNode = function (id, component, metadata) {
        if (!this.graph) {
            return;
        }
        this.graph.addNode(id, component, metadata);
    };
    GraphElement.prototype.getPan = function () {
        if (!this.appView) {
            return [0, 0];
        }
        return [this.appView.state.x, this.appView.state.y];
    };
    GraphElement.prototype.panChanged = function () {
        if (!this.appView) {
            return;
        }
        this.appView.setState({
            x: this.pan[0],
            y: this.pan[1]
        });
    };
    GraphElement.prototype.getScale = function () {
        if (!this.appView) {
            return 1;
        }
        return this.appView.state.scale;
    };
    GraphElement.prototype.displaySelectionGroupChanged = function () {
        if (!this.graphView) {
            return;
        }
        this.graphView.setState({
            displaySelectionGroup: this.displaySelectionGroup
        });
    };
    GraphElement.prototype.forceSelectionChanged = function () {
        if (!this.graphView) {
            return;
        }
        this.graphView.setState({
            forceSelection: this.forceSelection
        });
    };
    GraphElement.prototype.focusNode = function (node) {
        this.appView.focusNode(node);
    };
    GraphElement.prototype.menusChanged = function () {
        if (!this.appView) {
            return;
        }
        this.appView.setProps({ menus: this.menus });
    };
    GraphElement.prototype.debounceLibraryRefesh = function () {
        if (this.debounceLibraryRefeshTimer) {
            clearTimeout(this.debounceLibraryRefeshTimer);
        }
        this.debounceLibraryRefeshTimer = setTimeout(function () {
            this.rerender({ libraryDirty: true });
        }.bind(this), 200);
    };
    GraphElement.prototype.mergeComponentDefinition = function (component, definition) {
        if (component === definition) {
            return definition;
        }
        var _i, _j, _len, _len1, exists;
        var cInports = component.inports;
        var dInports = definition.inports;
        if (cInports !== dInports) {
            for (_i = 0, _len = cInports.length; _i < _len; _i++) {
                var cInport = cInports[_i];
                exists = false;
                for (_j = 0, _len1 = dInports.length; _j < _len1; _j++) {
                    var dInport = dInports[_j];
                    if (cInport.name === dInport.name) {
                        exists = true;
                    }
                }
                if (!exists) {
                    dInports.push(cInport);
                }
            }
        }
        var cOutports = component.outports;
        var dOutports = definition.outports;
        if (cOutports !== dOutports) {
            for (_i = 0, _len = cOutports.length; _i < _len; _i++) {
                var cOutport = cOutports[_i];
                exists = false;
                for (_j = 0, _len1 = dOutports.length; _j < _len1; _j++) {
                    var dOutport = dOutports[_j];
                    if (cOutport.name === dOutport.name) {
                        exists = true;
                    }
                }
                if (!exists) {
                    dOutports.push(cOutport);
                }
            }
        }
        if (definition.icon !== 'cog') {
            component.icon = definition.icon;
        }
        else {
            definition.icon = component.icon;
        }
        definition.iconsvg = component.iconsvg;
        return definition;
    };
    GraphElement.prototype.registerComponent = function (definition, generated) {
        var component = this.library[definition.name];
        var def = definition;
        if (component) {
            if (generated) {
                return;
            }
            def = this.mergeComponentDefinition(component, definition);
        }
        this.library[definition.name] = def;
        this.debounceLibraryRefesh();
    };
    GraphElement.prototype.getComponent = function (name) {
        return this.library[name];
    };
    GraphElement.prototype.toJSON = function () {
        if (!this.graph) {
            return {};
        }
        return this.graph.toJSON();
    };
    __decorate([
        property({ type: Number, value: 800 }), 
        __metadata('design:type', Number)
    ], GraphElement.prototype, "width", void 0);
    __decorate([
        property({ type: Number, value: 600 }), 
        __metadata('design:type', Number)
    ], GraphElement.prototype, "height", void 0);
    __decorate([
        property({ type: Number, value: 1 }), 
        __metadata('design:type', Number)
    ], GraphElement.prototype, "scale", void 0);
    __decorate([
        property({ type: Number, value: 0.15 }), 
        __metadata('design:type', Number)
    ], GraphElement.prototype, "minZoom", void 0);
    __decorate([
        property({ type: Number, value: 15 }), 
        __metadata('design:type', Number)
    ], GraphElement.prototype, "maxZoom", void 0);
    __decorate([
        property({ type: Boolean, value: true }), 
        __metadata('design:type', Boolean)
    ], GraphElement.prototype, "editable", void 0);
    __decorate([
        property({ type: Number, value: 72 }), 
        __metadata('design:type', Number)
    ], GraphElement.prototype, "grid", void 0);
    __decorate([
        property({ type: Number, value: 36 }), 
        __metadata('design:type', Number)
    ], GraphElement.prototype, "snap", void 0);
    __decorate([
        property({ type: String, value: "dark" }), 
        __metadata('design:type', String)
    ], GraphElement.prototype, "theme", void 0);
    __decorate([
        property({ type: Array, value: [] }), 
        __metadata('design:type', Object)
    ], GraphElement.prototype, "selectedNodes", void 0);
    __decorate([
        property({ type: Object, value: {} }), 
        __metadata('design:type', Object)
    ], GraphElement.prototype, "selectedNodeHash", void 0);
    __decorate([
        property({ type: Array, value: [] }), 
        __metadata('design:type', Object)
    ], GraphElement.prototype, "selectedEdges", void 0);
    __decorate([
        property({ type: Array, value: [] }), 
        __metadata('design:type', Object)
    ], GraphElement.prototype, "animatedEdges", void 0);
    __decorate([
        property({ type: Number, value: 0 }), 
        __metadata('design:type', Number)
    ], GraphElement.prototype, "offsetY", void 0);
    __decorate([
        property({ type: Number, value: 0 }), 
        __metadata('design:type', Number)
    ], GraphElement.prototype, "offsetX", void 0);
    __decorate([
        property(), 
        __metadata('design:type', Object)
    ], GraphElement.prototype, "pan", void 0);
    __decorate([
        property(), 
        __metadata('design:type', Object)
    ], GraphElement.prototype, "getMenuDef", void 0);
    GraphElement = __decorate([
        component("graph-element"), 
        __metadata('design:paramtypes', [])
    ], GraphElement);
    return GraphElement;
})(polymer.Base);
GraphElement.register();
