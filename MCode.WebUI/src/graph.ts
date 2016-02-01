

interface Window {
     TheGraph : any;
}

interface IReact {
    unmountComponentAtNode: any;
    render: any;
}

window.TheGraph = window.TheGraph || {};

interface IKlayNoFlo {
    init(obj: any):any;
}

declare var klayNoflo: IKlayNoFlo;
declare var React: IReact;

@component("graph-element")
class GraphElement extends polymer.Base {
    graph: any;
    library: any;
    menus: any;
    @property({ type: Number,value: 800 })
    width: number;
    @property({ type: Number,value: 600})
    height: number;
    @property({ type: Number, value: 1 })
    scale: number;
    @property({type:Number,value:0.15})
    minZoom: number;
    @property({ type: Number, value: 15 })
    maxZoom: number;
    appView: any;
    graphView: any;
    @property({type:Boolean, value: true})
    editable: boolean;
    autolayout: boolean;
    @property({ type: Number, value: 72 })
    grid: number;
    @property({ type: Number, value: 36 })
    snap: number;
    @property({ type: String, value: "dark" })
    theme: string;
    @property({ type: Array, value: [] })
    selectedNodes: any;
    @property({ type: Object, value: {} })
    selectedNodeHash: any;
    errorNodes: any;
    @property({ type: Array, value: [] })
    selectedEdges: any;
    @property({ type: Array, value: [] })
    animatedEdges: any;
    autolayouter: any;
    displaySelectionGroup: boolean;
    forceSelection: boolean;
    @property({type:Number, value:0})
    offsetY: number;
    @property({ type: Number, value: 0 })
    offsetX: number;
    @property()
    pan: any;
    selectedNodesHash: any;
    debounceLibraryRefeshTimer: any;
    @property()
    getMenuDef:any;

    created() {
        this.library = {};
        this.pan = [0, 0];
        this.autolayouter = klayNoflo.init({
            onSuccess: this.applyAutolayout.bind(this),
            workerScript: "/lib/klayjs/klay.js"
        });
    }

    ready() {
        this.themeChanged();
    }

    themeChanged() {
        this.$.svgcontainer.className = "the-graph-" + this.theme;
    }

    graphChanged(oldGraph: any, newGraph: any) {
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
        this.appView = React.render(
            window.TheGraph.App({
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
            }),
            this.$.svgcontainer
        );
        this.graphView = this.appView.refs.graph;
    }

    onPaneScale(x, y, scale) {
        this.pan[0] = x;
        this.pan[1] = y;
        this.scale = scale;
    }

    onEdgeSelection(itemKey, item, toggle) {
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
            } else {
                shallowClone.push(item);
                this.selectedEdges = shallowClone;
            }
        } else {
            this.selectedEdges = [item];
        }
        this.fire('edges', this.selectedEdges);
    }

    onNodeSelection(itemKey, item, toggle) {
        if (itemKey === undefined) {
            this.selectedNodes = [];
        } else if (toggle) {
            var index = this.selectedNodes.indexOf(item);
            var isSelected = (index !== -1);
            if (isSelected) {
                this.selectedNodes.splice(index, 1);
            } else {
                this.selectedNodes.push(item);
            }
        } else {
            this.selectedNodes = [item];
        }
        this.fire('nodes', this.selectedNodes);
    }

    selectedNodesChanged() {
        var selectedNodesHash = {};
        for (var i = 0, len = this.selectedNodes.length; i < len; i++) {
            selectedNodesHash[this.selectedNodes[i].id] = true;
        }
        this.selectedNodesHash = selectedNodesHash;
        this.fire('nodes', this.selectedNodes);
    }

    selectedNodesHashChanged() {
        if (!this.graphView) {
            return;
        }
        this.graphView.setSelectedNodes(this.selectedNodesHash);
    }

    errorNodesChanged() {
        if (!this.graphView) {
            return;
        }
        this.graphView.setErrorNodes(this.errorNodes);
    }

    selectedEdgesChanged() {
        if (!this.graphView) {
            return;
        }
        this.graphView.setSelectedEdges(this.selectedEdges);
        this.fire('edges', this.selectedEdges);
    }

    animatedEdgesChanged() {
        if (!this.graphView) {
            return;
        }
        this.graphView.setAnimatedEdges(this.animatedEdges);
    }

    fireChanged(event) {
        this.fire("changed", this);
    }

    autolayoutChanged() {
        if (!this.graph) {
            return;
        }
        // Only listen to changes that affect layout
        if (this.autolayout) {
            this.graph.on('addNode', this.triggerAutolayout.bind(this));
            this.graph.on('removeNode', this.triggerAutolayout.bind(this));
            this.graph.on('addInport', this.triggerAutolayout.bind(this));
            this.graph.on('removeInport', this.triggerAutolayout.bind(this));
            this.graph.on('addOutport', this.triggerAutolayout.bind(this));
            this.graph.on('removeOutport', this.triggerAutolayout.bind(this));
            this.graph.on('addEdge', this.triggerAutolayout.bind(this));
            this.graph.on('removeEdge', this.triggerAutolayout.bind(this));
        } else {
            this.graph.removeListener('addNode', this.triggerAutolayout);
            this.graph.removeListener('removeNode', this.triggerAutolayout);
            this.graph.removeListener('addInport', this.triggerAutolayout);
            this.graph.removeListener('removeInport', this.triggerAutolayout);
            this.graph.removeListener('addOutport', this.triggerAutolayout);
            this.graph.removeListener('removeOutport', this.triggerAutolayout);
            this.graph.removeListener('addEdge', this.triggerAutolayout);
            this.graph.removeListener('removeEdge', this.triggerAutolayout);
        }
    }

    triggerAutolayout(event) {
        var graph = this.graph;
        var portInfo = this.graphView ? this.graphView.portInfo : null;
        // Calls the autolayouter
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
    }

    applyAutolayout(layoutedKGraph) {
        this.graph.startTransaction("autolayout");

        // Update original graph nodes with the new coordinates from KIELER graph
        var children = layoutedKGraph.children.slice();

        var i, len;
        for (i = 0, len = children.length; i < len; i++) {
            var klayNode = children[i];
            var nofloNode = this.graph.getNode(klayNode.id);

            // Encode nodes inside groups
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

            // Encode nodes outside groups
            if (nofloNode) {
                this.graph.setNodeMetadata(klayNode.id, {
                    x: Math.round(klayNode.x / this.snap) * this.snap,
                    y: Math.round(klayNode.y / this.snap) * this.snap
                });
            } else {
                // Find inport or outport
                var idSplit = klayNode.id.split(":::");
                var expDirection = idSplit[0];
                var expKey = idSplit[1];
                if (expDirection === "inport" && this.graph.inports[expKey]) {
                    this.graph.setInportMetadata(expKey, {
                        x: Math.round(klayNode.x / this.snap) * this.snap,
                        y: Math.round(klayNode.y / this.snap) * this.snap
                    });
                } else if (expDirection === "outport" && this.graph.outports[expKey]) {
                    this.graph.setOutportMetadata(expKey, {
                        x: Math.round(klayNode.x / this.snap) * this.snap,
                        y: Math.round(klayNode.y / this.snap) * this.snap
                    });
                }
            }
        }

        this.graph.endTransaction("autolayout");

        // Fit to window
        this.triggerFit();

    }

    triggerFit() {
        if (this.appView) {
            this.appView.triggerFit();
        }
    }

    widthChanged() {
        if (!this.appView) {
            return;
        }
        this.appView.setState({
            width: this.width
        });
    }

    heightChanged() {
        if (!this.appView) {
            return;
        }
        this.appView.setState({
            height: this.height
        });
    }

    updateIcon(nodeId, icon) {
        if (!this.graphView) {
            return;
        }
        this.graphView.updateIcon(nodeId, icon);
    }

    rerender(options) {
        // This is throttled with rAF internally
        if (!this.graphView) {
            return;
        }
        this.graphView.markDirty(options);
    }

    addNode(id, component, metadata) {
        if (!this.graph) {
            return;
        }
        this.graph.addNode(id, component, metadata);
    }

    getPan() {
        if (!this.appView) {
            return [0, 0];
        }
        return [this.appView.state.x, this.appView.state.y];
    }

    panChanged() {
        // Send pan back to React
        if (!this.appView) {
            return;
        }
        this.appView.setState({
            x: this.pan[0],
            y: this.pan[1]
        });
    }

    getScale() {
        if (!this.appView) {
            return 1;
        }
        return this.appView.state.scale;
    }

    displaySelectionGroupChanged() {
        if (!this.graphView) {
            return;
        }
        this.graphView.setState({
            displaySelectionGroup: this.displaySelectionGroup
        });
    }

    forceSelectionChanged() {
        if (!this.graphView) {
            return;
        }
        this.graphView.setState({
            forceSelection: this.forceSelection
        });
    }

    focusNode(node) {
        this.appView.focusNode(node);
    }

    menusChanged() {
        // Only if the object itself changes,
        // otherwise builds menu from reference every time menu shown
        if (!this.appView) {
            return;
        }
        this.appView.setProps({ menus: this.menus });
    }

    debounceLibraryRefesh() {
        // Breaking the "no debounce" rule, this fixes #76 for subgraphs
        if (this.debounceLibraryRefeshTimer) {
            clearTimeout(this.debounceLibraryRefeshTimer);
        }
        this.debounceLibraryRefeshTimer = setTimeout(function() {
            this.rerender({ libraryDirty: true });
        }.bind(this), 200);
    }

    mergeComponentDefinition(component, definition) {
        // In cases where a component / subgraph ports change,
        // we don't want the connections hanging in middle of node
        // TODO visually indicate that port is a ghost
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
            // Use the latest icon given
            component.icon = definition.icon;
        } else {
            // we should use the icon from the library
            definition.icon = component.icon;
        }
        // a component could also define a svg icon
        definition.iconsvg = component.iconsvg;

        return definition;
    }

    registerComponent(definition, generated) {
        var component = this.library[definition.name];
        var def = definition;
        if (component) {
            if (generated) {
                // Don't override real one with generated dummy
                return;
            }
            def = this.mergeComponentDefinition(component, definition);
        }
        this.library[definition.name] = def;
        // So changes are rendered
        this.debounceLibraryRefesh();
    }

    getComponent(name) {
        return this.library[name];
    }

    toJSON() {
        if (!this.graph) {
            return {};
        }
        return this.graph.toJSON();
    }
}

GraphElement.register();