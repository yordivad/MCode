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
var FlowEditor = (function (_super) {
    __extends(FlowEditor, _super);
    function FlowEditor() {
        _super.apply(this, arguments);
    }
    FlowEditor.prototype.created = function () {
        var _this = this;
        this.fnMenu = function (options) {
            if (options.type && _this.menus[options.type]) {
                var defaultMenu = _this.menus[options.type];
                if (defaultMenu.callback) {
                    return defaultMenu.callback(defaultMenu, options);
                }
                return defaultMenu;
            }
            return null;
        };
    };
    FlowEditor.prototype.ready = function () {
        var _this = this;
        this.pan = [0, 0];
        var pasteAction = (function (graph) {
            var pasted = TheGraph.Clipboard.paste(graph);
            _this.selectedNodes = pasted.nodes;
            _this.selectedEdges = [];
        }).bind(this);
        var pasteMenu = {
            icon: "paste",
            iconLabel: "paste",
            action: pasteAction
        };
        this.menus = {
            main: {
                icon: "sitemap",
                e4: pasteMenu
            },
            edge: {
                icon: "long-arrow-right",
                s4: {
                    icon: "trash-o",
                    iconLabel: "delete",
                    action: (function (graph, itemKey, item) {
                        graph.removeEdge(item.from.node, item.from.port, item.to.node, item.to.port);
                        var newSelection = [];
                        for (var i = 0, len = _this.selectedEdges.length; i < len; i++) {
                            var selected = _this.selectedEdges[i];
                            if (selected !== item) {
                                newSelection.push(selected);
                            }
                        }
                        _this.selectedEdges = newSelection;
                    }).bind(this)
                }
            },
            node: {
                s4: {
                    icon: "trash-o",
                    iconLabel: "delete",
                    action: (function (graph, itemKey, item) {
                        graph.removeNode(itemKey);
                        var newSelection = [];
                        for (var i = 0, len = _this.selectedNodes.length; i < len; i++) {
                            var selected = _this.selectedNodes[i];
                            if (selected !== item) {
                                newSelection.push(selected);
                            }
                        }
                        _this.selectedNodes = newSelection;
                    }).bind(this)
                },
                w4: {
                    icon: "copy",
                    iconLabel: "copy",
                    action: function (graph, itemKey) {
                        TheGraph.Clipboard.copy(graph, [itemKey]);
                    }
                }
            },
            nodeInport: {
                w4: {
                    icon: "sign-in",
                    iconLabel: "export",
                    action: function (graph, itemKey, item) {
                        var pub = item.port;
                        if (pub === "start") {
                            pub = "start1";
                        }
                        if (pub === "graph") {
                            pub = "graph1";
                        }
                        var count = 0;
                        while (graph.inports[pub]) {
                            count++;
                            pub = item.port + count;
                        }
                        var priNode = graph.getNode(item.process);
                        var metadata = { x: priNode.metadata.x - 144, y: priNode.metadata.y };
                        graph.addInport(pub, item.process, item.port, metadata);
                    }
                }
            },
            nodeOutport: {
                e4: {
                    icon: "sign-out",
                    iconLabel: "export",
                    action: function (graph, itemKey, item) {
                        var pub = item.port;
                        var count = 0;
                        while (graph.outports[pub]) {
                            count++;
                            pub = item.port + count;
                        }
                        var priNode = graph.getNode(item.process);
                        var metadata = { x: priNode.metadata.x + 144, y: priNode.metadata.y };
                        graph.addOutport(pub, item.process, item.port, metadata);
                    }
                }
            },
            graphInport: {
                icon: "sign-in",
                iconColor: 2,
                n4: {
                    label: "inport"
                },
                s4: {
                    icon: "trash-o",
                    iconLabel: "delete",
                    action: function (graph, itemKey) {
                        graph.removeInport(itemKey);
                    }
                }
            },
            graphOutport: {
                icon: "sign-out",
                iconColor: 5,
                n4: {
                    label: "outport"
                },
                s4: {
                    icon: "trash-o",
                    iconLabel: "delete",
                    action: function (graph, itemKey) {
                        graph.removeOutport(itemKey);
                    }
                }
            },
            group: {
                icon: "th",
                s4: {
                    icon: "trash-o",
                    iconLabel: "ungroup",
                    action: function (graph, itemKey) {
                        graph.removeGroup(itemKey);
                    }
                },
                e4: pasteMenu
            },
            selection: {
                icon: "th",
                w4: {
                    icon: "copy",
                    iconLabel: "copy",
                    action: function (graph, itemKey, item) {
                        TheGraph.Clipboard.copy(graph, item.nodes);
                    }
                },
                e4: pasteMenu
            }
        };
    };
    FlowEditor.prototype.attached = function () {
    };
    FlowEditor.prototype.detached = function () {
        var plugins = this.plugins;
        for (var name in plugins) {
            if (plugins.hasOwnProperty(name)) {
                plugins[name].unregister(this);
                delete plugins[name];
            }
        }
    };
    FlowEditor.prototype.addPlugin = function (name, plugin) {
        this.plugins[name] = plugin;
        plugin.register(this);
    };
    FlowEditor.prototype.addMenu = function (type, options) {
        this.menus[type] = options;
    };
    FlowEditor.prototype.addMenuCallback = function (type, callback) {
        if (!this.menus[type]) {
            return;
        }
        this.menus[type].callback = callback;
    };
    FlowEditor.prototype.addMenuAction = function (type, direction, options) {
        if (!this.menus[type]) {
            this.menus[type] = {};
        }
        var menu = this.menus[type];
        menu[direction] = options;
    };
    FlowEditor.prototype.getMenuDef = function (options) {
        return this.fnMenu(options);
    };
    FlowEditor.prototype.widthChanged = function () {
        this.style.width = this.width + "px";
    };
    FlowEditor.prototype.heightChanged = function () {
        this.style.height = this.height + "px";
    };
    FlowEditor.prototype.graphChanged = function () {
        if (typeof this.graph.addNode === "function") {
            this.buildInitialLibrary(this.graph);
            this.nofloGraph = this.graph;
            return;
        }
        var noflo;
        if (!noflo && "require" in window) {
            noflo = require("noflo");
        }
        var self = this;
        noflo.graph.loadJSON(this.graph, (function (nofloGraph) {
            self.buildInitialLibrary(nofloGraph);
            self.nofloGraph = nofloGraph;
            self.fire("graphInitialised", self);
        }).bind(this));
        this.$.graph.getMenuDef = this.fnMenu;
        this.$.graph.graphChanged(null, this.nofloGraph);
    };
    FlowEditor.prototype.buildInitialLibrary = function (nofloGraph) {
        var self = this;
        nofloGraph.nodes.forEach((function (node) {
            var component = {
                name: node.component,
                icon: "cog",
                description: "",
                inports: [],
                outports: []
            };
            Object.keys(nofloGraph.inports).forEach(function (pub) {
                var exported = nofloGraph.inports[pub];
                if (exported.process === node.id) {
                    for (var i = 0; i < component.inports.length; i++) {
                        if (component.inports[i].name === exported.port) {
                            return;
                        }
                    }
                    component.inports.push({
                        name: exported.port,
                        type: "all"
                    });
                }
            });
            Object.keys(nofloGraph.outports).forEach(function (pub) {
                var exported = nofloGraph.outports[pub];
                if (exported.process === node.id) {
                    for (var i = 0; i < component.outports.length; i++) {
                        if (component.outports[i].name === exported.port) {
                            return;
                        }
                    }
                    component.outports.push({
                        name: exported.port,
                        type: "all"
                    });
                }
            });
            nofloGraph.initializers.forEach(function (iip) {
                if (iip.to.node === node.id) {
                    for (var i = 0; i < component.inports.length; i++) {
                        if (component.inports[i].name === iip.to.port) {
                            return;
                        }
                    }
                    component.inports.push({
                        name: iip.to.port,
                        type: "all"
                    });
                }
            });
            nofloGraph.edges.forEach(function (edge) {
                var i;
                if (edge.from.node === node.id) {
                    for (i = 0; i < component.outports.length; i++) {
                        if (component.outports[i].name === edge.from.port) {
                            return;
                        }
                    }
                    component.outports.push({
                        name: edge.from.port,
                        type: "all"
                    });
                }
                if (edge.to.node === node.id) {
                    for (i = 0; i < component.inports.length; i++) {
                        if (component.inports[i].name === edge.to.port) {
                            return;
                        }
                    }
                    component.inports.push({
                        name: edge.to.port,
                        type: "all"
                    });
                }
            });
            self.registerComponent(component, true);
        }).bind(this));
    };
    FlowEditor.prototype.registerComponent = function (definition, generated) {
        this.$.graph.registerComponent(definition, generated);
    };
    FlowEditor.prototype.libraryRefresh = function () {
        this.$.graph.debounceLibraryRefesh();
    };
    FlowEditor.prototype.updateIcon = function (nodeId, icon) {
        this.$.graph.updateIcon(nodeId, icon);
    };
    FlowEditor.prototype.rerender = function () {
        this.$.graph.rerender();
    };
    FlowEditor.prototype.triggerAutolayout = function () {
        this.$.graph.triggerAutolayout();
    };
    FlowEditor.prototype.triggerFit = function () {
        this.$.graph.triggerFit();
    };
    FlowEditor.prototype.animateEdge = function (edge) {
        var index = this.animatedEdges.indexOf(edge);
        if (index === -1) {
            this.animatedEdges.push(edge);
        }
    };
    FlowEditor.prototype.unanimateEdge = function (edge) {
        var index = this.animatedEdges.indexOf(edge);
        if (index >= 0) {
            this.animatedEdges.splice(index, 1);
        }
    };
    FlowEditor.prototype.addErrorNode = function (id) {
        this.errorNodes[id] = true;
        this.updateErrorNodes();
    };
    FlowEditor.prototype.removeErrorNode = function (id) {
        this.errorNodes[id] = false;
        this.updateErrorNodes();
    };
    FlowEditor.prototype.clearErrorNodes = function () {
        this.errorNodes = {};
        this.updateErrorNodes();
    };
    FlowEditor.prototype.updateErrorNodes = function () {
        this.$.graph.errorNodesChanged();
    };
    FlowEditor.prototype.focusNode = function (node) {
        this.$.graph.focusNode(node);
    };
    FlowEditor.prototype.getComponent = function (name) {
        return this.$.graph.getComponent(name);
    };
    FlowEditor.prototype.getLibrary = function () {
        return this.$.graph.library;
    };
    FlowEditor.prototype.toJSON = function () {
        return this.nofloGraph.toJSON();
    };
    __decorate([
        property({ type: Object }), 
        __metadata('design:type', Object)
    ], FlowEditor.prototype, "graph", void 0);
    __decorate([
        property({ type: Number, value: 72 }), 
        __metadata('design:type', Number)
    ], FlowEditor.prototype, "grid", void 0);
    __decorate([
        property({ type: Number, value: 36 }), 
        __metadata('design:type', Number)
    ], FlowEditor.prototype, "snap", void 0);
    __decorate([
        property({ type: Number, value: 800 }), 
        __metadata('design:type', Number)
    ], FlowEditor.prototype, "width", void 0);
    __decorate([
        property({ type: Number, value: 600 }), 
        __metadata('design:type', Number)
    ], FlowEditor.prototype, "height", void 0);
    __decorate([
        property({ type: Number, value: 1 }), 
        __metadata('design:type', Number)
    ], FlowEditor.prototype, "scale", void 0);
    __decorate([
        property({ type: Object, value: {} }), 
        __metadata('design:type', Object)
    ], FlowEditor.prototype, "plugins", void 0);
    __decorate([
        property({ type: String, value: "dark" }), 
        __metadata('design:type', String)
    ], FlowEditor.prototype, "theme", void 0);
    __decorate([
        property({ type: Array, value: [] }), 
        __metadata('design:type', Object)
    ], FlowEditor.prototype, "selectedNodes", void 0);
    __decorate([
        property({ type: Array, value: [] }), 
        __metadata('design:type', Object)
    ], FlowEditor.prototype, "selectedEdges", void 0);
    __decorate([
        property({ type: Array, value: [] }), 
        __metadata('design:type', Object)
    ], FlowEditor.prototype, "animatedEdges", void 0);
    __decorate([
        computed(), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], FlowEditor.prototype, "getMenuDef", null);
    FlowEditor = __decorate([
        component("flow-editor"), 
        __metadata('design:paramtypes', [])
    ], FlowEditor);
    return FlowEditor;
})(polymer.Base);
FlowEditor.register();
