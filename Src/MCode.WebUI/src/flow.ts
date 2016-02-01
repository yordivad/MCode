
interface Window {
    loadGraph(obj: any);
}




@component("flow-element")
class Flow extends polymer.Base {

    editor: any;
    nav: any;
    thumb:any;

    ready() {

        this.editor = document.getElementById("editor");

      

        window.loadGraph = (json) => {
            var graph = json;
            this.editor.graph = graph;
            this.editor.graphChanged();
            this.nav = document.getElementById("nav");
            this.nav.editor = this.editor;
            this.thumb = document.getElementById("thumb");
            this.thumb.graph = this.editor.nofloGraph;
            this.thumb.redrawGraph();
        }

        var body = document.querySelector("body");
        var script = document.createElement("script");
        script.type = "application/javascript";




        script.src = "photobooth.json.js";
        body.appendChild(script);
        
        var resize = () => {
            this.editor.setAttribute("width", window.innerWidth.toString());
            this.editor.setAttribute("height", window.innerHeight.toString());
        };
        window.addEventListener("resize", resize);
        resize();
        
    }

    @listen("nodes")
    nodeSelected(nodes) {
        alert(nodes);
    }

}

Flow.register();