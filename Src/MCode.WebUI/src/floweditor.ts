
interface ITheGraph {
    Clipboard :any;
}

declare class Graph {
    setGraph(obj:any);
}

declare var TheGraph: ITheGraph;

@component("flow-editor")
class FlowEditor extends polymer.Base {

    
    @property({type:Object})
    graph: any;
    @property({type:Number, value: 72})
    grid: number;
    @property({ type: Number, value: 36 })
    snap: number;
    @property({ type: Number, value: 800})
    width: number;
    @property({ type: Number, value: 600 })
    height: number;
    @property({ type: Number, value: 1 })
    scale: number;
    @property({ type: Object, value: {} })
    plugins: any;
    nofloGraph: any;
    menus: any;
    autolayout: boolean;
    @property({ type: String, value: "dark" })
    theme: string;
    @property({ type: Array, value: [] })
    selectedNodes: any;
    @property({ type: Array, value: [] })
    selectedEdges: any;
    @property({ type: Array, value: [] })
    animatedEdges: any;
    errorNodes: any;
    displaySelectionGroup: any;
    forceSelection: boolean;
    pan: any;
    fnMenu:any;
    created() {

        this.fnMenu = (options) => {
            if (options.type && this.menus[options.type]) {
                var defaultMenu = this.menus[options.type];
                if (defaultMenu.callback) {
                    return defaultMenu.callback(defaultMenu, options);
                }
                return defaultMenu;
            }
            return null;
        }
    }

    ready() {
        this.pan = [0, 0];

        var pasteAction = ((graph) => {
            var pasted = TheGraph.Clipboard.paste(graph);
            this.selectedNodes = pasted.nodes;
            this.selectedEdges = [];
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
                    action: ((graph, itemKey, item) => {
                        graph.removeEdge(item.from.node, item.from.port, item.to.node, item.to.port);
                        // Remove selection
                        var newSelection = [];
                        for (var i = 0, len = this.selectedEdges.length; i < len; i++) {
                            var selected = this.selectedEdges[i];
                            if (selected !== item) {
                                newSelection.push(selected);
                            }
                        }
                        this.selectedEdges = newSelection;
                    }).bind(this)
                }
            },
            node: {
                s4: {
                    icon: "trash-o",
                    iconLabel: "delete",
                    action: ((graph, itemKey, item) => {
                        graph.removeNode(itemKey);
                        // Remove selection
                        var newSelection = [];
                        for (var i = 0, len = this.selectedNodes.length; i < len; i++) {
                            var selected = this.selectedNodes[i];
                            if (selected !== item) {
                                newSelection.push(selected);
                            }
                        }
                        this.selectedNodes = newSelection;
                    }).bind(this)
                },
                w4: {
                    icon: "copy",
                    iconLabel: "copy",
                    action: (graph, itemKey) => {
                        TheGraph.Clipboard.copy(graph, [itemKey]);
                    }
                }
            },
            nodeInport: {
                w4: {
                    icon: "sign-in",
                    iconLabel: "export",
                    action(graph, itemKey, item) {
                        var pub = item.port;
                        if (pub === "start") {
                            pub = "start1";
                        }
                        if (pub === "graph") {
                            pub = "graph1";
                        }
                        var count = 0;
                        // Make sure public is unique
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
                    action(graph, itemKey, item) {
                        var pub = item.port;
                        var count = 0;
                        // Make sure public is unique
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
                    action(graph, itemKey) {
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
                    action(graph, itemKey) {
                        graph.removeOutport(itemKey);
                    }
                }
            },
            group: {
                icon: "th",
                s4: {
                    icon: "trash-o",
                    iconLabel: "ungroup",
                    action(graph, itemKey) {
                        graph.removeGroup(itemKey);
                    }
                },
                // TODO copy group?
                e4: pasteMenu
            },
            selection: {
                icon: "th",
                w4: {
                    icon: "copy",
                    iconLabel: "copy",
                    action(graph, itemKey, item) {
                        TheGraph.Clipboard.copy(graph, item.nodes);
                    }
                },
                e4: pasteMenu
            }
        };
    }

    attached() {
    }

    detached() {
        var plugins = this.plugins;
        for (var name in plugins) {
            if (plugins.hasOwnProperty(name)) {
                plugins[name].unregister(this);
                delete plugins[name];
            }
        }
    }

    addPlugin(name, plugin) {
        this.plugins[name] = plugin;
        plugin.register(this);
    }

    addMenu(type, options) {
        // options: icon, label
        this.menus[type] = options;
    }

    addMenuCallback(type, callback) {
        if (!this.menus[type]) {
            return;
        }
        this.menus[type].callback = callback;
    }

    addMenuAction(type, direction, options) {
        if (!this.menus[type]) {
            this.menus[type] = {};
        }
        var menu = this.menus[type];
        menu[direction] = options;
    }

    @computed()
    getMenuDef(options)  {
        // Options: type, graph, itemKey, item
        return this.fnMenu(options);
    }

    widthChanged() {
        this.style.width = this.width + "px";
    }

    heightChanged() {
        this.style.height = this.height + "px";
    }

    graphChanged() {
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
        noflo.graph.loadJSON(this.graph, ((nofloGraph) => {
            self.buildInitialLibrary(nofloGraph);
            self.nofloGraph = nofloGraph;
            self.fire("graphInitialised", self);
        }).bind(this));

        this.$.graph.getMenuDef = this.fnMenu;
        this.$.graph.graphChanged(null, this.nofloGraph);
    }

    buildInitialLibrary(nofloGraph) {
        /*if (Object.keys(this.$.graph.library).length !== 0) {
          // We already have a library, skip
          // TODO what about loading a new graph? Are we making a new editor?
          return;
        }*/
        var self = this;
        nofloGraph.nodes.forEach(((node) => {
            var component = {
                name: node.component,
                icon: "cog",
                description: "",
                inports: [],
                outports: []
            };

            Object.keys(nofloGraph.inports).forEach((pub) => {
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
            Object.keys(nofloGraph.outports).forEach( (pub) => {
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
            nofloGraph.initializers.forEach((iip) => {
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

            nofloGraph.edges.forEach((edge) => {
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
    }

    registerComponent(definition, generated) {
        this.$.graph.registerComponent(definition, generated);
    }

    libraryRefresh() {
        this.$.graph.debounceLibraryRefesh();
    }

    updateIcon(nodeId, icon) {
        this.$.graph.updateIcon(nodeId, icon);
    }

    rerender() {
        this.$.graph.rerender();
    }

    triggerAutolayout() {
        this.$.graph.triggerAutolayout();
    }

    triggerFit() {
        this.$.graph.triggerFit();
    }

    animateEdge(edge) {
        // Make sure unique
        var index = this.animatedEdges.indexOf(edge);
        if (index === -1) {
            this.animatedEdges.push(edge);
        }
    }

    unanimateEdge(edge) {
        var index = this.animatedEdges.indexOf(edge);
        if (index >= 0) {
            this.animatedEdges.splice(index, 1);
        }
    }

    addErrorNode(id) {
        this.errorNodes[id] = true;
        this.updateErrorNodes();
    }

    removeErrorNode(id) {
        this.errorNodes[id] = false;
        this.updateErrorNodes();
    }

    clearErrorNodes() {
        this.errorNodes = {};
        this.updateErrorNodes();
    }

    updateErrorNodes() {
        this.$.graph.errorNodesChanged();
    }

    focusNode(node) {
        this.$.graph.focusNode(node);
    }

    getComponent(name) {
        return this.$.graph.getComponent(name);
    }

    getLibrary() {
        return this.$.graph.library;
    }

    toJSON() {
        return this.nofloGraph.toJSON();
    }

}

FlowEditor.register();